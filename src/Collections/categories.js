import {prepare} from "../../util";
import {ObjectId} from "mongodb";
import {buildCategoryFilters} from "../Filters/filters";

export const category = async (root, {_id, blog_id}, {db}) => {
    const Categories = db.collection(`taxonomies_${blog_id}`);
    return prepare(await Categories.findOne(ObjectId(_id)))
}

export const categories = async (root, {filter, first, skip, blog_id}, {db}) => {
    const Categories = db.collection(`taxonomies_${blog_id}`);
    let query = filter ? {$or: buildCategoryFilters(filter)} : {};
    const tags = await Categories.find(query);
    if (first) {
        tags.limit(first);
    }
    if (skip) {
        tags.skip(skip);
    }
    return (tags.toArray());
}
