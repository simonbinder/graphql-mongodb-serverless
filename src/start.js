import {MongoClient} from 'mongodb'
import express from 'express'
import cors from 'cors'
import {typeDefs} from './typedefs';
import {user, users} from "./Collections/users";
import {tag, tags, taxonomies, taxonomy} from "./Collections/tags";
import {categories, category} from "./Collections/categories";
import {
    blockId,
    blocksQuery,
    post,
    postById,
    postByParent,
    postContent,
    posts,
    postsAggregate,
    postsAggregateById,
    postType, purpleIssues
} from "./Collections/posts";
import {menusAggregate} from "./Collections/menus";
import {advancedCustomField, advancedCustomFields} from "./Collections/acf";
import {revision, revisions} from "./Collections/revisions";
import {allow, and, deny, rule, shield} from "graphql-shield";
import {prepare} from "../util";
import {CheckPassword} from "wordpress-hash-node";
import gql from 'graphql-tag';
import {ApolloServer, makeExecutableSchema} from "apollo-server";
import {applyMiddleware} from "graphql-middleware";

const app = express()

app.use(cors())

const homePath = '/graphiql'
const URL = 'mongodb://localhost:27017/wp'
const PORT = 3002

const getBlogId = (request) => {
    const obj = gql`
              ${request.body.query}
            `;
    const queryArguments = obj.definitions[0].selectionSet.selections[0].arguments;
    if (queryArguments) {
        const blog_id = queryArguments.filter(argument => argument.name.value === "blog_id")
        if (blog_id.length > 0) {
            return blog_id[0].value.value;
        } else return 1;
    } else return null;
}


export const start = async () => {
    try {
        const db = await MongoClient.connect(URL);

        const resolvers = {
            Query: {
                user,
                users,

                tag,
                tags,

                taxonomy,
                taxonomies,

                category,
                categories,

                post,
                posts,
                postById,
                postByParent,
                postsAggregate,
                postsAggregateById,
                postType,
                postContent,
                blocksQuery,
                purpleIssues,
                blockId,

                advancedCustomField,
                advancedCustomFields,

                menusAggregate,

                revision,
                revisions,
            },
        }

        const isUserAuthenticated = async (request, db) => {
            const blog_id = getBlogId(request);
            const b64auth = (request.headers.authorization || '').split(' ')[1] || ''
            const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
            if (login) {
                const user = await getUserByName(blog_id, login, db);
                return CheckPassword(password, user.password);
            } else return false;
        }

        const getUser = async (request, db) => {
            const blog_id = getBlogId(request);
            const b64auth = (request.headers.authorization || '').split(' ')[1] || ''
            const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
            if (login) {
                return await getUserByName(blog_id, login, db);
            } else return null;
        }

        const getUserByName = async (blog_id, name, db) => {
            const Users = db.collection(`users_${blog_id}`);
            return prepare(await Users.findOne({'login': name}))
        }

        const isAuthenticated = rule({cache: 'contextual'})(
            async (root, args, ctx) => {
                return ctx.isUserAuthenticated;
            },
        )

        const isAdmin = rule({cache: 'contextual'})(
            async (parent, args, ctx, info) => {
                const user = await ctx.user;
                return user.roles.includes('administrator');
            },
        )

        const permissions = shield({
            Query: {
                "*": deny,
                posts: allow,
                postsAggregateById: allow,
                revision: and(isAuthenticated, isAdmin),
                revisions: and(isAuthenticated, isAdmin),
                user: and(isAuthenticated, isAdmin),
                users: and(isAuthenticated, isAdmin),

                tag: allow,
                tags: allow,
                taxonomy: isAuthenticated,
                taxonomies: isAuthenticated,

                category: allow,
                categories: allow,

                post: isAuthenticated,
                postById: isAuthenticated,
                postByParent: isAuthenticated,
                postsAggregate: isAuthenticated,
                postType: isAuthenticated,
                postContent: isAuthenticated,
                blocksQuery: isAuthenticated,
                purpleIssues: isAuthenticated,
                blockId: allow,

                advancedCustomField: isAuthenticated,
                advancedCustomFields: isAuthenticated,

                menusAggregate: isAuthenticated,
            },
        }, {
            debug: process.env.NODE_ENV !== "production"
        })

        const schema = applyMiddleware(
            makeExecutableSchema({
                typeDefs,
                resolvers
            }),
            permissions
        );

        const server = new ApolloServer({
            schema,
            context: ({req}) => ({
                db, isUserAuthenticated: isUserAuthenticated(req, db), user: getUser(req, db)
            })
        });


        await server.listen(PORT, () => {
            console.log(`Visit ${URL}:${PORT}${homePath}`)
        })

    } catch (e) {
        console.log(e)
    }
}
