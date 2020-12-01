export const typeDefs = `
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
