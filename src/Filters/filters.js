export function buildFilters({OR = [], title_contains, post_type_contains, post_content_contains}) {
    const filter = (title_contains || post_type_contains || post_content_contains) ? {} : null;
    if (title_contains) {
        filter.post_title = {$regex: `.*${title_contains}.*`};
    }
    if (post_type_contains) {
        filter.post_type = {$regex: `.*${post_type_contains}.*`};
    }

    if (post_content_contains) {
        filter['post_content.attrs.content'] = {$regex: new RegExp(`.*${post_content_contains}.*`, 'i')};
    }

    let filters = filter ? [filter] : [];
    for (let i = 0; i < OR.length; i++) {
        filters = filters.concat(buildFilters(OR[i]));
    }
    return filters;
}

export function buildTagFilters({OR = [], name_contains, slug_contains}) {
    const filter = (name_contains || slug_contains) ? {} : null;
    if (name_contains) {
        filter.name = {$regex: `.*${name_contains}.*`};
    }
    if (slug_contains) {
        filter.slug = {$regex: `.*${slug_contains}.*`};
    }

    let filters = filter ? [filter] : [];
    for (let i = 0; i < OR.length; i++) {
        filters = filters.concat(buildTagFilters(OR[i]));
    }
    return filters;
}

export function buildCategoryFilters({OR = [], name_contains}) {
    const filter = (name_contains) ? {} : null;
    if (name_contains) {
        filter.name = {$regex: `.*${name_contains}.*`};
    }

    let filters = filter ? [filter] : [];
    for (let i = 0; i < OR.length; i++) {
        filters = filters.concat(buildCategoryFilters(OR[i]));
    }
    return filters;
}

export function buildAdvancedCustomFieldsFilter({OR = [], title_contains}) {
    const filter = (title_contains) ? {} : null;
    if (title_contains) {
        filter.title = {$regex: `.*${title_contains}.*`};
    }

    let filters = filter ? [filter] : [];
    for (let i = 0; i < OR.length; i++) {
        filters = filters.concat(buildAdvancedCustomFieldsFilter(OR[i]));
    }
    return filters;
}

export function buildUserFilters({OR = [], display_name_contains, email_contains, login_contains}) {
    const filter = (display_name_contains || email_contains || login_contains) ? {} : null;
    if (display_name_contains) {
        filter.display_name = {$regex: `.*${display_name_contains}.*`};
    }
    if (email_contains) {
        filter.email = {$regex: `.*${email_contains}.*`};
    }
    if (login_contains) {
        filter.login = {$regex: `.*${login_contains}.*`};
    }


    let filters = filter ? [filter] : [];
    for (let i = 0; i < OR.length; i++) {
        filters = filters.concat(buildUserFilters(OR[i]));
    }
    return filters;
}
