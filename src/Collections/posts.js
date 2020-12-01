import {prepare} from "../../util";
import {ObjectId} from "mongodb";
import {buildFilters} from "../Filters/filters";

export const post = async (root, {_id, blog_id}, {db, isAuthenticated}) => {
    const Posts = db.collection(`posts_${blog_id}`);
    if (!isAuthenticated) {
        const post = await Posts.findOne({"_id": _id, "post_status": "publish"});
        if (post) {
            return prepare(post);
        } else return null;
    } else {
        return prepare(await Posts.findOne(ObjectId(_id)))
    }
}

export const postById = async (root, {id, blog_id}, {db}) => {
    const Posts = db.collection(`posts_${blog_id}`);
    return prepare(await Posts.findOne({post_id: id}))
}

export const postByParent = async (root, {id, blog_id}, {db}) => {
    const Posts = db.collection(`posts_${blog_id}`);
    return (await Posts.find({"post_parent": id}).toArray()).map(prepare);
}

export const posts = async (root, {blog_id, filter, first, skip}, ctx) => {
    const Posts = ctx.db.collection(`posts_${blog_id}`);
    let query = filter ? {$or: buildFilters(filter)} : {};
    const isAuthenticated = await ctx.isUserAuthenticated;
    if (!isAuthenticated) {
        Object.assign(query['$or'][0], {post_status: {$regex: `.*publish.*`}});
    }
    const posts = await Posts.find(query);
    if (first) {
        posts.limit(first);
    }
    if (skip) {
        posts.skip(skip);
    }
    return (posts.toArray());
}

export const postsAggregate = async (root, {blog_id, first, skip}, {db}) => {
    const Posts = db.collection(`posts_${blog_id}`);
    const issues = await Posts.aggregate([
        {
            $lookup: {
                from: `users_${blog_id}`,
                localField: 'author',
                foreignField: 'user_id',
                as: 'user'
            }
        }, {
            $lookup: {
                from: `taxonomies_${blog_id}`,
                localField: 'categories',
                foreignField: 'term_id',
                as: 'cats'
            }
        }, {
            $lookup: {
                from: `taxonomies_${blog_id}`,
                localField: 'tags',
                foreignField: 'term_id',
                as: 'tags'
            }
        }, {
            $lookup: {
                from: `taxonomies_${blog_id}`,
                localField: 'taxonomies',
                foreignField: 'term_id',
                as: 'taxonomies'
            }
        }, {
            $lookup: {
                from: `comments_${blog_id}`,
                localField: 'comments',
                foreignField: 'comment_id',
                as: 'tags'
            }
        }, {
            $lookup: {
                from: `advanced_custom_fields_${blog_id}`,
                localField: 'advanced_custom_fields.fieldId',
                foreignField: 'ID',
                as: 'advanced_custom_fields.field'
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
    return (issues.toArray());
}

export const postsAggregateById = async (parent, {id, blog_id}, {db, isUserAuthenticated}) => {
    const Posts = db.collection(`posts_${blog_id}`);
    const post = (await Posts.aggregate([
        {
            $match: {post_id: id}
        },
        {
            $lookup: {
                from: `users_${blog_id}`,
                localField: 'author',
                foreignField: 'user_id',
                as: 'user'
            }
        }, {
            $lookup: {
                from: `taxonomies_${blog_id}`,
                localField: 'categories',
                foreignField: 'term_id',
                as: 'cats'
            }
        }, {
            $lookup: {
                from: `taxonomies_${blog_id}`,
                localField: 'tags',
                foreignField: 'term_id',
                as: 'tags'
            }
        }, {
            $lookup: {
                from: `taxonomies_${blog_id}`,
                localField: 'taxonomies',
                foreignField: 'term_id',
                as: 'taxonomies'
            }
        }, {
            $lookup: {
                from: `comments_${blog_id}`,
                localField: 'comments',
                foreignField: 'comment_id',
                as: 'comment_fields'
            }
        }, {
            $lookup: {
                from: `advanced_custom_fields_${blog_id}`,
                localField: 'advanced_custom_fields.fieldId',
                foreignField: 'ID',
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

export const postType = async (parent, {type, blog_id}, {db}) => {
    const Posts = db.collection(`posts_${blog_id}`);

    return (await Posts.find({"post_type": type}).toArray()).map(prepare);
}

export const postContent = async (parent, {content, blog_id}, {db}) => {
    const Posts = db.collection(`posts_${blog_id}`);
    return (await Posts.find({'$text': {'$search': `${content}`, '$caseSensitive': false}})
        .toArray()).map(prepare);
}

export const blocksQuery = async (parent, {blockName, blog_id}, {db}) => {
    const Posts = db.collection(`posts_${blog_id}`);
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

export const purpleIssues = async (parent, {blog_id, first, skip}, {db}) => {
    const Posts = db.collection(`posts_${blog_id}`);
    const issues = await Posts.aggregate([
        {
            $match: {post_type: "purple_issue"}
        },
        {
            $lookup: {
                from: `posts_${blog_id}`,
                localField: 'purple_issue_articles',
                foreignField: 'post_id',
                as: 'issue_posts'
            }
        }]);
    if (first) {
        issues.limit(first);
    }
    if (skip) {
        issues.skip(skip);
    }
    return (issues.toArray());
}

export const blockId = async (parent, {id, blog_id}, {db, isUserAuthenticated}) => {
    const Posts = db.collection(`posts_${blog_id}`);
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
