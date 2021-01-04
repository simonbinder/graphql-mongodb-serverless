import {prepare} from "../../util";
import {ObjectId} from "mongodb";
import {buildAdvancedCustomFieldsFilter} from "../Filters/filters";

export const advancedCustomField = async (root, {_id, blog_id}, {db}) => {
    const database = await db;
    const AdvancedCustomFields = database.collection(`advanced_custom_fields_${blog_id}`);
    return prepare(await AdvancedCustomFields.findOne(ObjectId(_id)))
}

export const advancedCustomFields = async (root, {blog_id, filter, first, skip}, {db}) => {
    const database = await db;
    const AdvancedCustomFields = database.collection(`advanced_custom_fields_${blog_id}`);
    let query = filter ? {$or: buildAdvancedCustomFieldsFilter(filter)} : {};
    const acfs = await AdvancedCustomFields.find(query);
    if (first) {
        acfs.limit(first);
    }
    if (skip) {
        acfs.skip(skip);
    }
    return (acfs.toArray());
}
