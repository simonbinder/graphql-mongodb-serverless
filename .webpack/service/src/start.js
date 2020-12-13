module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Collections/acf.js":
/*!********************************!*
  !*** ./src/Collections/acf.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "advancedCustomField": () => /* binding */ advancedCustomField,
/* harmony export */   "advancedCustomFields": () => /* binding */ advancedCustomFields
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./util/index.js");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Filters_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Filters/filters */ "./src/Filters/filters.js");



const advancedCustomField = async (root, {
  _id,
  blog_id
}, {
  db
}) => {
  const AdvancedCustomFields = db.collection(`advanced_custom_fields_${blog_id}`);
  return (0,_util__WEBPACK_IMPORTED_MODULE_0__.prepare)(await AdvancedCustomFields.findOne((0,mongodb__WEBPACK_IMPORTED_MODULE_1__.ObjectId)(_id)));
};
const advancedCustomFields = async (root, {
  blog_id,
  filter,
  first,
  skip
}, {
  db
}) => {
  const AdvancedCustomFields = db.collection(`advanced_custom_fields_${blog_id}`);
  let query = filter ? {
    $or: (0,_Filters_filters__WEBPACK_IMPORTED_MODULE_2__.buildAdvancedCustomFieldsFilter)(filter)
  } : {};
  const acfs = await AdvancedCustomFields.find(query);

  if (first) {
    acfs.limit(first);
  }

  if (skip) {
    acfs.skip(skip);
  }

  return acfs.toArray();
};

/***/ }),

/***/ "./src/Collections/categories.js":
/*!***************************************!*
  !*** ./src/Collections/categories.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "category": () => /* binding */ category,
/* harmony export */   "categories": () => /* binding */ categories
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./util/index.js");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Filters_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Filters/filters */ "./src/Filters/filters.js");



const category = async (root, {
  _id,
  blog_id
}, {
  db
}) => {
  const Categories = db.collection(`taxonomies_${blog_id}`);
  return (0,_util__WEBPACK_IMPORTED_MODULE_0__.prepare)(await Categories.findOne((0,mongodb__WEBPACK_IMPORTED_MODULE_1__.ObjectId)(_id)));
};
const categories = async (root, {
  filter,
  first,
  skip,
  blog_id
}, {
  db
}) => {
  const Categories = db.collection(`taxonomies_${blog_id}`);
  let query = filter ? {
    $or: (0,_Filters_filters__WEBPACK_IMPORTED_MODULE_2__.buildCategoryFilters)(filter)
  } : {};
  const tags = await Categories.find(query);

  if (first) {
    tags.limit(first);
  }

  if (skip) {
    tags.skip(skip);
  }

  return tags.toArray();
};

/***/ }),

/***/ "./src/Collections/menus.js":
/*!**********************************!*
  !*** ./src/Collections/menus.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menusAggregate": () => /* binding */ menusAggregate
/* harmony export */ });
const menusAggregate = async (root, {
  first,
  skip,
  blog_id
}, {
  db
}) => {
  const Menus = db.collection(`menus_${blog_id}`);
  const menus = await Menus.aggregate([{
    $lookup: {
      from: 'menuItems',
      localField: 'menu_items',
      foreignField: 'ID',
      as: 'menu_items'
    }
  }, {
    $unwind: {
      path: "$menu_items"
    }
  }, {
    $sort: {
      'menu_items.menu_order': 1
    }
  }, {
    $group: {
      _id: '$_id',
      'menu_items': {
        $push: '$menu_items'
      },
      'name': {
        $first: '$name'
      },
      'menu_id': {
        $first: '$menu_id'
      },
      'slug': {
        $first: '$slug'
      }
    }
  }]);

  if (first) {
    menus.limit(first);
  }

  if (skip) {
    menus.skip(skip);
  }

  return await menus.toArray();
};

/***/ }),

/***/ "./src/Collections/posts.js":
/*!**********************************!*
  !*** ./src/Collections/posts.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "post": () => /* binding */ post,
/* harmony export */   "postById": () => /* binding */ postById,
/* harmony export */   "postByParent": () => /* binding */ postByParent,
/* harmony export */   "posts": () => /* binding */ posts,
/* harmony export */   "postsAggregate": () => /* binding */ postsAggregate,
/* harmony export */   "postsAggregateById": () => /* binding */ postsAggregateById,
/* harmony export */   "postType": () => /* binding */ postType,
/* harmony export */   "postContent": () => /* binding */ postContent,
/* harmony export */   "blocksQuery": () => /* binding */ blocksQuery,
/* harmony export */   "purpleIssues": () => /* binding */ purpleIssues,
/* harmony export */   "blockId": () => /* binding */ blockId
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./util/index.js");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Filters_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Filters/filters */ "./src/Filters/filters.js");



const post = async (root, {
  _id,
  blog_id
}, {
  isAuthenticated,
  db
}) => {
  const Posts = db.collection(`posts_${blog_id}`);

  if (!isAuthenticated) {
    const post = await Posts.findOne({
      "_id": _id,
      "post_status": "publish"
    });

    if (post) {
      return (0,_util__WEBPACK_IMPORTED_MODULE_0__.prepare)(post);
    } else return null;
  } else {
    return (0,_util__WEBPACK_IMPORTED_MODULE_0__.prepare)(await Posts.findOne((0,mongodb__WEBPACK_IMPORTED_MODULE_1__.ObjectId)(_id)));
  }
};
const postById = async (root, {
  id,
  blog_id
}, {
  db
}) => {
  const Posts = db.collection(`posts_${blog_id}`);
  return (0,_util__WEBPACK_IMPORTED_MODULE_0__.prepare)(await Posts.findOne({
    post_id: id
  }));
};
const postByParent = async (root, {
  id,
  blog_id
}, {
  db
}) => {
  const Posts = db.collection(`posts_${blog_id}`);
  return (await Posts.find({
    "post_parent": id
  }).toArray()).map(_util__WEBPACK_IMPORTED_MODULE_0__.prepare);
};
const posts = async (root, {
  blog_id,
  filter,
  first,
  skip
}, ctx) => {
  const Posts = db.collection(`posts_${blog_id}`);
  let query = filter ? {
    $or: (0,_Filters_filters__WEBPACK_IMPORTED_MODULE_2__.buildFilters)(filter)
  } : {};
  const isAuthenticated = await ctx.isUserAuthenticated;

  if (!isAuthenticated) {
    Object.assign(query['$or'][0], {
      post_status: {
        $regex: `.*publish.*`
      }
    });
  }

  const posts = await Posts.find(query);

  if (first) {
    posts.limit(first);
  }

  if (skip) {
    posts.skip(skip);
  }

  return posts.toArray();
};
const postsAggregate = async (root, {
  blog_id,
  first,
  skip
}, {
  db
}) => {
  const Posts = db.collection(`posts_${blog_id}`);
  const issues = await Posts.aggregate([{
    $lookup: {
      from: `users_${blog_id}`,
      localField: 'author',
      foreignField: 'user_id',
      as: 'user'
    }
  }, {
    $lookup: {
      from: `taxonomies_${blog_id}`,
      localField: 'categories',
      foreignField: 'term_id',
      as: 'cats'
    }
  }, {
    $lookup: {
      from: `taxonomies_${blog_id}`,
      localField: 'tags',
      foreignField: 'term_id',
      as: 'tags'
    }
  }, {
    $lookup: {
      from: `taxonomies_${blog_id}`,
      localField: 'taxonomies',
      foreignField: 'term_id',
      as: 'taxonomies'
    }
  }, {
    $lookup: {
      from: `comments_${blog_id}`,
      localField: 'comments',
      foreignField: 'comment_id',
      as: 'tags'
    }
  }, {
    $lookup: {
      from: `advanced_custom_fields_${blog_id}`,
      localField: 'advanced_custom_fields.fieldId',
      foreignField: 'ID',
      as: 'advanced_custom_fields.field'
    }
  }, {
    $unwind: '$user'
  }]);

  if (first) {
    issues.limit(first);
  }

  if (skip) {
    issues.skip(skip);
  }

  return issues.toArray();
};
const postsAggregateById = async (parent, {
  id,
  blog_id
}, {
  isUserAuthenticated,
  db
}) => {
  const Posts = db.collection(`posts_${blog_id}`);
  const post = (await Posts.aggregate([{
    $match: {
      post_id: id
    }
  }, {
    $lookup: {
      from: `users_${blog_id}`,
      localField: 'author',
      foreignField: 'user_id',
      as: 'user'
    }
  }, {
    $lookup: {
      from: `taxonomies_${blog_id}`,
      localField: 'categories',
      foreignField: 'term_id',
      as: 'cats'
    }
  }, {
    $lookup: {
      from: `taxonomies_${blog_id}`,
      localField: 'tags',
      foreignField: 'term_id',
      as: 'tags'
    }
  }, {
    $lookup: {
      from: `taxonomies_${blog_id}`,
      localField: 'taxonomies',
      foreignField: 'term_id',
      as: 'taxonomies'
    }
  }, {
    $lookup: {
      from: `comments_${blog_id}`,
      localField: 'comments',
      foreignField: 'comment_id',
      as: 'comment_fields'
    }
  }, {
    $lookup: {
      from: `advanced_custom_fields_${blog_id}`,
      localField: 'advanced_custom_fields.fieldId',
      foreignField: 'ID',
      as: 'advancedCustomFields'
    }
  }, {
    $unwind: '$user'
  }]).toArray()).map(_util__WEBPACK_IMPORTED_MODULE_0__.prepare)[0];
  const isAuthenticated = await isUserAuthenticated;

  if (!isAuthenticated && post.post_status !== "publish") {
    throw new Error('Unauthorised!');
  } else return post;
};
const postType = async (parent, {
  type,
  blog_id
}, {
  db
}) => {
  const Posts = db.collection(`posts_${blog_id}`);
  return (await Posts.find({
    "post_type": type
  }).toArray()).map(_util__WEBPACK_IMPORTED_MODULE_0__.prepare);
};
const postContent = async (parent, {
  content,
  blog_id
}, {
  db
}) => {
  const Posts = db.collection(`posts_${blog_id}`);
  return (await Posts.find({
    '$text': {
      '$search': `${content}`,
      '$caseSensitive': false
    }
  }).toArray()).map(_util__WEBPACK_IMPORTED_MODULE_0__.prepare);
};
const blocksQuery = async (parent, {
  blockName,
  blog_id
}, {
  db
}) => {
  const Posts = db.collection(`posts_${blog_id}`);
  return await Posts.aggregate([{
    $match: {
      "post_content.blockName": blockName
    }
  }, {
    $project: {
      post_content: {
        $filter: {
          input: '$post_content',
          as: 'post_content',
          cond: {
            $eq: ['$$post_content.blockName', blockName]
          }
        }
      }
    }
  }, {
    $unwind: '$post_content'
  }, {
    $replaceRoot: {
      newRoot: '$post_content'
    }
  }]).toArray();
};
const purpleIssues = async (parent, {
  blog_id,
  first,
  skip
}, {
  db
}) => {
  const Posts = db.collection(`posts_${blog_id}`);
  const issues = await Posts.aggregate([{
    $match: {
      post_type: "purple_issue"
    }
  }, {
    $lookup: {
      from: `posts_${blog_id}`,
      localField: 'purple_issue_articles',
      foreignField: 'post_id',
      as: 'issue_posts'
    }
  }]);

  if (first) {
    issues.limit(first);
  }

  if (skip) {
    issues.skip(skip);
  }

  return issues.toArray();
};
const blockId = async (parent, {
  id,
  blog_id
}, {
  isUserAuthenticated,
  db
}) => {
  const Posts = db.collection(`posts_${blog_id}`);
  const isAuthenticated = await isUserAuthenticated;

  if (!isAuthenticated) {
    const post = await Posts.findOne({
      'post_content.attrs.purpleId': id,
      "post_status": "publish"
    }, {
      "post_content.$": 1
    });

    if (post) {
      return (0,_util__WEBPACK_IMPORTED_MODULE_0__.prepare)(post).post_content[0];
    } else return null;
  } else {
    return (0,_util__WEBPACK_IMPORTED_MODULE_0__.prepare)(await Posts.findOne({
      'post_content.attrs.purpleId': id
    }, {
      "post_content.$": 1
    })).post_content[0];
  }
};

/***/ }),

/***/ "./src/Collections/revisions.js":
/*!**************************************!*
  !*** ./src/Collections/revisions.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "revision": () => /* binding */ revision,
/* harmony export */   "revisions": () => /* binding */ revisions
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./util/index.js");

const revision = async (root, {
  postId,
  blog_id
}, {
  db
}) => {
  const Revisions = db.collection(`revisions_${blog_id}`);
  return (0,_util__WEBPACK_IMPORTED_MODULE_0__.prepare)(await Revisions.findOne({
    postId: postId
  }));
};
const revisions = async (root, {
  first,
  skip,
  blog_id
}, {
  db
}) => {
  const Revisions = db.collection(`revisions_${blog_id}`);
  const revisions = await Revisions.find({});

  if (first) {
    revisions.limit(first);
  }

  if (skip) {
    revisions.skip(skip);
  }

  return revisions.toArray();
};

/***/ }),

/***/ "./src/Collections/tags.js":
/*!*********************************!*
  !*** ./src/Collections/tags.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tag": () => /* binding */ tag,
/* harmony export */   "tags": () => /* binding */ tags,
/* harmony export */   "taxonomy": () => /* binding */ taxonomy,
/* harmony export */   "taxonomies": () => /* binding */ taxonomies
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./util/index.js");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Filters_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Filters/filters */ "./src/Filters/filters.js");



const tag = async (root, {
  _id,
  blog_id
}, {
  db
}) => {
  const Tags = db.collection(`taxonomies_${blog_id}`);
  return (0,_util__WEBPACK_IMPORTED_MODULE_0__.prepare)(await Tags.findOne((0,mongodb__WEBPACK_IMPORTED_MODULE_1__.ObjectId)(_id)));
};
const tags = async (root, {
  filter,
  first,
  skip,
  blog_id
}, {
  db
}) => {
  const Tags = db.collection(`taxonomies_${blog_id}`);
  let query = filter ? {
    $or: (0,_Filters_filters__WEBPACK_IMPORTED_MODULE_2__.buildTagFilters)(filter)
  } : {};

  if (Object.keys(query).length === 0 && query.constructor === Object) {
    query = {
      taxonomy: "post_tag"
    };
  } else {
    Object.assign(query['$or'][0], {
      taxonomy: {
        $regex: `.*post_tag.*`
      }
    });
  }

  const tags = await Tags.find(query);

  if (first) {
    tags.limit(first);
  }

  if (skip) {
    tags.skip(skip);
  }

  return tags.toArray();
};
const taxonomy = async (root, {
  _id,
  blog_id
}, {
  db
}) => {
  const Taxonomies = db.collection(`taxonomies_${blog_id}`);
  return (0,_util__WEBPACK_IMPORTED_MODULE_0__.prepare)(await Taxonomies.findOne((0,mongodb__WEBPACK_IMPORTED_MODULE_1__.ObjectId)(_id)));
};
const taxonomies = async (root, {
  filter,
  first,
  skip,
  blog_id
}, {
  db
}) => {
  const Taxonomies = db.collection(`taxonomies_${blog_id}`);
  let query = filter ? {
    $or: (0,_Filters_filters__WEBPACK_IMPORTED_MODULE_2__.buildTagFilters)(filter)
  } : {};
  const taxonomies = await Taxonomies.find(query);

  if (first) {
    taxonomies.limit(first);
  }

  if (skip) {
    taxonomies.skip(skip);
  }

  return taxonomies.toArray();
};

/***/ }),

/***/ "./src/Collections/users.js":
/*!**********************************!*
  !*** ./src/Collections/users.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "user": () => /* binding */ user,
/* harmony export */   "users": () => /* binding */ users
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./util/index.js");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Filters_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Filters/filters */ "./src/Filters/filters.js");



const user = async (root, {
  _id,
  blog_id
}, {
  db
}) => {
  const Users = db.collection(`users_${blog_id}`);
  return (0,_util__WEBPACK_IMPORTED_MODULE_0__.prepare)(await Users.findOne((0,mongodb__WEBPACK_IMPORTED_MODULE_1__.ObjectId)(_id)));
};
const users = async (root, {
  filter,
  first,
  skip,
  blog_id
}, {
  db
}) => {
  const Users = db.collection(`users_${blog_id}`);
  let query = filter ? {
    $or: (0,_Filters_filters__WEBPACK_IMPORTED_MODULE_2__.buildUserFilters)(filter)
  } : {};
  const users = await Users.find(query);

  if (first) {
    users.limit(first);
  }

  if (skip) {
    users.skip(skip);
  }

  return users.toArray();
};

/***/ }),

/***/ "./src/Filters/filters.js":
/*!********************************!*
  !*** ./src/Filters/filters.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildFilters": () => /* binding */ buildFilters,
/* harmony export */   "buildTagFilters": () => /* binding */ buildTagFilters,
/* harmony export */   "buildCategoryFilters": () => /* binding */ buildCategoryFilters,
/* harmony export */   "buildAdvancedCustomFieldsFilter": () => /* binding */ buildAdvancedCustomFieldsFilter,
/* harmony export */   "buildUserFilters": () => /* binding */ buildUserFilters
/* harmony export */ });
function buildFilters({
  OR = [],
  title_contains,
  post_type_contains,
  post_content_contains
}) {
  const filter = title_contains || post_type_contains || post_content_contains ? {} : null;

  if (title_contains) {
    filter.post_title = {
      $regex: `.*${title_contains}.*`
    };
  }

  if (post_type_contains) {
    filter.post_type = {
      $regex: `.*${post_type_contains}.*`
    };
  }

  if (post_content_contains) {
    filter['post_content.attrs.content'] = {
      $regex: new RegExp(`.*${post_content_contains}.*`, 'i')
    };
  }

  let filters = filter ? [filter] : [];

  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(buildFilters(OR[i]));
  }

  return filters;
}
function buildTagFilters({
  OR = [],
  name_contains,
  slug_contains
}) {
  const filter = name_contains || slug_contains ? {} : null;

  if (name_contains) {
    filter.name = {
      $regex: `.*${name_contains}.*`
    };
  }

  if (slug_contains) {
    filter.slug = {
      $regex: `.*${slug_contains}.*`
    };
  }

  let filters = filter ? [filter] : [];

  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(buildTagFilters(OR[i]));
  }

  return filters;
}
function buildCategoryFilters({
  OR = [],
  name_contains
}) {
  const filter = name_contains ? {} : null;

  if (name_contains) {
    filter.name = {
      $regex: `.*${name_contains}.*`
    };
  }

  let filters = filter ? [filter] : [];

  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(buildCategoryFilters(OR[i]));
  }

  return filters;
}
function buildAdvancedCustomFieldsFilter({
  OR = [],
  title_contains
}) {
  const filter = title_contains ? {} : null;

  if (title_contains) {
    filter.title = {
      $regex: `.*${title_contains}.*`
    };
  }

  let filters = filter ? [filter] : [];

  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(buildAdvancedCustomFieldsFilter(OR[i]));
  }

  return filters;
}
function buildUserFilters({
  OR = [],
  display_name_contains,
  email_contains,
  login_contains
}) {
  const filter = display_name_contains || email_contains || login_contains ? {} : null;

  if (display_name_contains) {
    filter.display_name = {
      $regex: `.*${display_name_contains}.*`
    };
  }

  if (email_contains) {
    filter.email = {
      $regex: `.*${email_contains}.*`
    };
  }

  if (login_contains) {
    filter.login = {
      $regex: `.*${login_contains}.*`
    };
  }

  let filters = filter ? [filter] : [];

  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(buildUserFilters(OR[i]));
  }

  return filters;
}

/***/ }),

/***/ "./src/start.js":
/*!**********************!*
  !*** ./src/start.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handler": () => /* binding */ handler
/* harmony export */ });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _typedefs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./typedefs */ "./src/typedefs.js");
/* harmony import */ var _Collections_users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Collections/users */ "./src/Collections/users.js");
/* harmony import */ var _Collections_tags__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Collections/tags */ "./src/Collections/tags.js");
/* harmony import */ var _Collections_categories__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Collections/categories */ "./src/Collections/categories.js");
/* harmony import */ var _Collections_posts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Collections/posts */ "./src/Collections/posts.js");
/* harmony import */ var _Collections_menus__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Collections/menus */ "./src/Collections/menus.js");
/* harmony import */ var _Collections_acf__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Collections/acf */ "./src/Collections/acf.js");
/* harmony import */ var _Collections_revisions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Collections/revisions */ "./src/Collections/revisions.js");
/* harmony import */ var graphql_shield__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! graphql-shield */ "graphql-shield");
/* harmony import */ var graphql_shield__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(graphql_shield__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../util */ "./util/index.js");
/* harmony import */ var wordpress_hash_node__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! wordpress-hash-node */ "wordpress-hash-node");
/* harmony import */ var wordpress_hash_node__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(wordpress_hash_node__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var graphql_middleware__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! graphql-middleware */ "graphql-middleware");
/* harmony import */ var graphql_middleware__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(graphql_middleware__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! serverless-http */ "serverless-http");
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(serverless_http__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! graphql-playground-middleware-express */ "graphql-playground-middleware-express");
/* harmony import */ var graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_19__);




















const app = express__WEBPACK_IMPORTED_MODULE_1___default()();
app.use(cors__WEBPACK_IMPORTED_MODULE_2___default()());

const getBlogId = request => {
  const obj = (graphql_tag__WEBPACK_IMPORTED_MODULE_14___default())`
              ${request.body.query}
            `;
  const queryArguments = obj.definitions[0].selectionSet.selections[0].arguments;

  if (queryArguments) {
    const blog_id = queryArguments.filter(argument => argument.name.value === "blog_id");

    if (blog_id.length > 0) {
      return blog_id[0].value.value;
    } else return 1;
  } else return null;
};

const resolvers = {
  Query: {
    user: _Collections_users__WEBPACK_IMPORTED_MODULE_4__.user,
    users: _Collections_users__WEBPACK_IMPORTED_MODULE_4__.users,
    tag: _Collections_tags__WEBPACK_IMPORTED_MODULE_5__.tag,
    tags: _Collections_tags__WEBPACK_IMPORTED_MODULE_5__.tags,
    taxonomy: _Collections_tags__WEBPACK_IMPORTED_MODULE_5__.taxonomy,
    taxonomies: _Collections_tags__WEBPACK_IMPORTED_MODULE_5__.taxonomies,
    category: _Collections_categories__WEBPACK_IMPORTED_MODULE_6__.category,
    categories: _Collections_categories__WEBPACK_IMPORTED_MODULE_6__.categories,
    post: _Collections_posts__WEBPACK_IMPORTED_MODULE_7__.post,
    posts: _Collections_posts__WEBPACK_IMPORTED_MODULE_7__.posts,
    postById: _Collections_posts__WEBPACK_IMPORTED_MODULE_7__.postById,
    postByParent: _Collections_posts__WEBPACK_IMPORTED_MODULE_7__.postByParent,
    postsAggregate: _Collections_posts__WEBPACK_IMPORTED_MODULE_7__.postsAggregate,
    postsAggregateById: _Collections_posts__WEBPACK_IMPORTED_MODULE_7__.postsAggregateById,
    postType: _Collections_posts__WEBPACK_IMPORTED_MODULE_7__.postType,
    postContent: _Collections_posts__WEBPACK_IMPORTED_MODULE_7__.postContent,
    blocksQuery: _Collections_posts__WEBPACK_IMPORTED_MODULE_7__.blocksQuery,
    purpleIssues: _Collections_posts__WEBPACK_IMPORTED_MODULE_7__.purpleIssues,
    blockId: _Collections_posts__WEBPACK_IMPORTED_MODULE_7__.blockId,
    advancedCustomField: _Collections_acf__WEBPACK_IMPORTED_MODULE_9__.advancedCustomField,
    advancedCustomFields: _Collections_acf__WEBPACK_IMPORTED_MODULE_9__.advancedCustomFields,
    menusAggregate: _Collections_menus__WEBPACK_IMPORTED_MODULE_8__.menusAggregate,
    revision: _Collections_revisions__WEBPACK_IMPORTED_MODULE_10__.revision,
    revisions: _Collections_revisions__WEBPACK_IMPORTED_MODULE_10__.revisions
  }
};

const isUserAuthenticated = async request => {
  const blog_id = getBlogId(request);
  const b64auth = (request.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  if (login) {
    const user = await getUserByName(blog_id, login);
    return (0,wordpress_hash_node__WEBPACK_IMPORTED_MODULE_13__.CheckPassword)(password, user.password);
  } else return false;
};

const getUser = async request => {
  const blog_id = getBlogId(request);
  const b64auth = (request.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  if (login) {
    return await getUserByName(blog_id, login);
  } else return null;
};

const URL = 'mongodb://localhost:27017';
const client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(URL, {
  useNewUrlParser: true
});

const getDb = async () => {
  if (!client.isConnected()) {
    // Cold start or connection timed out. Create new connection.
    try {
      await client.connect();
      return client.db('wp');
    } catch (e) {
      return e;
    }
  } else {
    return client.db('wp');
  }
};

const getUserByName = async (blog_id, name) => {
  const db = await getDb();
  const Users = db.collection(`users_${blog_id}`);
  return (0,_util__WEBPACK_IMPORTED_MODULE_12__.prepare)(await Users.findOne({
    'login': name
  }));
};

const isAuthenticated = (0,graphql_shield__WEBPACK_IMPORTED_MODULE_11__.rule)({
  cache: 'contextual'
})(async (root, args, ctx) => {
  return ctx.isUserAuthenticated;
});
const isAdmin = (0,graphql_shield__WEBPACK_IMPORTED_MODULE_11__.rule)({
  cache: 'contextual'
})(async (parent, args, ctx, info) => {
  const user = await ctx.user;
  return user.roles.includes('administrator');
});
const permissions = (0,graphql_shield__WEBPACK_IMPORTED_MODULE_11__.shield)({
  Query: {
    "*": graphql_shield__WEBPACK_IMPORTED_MODULE_11__.deny,
    posts: graphql_shield__WEBPACK_IMPORTED_MODULE_11__.allow,
    postsAggregateById: graphql_shield__WEBPACK_IMPORTED_MODULE_11__.allow,
    revision: (0,graphql_shield__WEBPACK_IMPORTED_MODULE_11__.and)(isAuthenticated, isAdmin),
    revisions: (0,graphql_shield__WEBPACK_IMPORTED_MODULE_11__.and)(isAuthenticated, isAdmin),
    user: (0,graphql_shield__WEBPACK_IMPORTED_MODULE_11__.and)(isAuthenticated, isAdmin),
    users: (0,graphql_shield__WEBPACK_IMPORTED_MODULE_11__.and)(isAuthenticated, isAdmin),
    tag: graphql_shield__WEBPACK_IMPORTED_MODULE_11__.allow,
    tags: graphql_shield__WEBPACK_IMPORTED_MODULE_11__.allow,
    taxonomy: isAuthenticated,
    taxonomies: isAuthenticated,
    category: graphql_shield__WEBPACK_IMPORTED_MODULE_11__.allow,
    categories: graphql_shield__WEBPACK_IMPORTED_MODULE_11__.allow,
    post: isAuthenticated,
    postById: isAuthenticated,
    postByParent: isAuthenticated,
    postsAggregate: isAuthenticated,
    postType: isAuthenticated,
    postContent: isAuthenticated,
    blocksQuery: isAuthenticated,
    purpleIssues: isAuthenticated,
    blockId: graphql_shield__WEBPACK_IMPORTED_MODULE_11__.allow,
    advancedCustomField: isAuthenticated,
    advancedCustomFields: isAuthenticated,
    menusAggregate: isAuthenticated
  }
}, {
  debug: "development" !== "production"
});
const schema = (0,graphql_middleware__WEBPACK_IMPORTED_MODULE_16__.applyMiddleware)((0,apollo_server__WEBPACK_IMPORTED_MODULE_15__.makeExecutableSchema)({
  typeDefs: _typedefs__WEBPACK_IMPORTED_MODULE_3__.typeDefs,
  resolvers
}), permissions);
const server = new apollo_server_express__WEBPACK_IMPORTED_MODULE_19__.ApolloServer({
  schema,
  context: ({
    req
  }) => ({
    isUserAuthenticated: isUserAuthenticated(req),
    user: getUser(req),
    db: getDb()
  })
});
server.applyMiddleware({
  app
});
app.get("/playground", graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_18___default()({
  endpoint: "/graphql"
}));
const handler = serverless_http__WEBPACK_IMPORTED_MODULE_17___default()(app);


/***/ }),

/***/ "./src/typedefs.js":
/*!*************************!*
  !*** ./src/typedefs.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "typeDefs": () => /* binding */ typeDefs
/* harmony export */ });
const typeDefs = `
      type Query {
         user(_id: String, blog_id: Int): User
         users(filter: UserFilter, skip: Int, first: Int, blog_id: Int): [User]
         tag(_id: String, blog_id: Int): Taxonomy
         tags(filter: TagFilter, skip: Int, first: Int, blog_id: Int): [Taxonomy]
         taxonomy(_id: String, blog_id: Int): Taxonomy
         taxonomies(filter: TagFilter, skip: Int, first: Int, blog_id: Int): [Taxonomy]
         revision(postId: Int, blog_id: Int): Post
         revisions(skip: Int, first: Int, blog_id: Int): [Post]
         category(_id: String, blog_id: Int): Taxonomy
         categories(filter: CategoryFilter, skip: Int, first: Int, blog_id: Int): [Taxonomy]
         post(_id: String, blog_id: Int): Post
         posts(filter: PostFilter, skip: Int, first: Int, blog_id: Int): [Post]
         postsAggregate(first: Int, skip: Int, filter: PostFilter, blog_id: Int): [Post]
         postsAggregateById(id: Int, blog_id: Int): Post
         postContent(content: String, blog_id: Int): [Post]
         postType(type: String, blog_id: Int): [Post]
         blocksQuery(blockName: String, blog_id: Int): [Block]
         blockId(id: String, blog_id: Int): Block
         purpleIssues(blog_id: Int, , skip: Int, first: Int): [Post]
         postById(id: Int, blog_id: Int): Post
         postByParent(id: Int, blog_id: Int): [Post]
         menusAggregate(first: Int, skip: Int, blog_id: Int): [Menu]
         advancedCustomField(_id: String, blog_id: Int): ACFGroup
         advancedCustomFields(filter: AdvancedCustomFieldFilter, skip: Int, first: Int, blog_id: Int): [ACFGroup]
      }
      
      input PostFilter {
          OR: [PostFilter!]
          title_contains: String
          post_type_contains: String
          post_content_contains: String
        }
        
        input TagFilter {
          OR: [TagFilter!]
          name_contains: String
          slug_contains: String
        }
        
         input AdvancedCustomFieldFilter {
          OR: [AdvancedCustomFieldFilter!]
          title_contains: String
        }
        
         input CategoryFilter {
          OR: [CategoryFilter!]
          name_contains: String
        }
        
        input UserFilter {
         OR: [UserFilter!]
          display_name_contains: String
          email_contains: String
          login_contains: String
        }

      type Post {
        _id: String
        post_id: Int
        author: Int
        categories: [Int]
        comment_status: String
        guid: String
        post_modified: String
        post_modified_gmt: String
        post_name: String
        post_parent: Int
        post_status: String
        post_title: String
        post_type: String
        comment_count: String
        thumbnail: String
        permalink: String
        post_excerpt: String
        post_content: [Block]
        tags: [Taxonomy]
        cats: [Taxonomy]
        user: User
        custom_fields: [CustomField]
        purple_issue: Int
        purple_issue_articles: [Int]
        issue_posts: [Post]
        comments: [Int]
        comment_fields: [Comment]
        advancedCustomFields: [AdvancedCustomField]
        advanced_custom_fields: [AdvancedCustomField]
        taxonomies: [Taxonomy]
      }
      
      type AdvancedCustomFieldWithValue {
        fieldId: Int
        field: AdvancedCustomField
        value: String
      }
      
      type AdvancedCustomField {
        ID: Int,
        _name: String,
        _valid: Int,
        append: String,
        class: String,
        conditional_logic: Int,
        default_value: String,
        id: Int,
        instructions: String,
        key: String,
        label: String,
        maxlength: String,
        menu_order: Int,
        name: String,
        parent: Int,
        placeholder: String,
        prefix: String,
        prepend: String,
        required: Int,
        type: String,
        value: String,
        wrapper: Wrapper
      }
      
      type ACFGroup {
        ID: Int,
        _valid: Boolean,
        active: Boolean,
        description: String,
        fields: [AdvancedCustomField]
        hide_on_screen: String,
        instruction_placement: String,
        key: String,
        label_placement: String,
        location: [[Location]],
        menu_order: Int,
        position: String,
        style: String,
        title: String
      }
      
      type Location {
        param: String,
        operator: String,
        value: String
      }
      
      type Wrapper {
            width: String,
            class: String,
            id: String
      }
      
      type CustomField {
        field: String
        value: String
      }
      
      type Comment {
        comment_id: Int
        author: Int
        comment_date: String
        text: String
        comment_post_ID: Int
        status: String
      }
      
      type User {
        user_id: Int
        login: String
        display_name: String
        email: String
      }
      
      type Block {
        blockName: String
        attrs: Attr
        innerBlocks: [Block]
        innerHTML: String
        innerContent: [String]
      }
      
      type Menu {
        menu_id: Int
        name: String
        slug: String
        menu_items: [MenuItem]
      }
      
      type MenuItem {
        ID: Int
        attr_title: String
        classes: [String]
        comment_count: String
        comment_status: String
        db_id: Int
        description: String
        filter: String
        guid: String
        menu_item_parent: String
        menu_order: Int
        object: String
        object_id: String
        ping_status: String
        pinged: String
        post_author: String
        post_content: String
        post_content_filtered: String
        post_date: String
        post_date_gmt: String
        post_excerpt: String
        post_mime_type: String
        post_modified: String
        post_modified_gmt: String
        post_name: String
        post_parent: Int
        post_password: String
        post_status: String
        post_title: String
        post_type: String
        target: String
        title: String
        to_ping: String
        type: String
        type_label: String
        url: String
        xfn: String
      }
      
      type Attr {
        align: String
        className: String
        id: Int
        level: Int
        sizeSlug: String
        content: String
        purpleId: String
      }
      
       type Taxonomy {
        _id: String
        term_id: Int
        name: String
        slug: String
        description: String
        taxonomy: String
        count: Int
        filter: String
        parent: Int
        term_group: Int
        term_taxonomy_id: Int
      }

      schema {
        query: Query
      }
    `;

/***/ }),

/***/ "./util/index.js":
/*!***********************!*
  !*** ./util/index.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prepare": () => /* binding */ prepare
/* harmony export */ });
const prepare = o => {
  o._id = o._id.toString();
  return o;
};

/***/ }),

/***/ "apollo-server":
/*!********************************!*
  !*** external "apollo-server" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("apollo-server");;

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*
  !*** external "apollo-server-express" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("apollo-server-express");;

/***/ }),

/***/ "cors":
/*!***********************!*
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");;

/***/ }),

/***/ "express":
/*!**************************!*
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "graphql-middleware":
/*!*************************************!*
  !*** external "graphql-middleware" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("graphql-middleware");;

/***/ }),

/***/ "graphql-playground-middleware-express":
/*!********************************************************!*
  !*** external "graphql-playground-middleware-express" ***!
  \********************************************************/
/***/ ((module) => {

module.exports = require("graphql-playground-middleware-express");;

/***/ }),

/***/ "graphql-shield":
/*!*********************************!*
  !*** external "graphql-shield" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("graphql-shield");;

/***/ }),

/***/ "graphql-tag":
/*!******************************!*
  !*** external "graphql-tag" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("graphql-tag");;

/***/ }),

/***/ "mongodb":
/*!**************************!*
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");;

/***/ }),

/***/ "serverless-http":
/*!**********************************!*
  !*** external "serverless-http" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("serverless-http");;

/***/ }),

/***/ "wordpress-hash-node":
/*!**************************************!*
  !*** external "wordpress-hash-node" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("wordpress-hash-node");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/start.js");
/******/ })()
;
//# sourceMappingURL=start.js.map