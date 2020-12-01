export const menusAggregate = async (root, {first, skip, blog_id}, {db}) => {
    const Menus = db.collection(`menus_${blog_id}`);
    const menus = await Menus.aggregate([
        {
            $lookup: {
                from: 'menuItems',
                localField: 'menu_items',
                foreignField: 'ID',
                as: 'menu_items'
            }
        },
        {
            $unwind: {
                path: "$menu_items",
            }
        },
        {
            $sort: {
                'menu_items.menu_order': 1,
            }
        },
        {
            $group:
                {
                    _id: '$_id',
                    'menu_items': {$push: '$menu_items'},
                    'name': {$first: '$name'},
                    'menu_id': {$first: '$menu_id'},
                    'slug': {$first: '$slug'},
                }
        },
    ]);
    if (first) {
        menus.limit(first);
    }
    if (skip) {
        menus.skip(skip);
    }
    return ((await menus.toArray()));
}
