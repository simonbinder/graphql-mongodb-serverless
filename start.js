import {MongoClient} from 'mongodb'
import express from 'express'
import {typeDefs} from './src/typedefs';
import {user, users} from "./src/Collections/users";
import {tag, tags, taxonomies, taxonomy} from "./src/Collections/tags";
import {categories, category} from "./src/Collections/categories";
import cors from 'cors'
import compression from "compression";
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
} from "./src/Collections/posts";
import {menusAggregate} from "./src/Collections/menus";
import {advancedCustomField, advancedCustomFields} from "./src/Collections/acf";
import {revision, revisions} from "./src/Collections/revisions";
import {allow, and, deny, rule, shield} from "graphql-shield";
import {prepare} from "./util";
import {CheckPassword} from "wordpress-hash-node";
import { makeExecutableSchema, gql } from "apollo-server";
import {applyMiddleware} from "graphql-middleware";
import serverless from "serverless-http";
import { ApolloServer } from "apollo-server-express";
import caBundle from "./rds-combined-ca-bundle.pem";
import * as context from "serverless";
import deflate from "graphql-deduplicator/dist/deflate";
import {GraphQLExtension} from "graphql-extensions";
import responseCachePlugin from 'apollo-server-plugin-response-cache';

const app = express()
app.use(cors())
app.use(compression())

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

const isUserAuthenticated = async (request) => {
    const blog_id = getBlogId(request);
    const b64auth = (request.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    if (login) {
        const user = await getUserByName(blog_id, login);
        return CheckPassword(password, user.password);
    } else return false;
}

const getUser = async (request) => {
    const blog_id = getBlogId(request);
    const b64auth = (request.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    if (login) {
        return await getUserByName(blog_id, login);
    } else return null;
}

const URL = `mongodb://${process.env.DOCUMENTDB_USER}:${process.env.DOCUMENTDB_PASSWORD}@${process.env.DOCUMENTDB_URL}:27017`;
const client = new MongoClient(URL, { useNewUrlParser: true, ssl: true, sslCA: caBundle, useUnifiedTopology: true });

const getDb = async () => {
    if (!client.isConnected()) {
        // Cold start or connection timed out. Create new connection.
        try {
            await client.connect();
            return client.db('wp');
        } catch (e) {
            return e;
        }
    } else {
        console.log("reuse connection");
        return client.db('wp');
    }
}

const getUserByName = async (blog_id, name) => {
    const db = await getDb();
    const Users = db.collection(`users_${blog_id}`);
    return prepare(await Users.findOne({'login': name}))
}

const isAuthenticated = rule({cache: 'contextual'})(
    async (root, args, ctx) => {
        await ctx.isUserAuthenticated;
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
    debug: true
})

const schema = applyMiddleware(
    makeExecutableSchema({
        typeDefs,
        resolvers
    }),
    permissions
);

context.callbackWaitsForEmptyEventLoop = false;

class DeduplicateResponseExtension extends GraphQLExtension {
    willSendResponse(o) {
        const { context, graphqlResponse } = o
        const data = deflate(graphqlResponse.data)
        return {
            ...o,
            graphqlResponse: {
                ...graphqlResponse,
                data,
            },
        }
    }
}

const server = new ApolloServer({
    schema,
    context: ({req}) => ({
        isUserAuthenticated: isUserAuthenticated(req), user: getUser(req), db: getDb()
    }),
    plugins: [responseCachePlugin()],
    extensions: [() => new DeduplicateResponseExtension()],
});

server.applyMiddleware({app, path: "/"});
const handler = serverless(app);
export {handler};
