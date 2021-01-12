import {prepare} from "../../util";

export const revision = async (root, {postId}, {db}) => {
    const database = await db;
    const Revisions = database.collection(`revisions`);
    return prepare(await Revisions.findOne({source_post_id: postId}))
}

export const revisions = async (root, {first, skip}, {db}) => {
    const database = await db;
    const Revisions = database.collection(`revisions`);
    const revisions = await Revisions.find({});
    if (first) {
        revisions.limit(first);
    }
    if (skip) {
        revisions.skip(skip);
    }
    return (revisions.toArray());
}
