import {prepare} from "../../util";
import {ObjectId} from "mongodb";
import {buildTagFilters} from "../Filters/filters";

export const tag = async (root, {_id, blog_id}, {db}) => {
    const database = await db;
    const Tags = database.collection(`taxonomies_${blog_id}`);
    return prepare(await Tags.findOne(ObjectId(_id)))
}

export const tags = async (root, {filter, first, skip, blog_id}, {db}) => {
    const database = await db;
    const Tags = database.collection(`taxonomies_${blog_id}`);
    let query = filter ? {$or: buildTagFilters(filter)} : {};
    if(Object.keys(query).length === 0 && query.constructor === Object) {
        query = {taxonomy: "post_tag"};
    } else {
        Object.assign(query['$or'][0], {taxonomy: {$regex: `.*post_tag.*`}});
    }
    const tags = await Tags.find(query);
    if (first) {
        tags.limit(first);
    }
    if (skip) {
        tags.skip(skip);
    }
    return (tags.toArray());
}

export const taxonomy = async (root, {_id, blog_id}, {db}) => {
    const database = await db;
    const Taxonomies = database.collection(`taxonomies_${blog_id}`);
    return prepare(await Taxonomies.findOne(ObjectId(_id)))
}

export const taxonomies = async (root, {filter, first, skip, blog_id}, {db}) => {
    const database = await db;
    const Taxonomies = database.collection(`taxonomies_${blog_id}`);
    let query = filter ? {$or: buildTagFilters(filter)} : {};
    const taxonomies = await Taxonomies.find(query);
    if (first) {
        taxonomies.limit(first);
    }
    if (skip) {
        taxonomies.skip(skip);
    }
    return (taxonomies.toArray());
}

