import {prepare} from "../../util";
import {ObjectId} from "mongodb";
import {buildFilters} from "../Filters/filters";

export const post = async (root, {_id}, {isAuthenticated, db}) => {
    const database = await db;
    const Posts = database.collection(`posts`);
    if (!isAuthenticated) {
        const post = await Posts.findOne({"_id": _id, "post_status": "publish"});
        if (post) {
            return prepare(post);
        } else return null;
    } else {
        return prepare(await Posts.findOne(ObjectId(_id)))
    }
}

export const postById = async (root, {id}, {db}) => {
    const database = await db;
    const Posts = database.collection(`posts`);
    return prepare(await Posts.findOne({source_post_id: id}))
}

export const postByParent = async (root, {id}, {db}) => {
    const database = await db;
    const Posts = database.collection(`posts`);
    return (await Posts.find({"post_parent": id}).toArray()).map(prepare);
}

export const posts = async (root, {filter, first, skip}, ctx, info) => {
    info.cacheControl.setCacheHint({ maxAge: 10 });
    const database = await ctx.db;
    const Posts = database.collection(`posts`);
    let query = filter ? {$or: buildFilters(filter)} : {};
    const isAuthenticated = await ctx.isUserAuthenticated;
    if (!isAuthenticated) {
        Object.assign(query['$or'][0], {post_status: {$regex: `.*publish.*`}});
    }
    const posts = await Posts.find(query).limit(first);
    if(skip) {
        posts.skip(skip);
    }
    return posts.toArray();
}

export const postsAggregate = async (root, {first, skip}, {db}) => {
    const database = await db;
    const Posts = database.collection(`posts`);
    const issues = await Posts.aggregate([
        {
            $lookup: {
                from: `users`,
                localField: 'author',
                foreignField: 'source_user_id',
                as: 'user'
            }
        }, {
            $lookup: {
                from: `taxonomies`,
                localField: 'categories',
                foreignField: 'source_term_id',
                as: 'cats'
            }
        }, {
            $lookup: {
                from: `taxonomies`,
                localField: 'tags',
                foreignField: 'source_term_id',
                as: 'tags'
            }
        }, {
            $lookup: {
                from: `taxonomies`,
                localField: 'taxonomies',
                foreignField: 'source_term_id',
                as: 'taxonomies'
            }
        }, {
            $lookup: {
                from: `comments`,
                localField: 'comments',
                foreignField: 'source_comment_id',
                as: 'comment_fields'
            }
        }, {
            $lookup: {
                from: `advanced_custom_fields`,
                localField: 'advanced_custom_fields.fieldId',
                foreignField: 'source_acf_id',
                as: 'advancedCustomFields'
            }
        }, {
            $unwind: '$user'
        }]);
    if (first) {
        issues.limit(first);
    }
    if (skip) {
        issues.skip(skip);
    }
    return (await issues.toArray());
}

export const postsAggregateById = async (parent, {id}, {isUserAuthenticated, db}) => {
    const database = await db;
    const Posts = database.collection(`posts`);
    const post = (await Posts.aggregate([
        {
            $match: {source_post_id: id}
        },
        {
            $lookup: {
                from: `users`,
                localField: 'author',
                foreignField: 'source_user_id',
                as: 'user'
            }
        }, {
            $lookup: {
                from: `taxonomies`,
                localField: 'categories',
                foreignField: 'source_term_id',
                as: 'cats'
            }
        }, {
            $lookup: {
                from: `taxonomies`,
                localField: 'tags',
                foreignField: 'source_term_id',
                as: 'tags'
            }
        }, {
            $lookup: {
                from: `taxonomies`,
                localField: 'taxonomies',
                foreignField: 'source_term_id',
                as: 'taxonomies'
            }
        }, {
            $lookup: {
                from: `comments`,
                localField: 'comments',
                foreignField: 'source_comment_id',
                as: 'comment_fields'
            }
        }, {
            $lookup: {
                from: `advanced_custom_fields`,
                localField: 'advanced_custom_fields.fieldId',
                foreignField: 'source_acf_id',
                as: 'advancedCustomFields'
            }
        },
        {
            $unwind: '$user'
        },
    ]).toArray()).map(prepare)[0];
    const isAuthenticated = await isUserAuthenticated;
    if (!isAuthenticated && post.post_status !== "publish") {
        throw new Error('Unauthorised!');
    } else return post;
}

export const postType = async (parent, {type}, {db}) => {
    const database = await db;
    const Posts = database.collection(`posts`);
    return (await Posts.find({"post_type": type}).toArray()).map(prepare);
}

export const postContent = async (parent, {content}, {db}) => {
    const database = await db;
    const Posts = database.collection(`posts`);
    return (await Posts.find({'$text': {'$search': `${content}`, '$caseSensitive': false}})
        .toArray()).map(prepare);
}

export const blocksQuery = async (parent, {blockName}, {db}) => {
    const database = await db;
    const Posts = database.collection(`posts`);
    return (await Posts.aggregate([
            {$match: {"post_content.blockName": blockName}},
            {
                $project: {
                    post_content: {
                        $filter: {
                            input: '$post_content',
                            as: 'post_content',
                            cond: {$eq: ['$$post_content.blockName', blockName]}
                        }
                    },
                }
            },
            {
                $unwind: '$post_content'
            },
            {
                $replaceRoot: {newRoot: '$post_content'}
            }
        ]
    ).toArray());
}

export const purpleIssues = async (parent, {first, skip}, {db}) => {
    const database = await db;
    const Posts = database.collection(`posts`);
    const issues = await Posts.aggregate([
        {
            $match: {post_type: "purple_issue"}
        },
        {
            $lookup: {
                from: `posts`,
                localField: 'purple_issue_articles',
                foreignField: 'source_post_id',
                as: 'issue_posts'
            }
        }])
    if (first) {
        issues.limit(first);
    }
    if (skip) {
        issues.skip(skip);
    }
    return (issues.toArray());
}

export const blockId = async (parent, {id}, {isUserAuthenticated, db}) => {
    const database = await db;
    const Posts = database.collection(`posts`);
    const isAuthenticated = await isUserAuthenticated;
    if (!isAuthenticated) {
        const post = await Posts.findOne({
            'post_content.attrs.purpleId': id,
            "post_status": "publish"
        }, {"post_content.$": 1});
        if (post) {
            return prepare(post).post_content[0];
        } else return null;
    } else {
        return prepare(await Posts.findOne({'post_content.attrs.purpleId': id}, {"post_content.$": 1})).post_content[0];
    }
}
