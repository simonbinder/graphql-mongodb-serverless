import {prepare} from "../../util";
import {ObjectId} from "mongodb";
import {buildUserFilters} from "../Filters/filters";

export const user = async (root, {_id, blog_id}, {db}) => {
    const Users = db.collection(`users_${blog_id}`);
    return prepare(await Users.findOne(ObjectId(_id)))
}

export const users = async (root, {filter, first, skip, blog_id}, {db}) => {
    const Users = db.collection(`users_${blog_id}`);
    let query = filter ? {$or: buildUserFilters(filter)} : {};
    const users = await Users.find(query);
    if (first) {
        users.limit(first);
    }
    if (skip) {
        users.skip(skip);
    }
    return (users.toArray());
}
