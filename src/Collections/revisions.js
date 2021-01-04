import {prepare} from "../../util";

export const revision = async (root, {postId, blog_id}, {db}) => {
    const database = await db;
    const Revisions = database.collection(`revisions_${blog_id}`);
    return prepare(await Revisions.findOne({post_id: postId}))
}

export const revisions = async (root, {first, skip, blog_id}, {db}) => {
    const database = await db;
    const Revisions = database.collection(`revisions_${blog_id}`);
    const revisions = await Revisions.find({});
    if (first) {
        revisions.limit(first);
    }
    if (skip) {
        revisions.skip(skip);
    }
    return (revisions.toArray());
}
