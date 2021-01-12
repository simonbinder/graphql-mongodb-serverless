import {prepare} from "../../util";
import {ObjectId} from "mongodb";
import {buildUserFilters} from "../Filters/filters";

export const user = async (root, {_id}, {db}) => {
    const database = await db;
    const Users = database.collection(`users`);
    return prepare(await Users.findOne(ObjectId(_id)))
}

export const users = async (root, {filter, first, skip}, {db}) => {
    const database = await db;
    const Users = database.collection(`users`);
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
