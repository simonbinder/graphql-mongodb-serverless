import {prepare} from "../../util";

export const revision = async (root, {postId, blog_id}, {db}) => {
    const Revisions = db.collection(`revisions_${blog_id}`);
    return prepare(await Revisions.findOne({postId: postId}))
}

export const revisions = async (root, {first, skip, blog_id}, {db}) => {
    const Revisions = db.collection(`revisions_${blog_id}`);
    const revisions = await Revisions.find({});
    if (first) {
        revisions.limit(first);
    }
    if (skip) {
        revisions.skip(skip);
    }
    return (revisions.toArray());
}
