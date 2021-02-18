export const typeDefs = `
      type Query {
         user(_id: String): User
         users(filter: UserFilter, skip: Int, first: Int): [User]
         tag(_id: String): Taxonomy
         tags(filter: TagFilter, skip: Int, first: Int): [Taxonomy]
         taxonomy(_id: String): Taxonomy
         taxonomies(filter: TagFilter, skip: Int, first: Int): [Taxonomy]
         revision(postId: String): Post
         revisions(skip: Int, first: Int): [Post]
         category(_id: String): Taxonomy
         categories(filter: CategoryFilter, skip: Int, first: Int): [Taxonomy]
         post(_id: String): Post
         posts(filter: PostFilter, skip: Int, first: Int): [Post]
         postsAggregate(first: Int, skip: Int, filter: PostFilter): [Post]
         postsAggregateById(id: String): Post
         postContent(content: String): [Post]
         postType(type: String): [Post]
         blocksQuery(blockName: String): [Block]
         blockId(id: String): Block
         purpleIssues(skip: Int, first: Int): [Post]
         postById(id: Int): Post
         postByParent(id: Int): [Post]
         menusAggregate(first: Int, skip: Int): [Menu]
         advancedCustomField(_id: String): ACFGroup
         advancedCustomFields(filter: AdvancedCustomFieldFilter, skip: Int, first: Int): [ACFGroup]
      }
      
      input PostFilter {
          AND: [PostFilter!]
          title_contains: String
          post_type_contains: String
          date_start: String
          date_end: String
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
        source_post_id: String
        author: String
        categories: [String]
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
        advanced_custom_fields: [AdvancedCustomFieldWithValue]
        taxonomies: [Taxonomy],
        source_id: Int,
        source_title: String,
        source_href: String,
        uagb_featured_image_src: ImageSource,
        content_html: String
      }
      
      type ImageSource {
        full: [String]
        thumbnail: [String]
        medium: [String]
        medium_large: [String]
        large: [String]
        awb_sm: [String]
        awb_md: [String]
        awb_lg: [String]
        awb_xl: [String]
        abBlockPostGridLandscape: [String]
        abBlockPostGridSquare: [String]
        postThumbnail: [String]
        twentytwentyFullscreen: [String]
      }
      
      type AdvancedCustomFieldWithValue {
        fieldId: String
        field: AdvancedCustomField
        value: String
      }
      
      type AdvancedCustomField {
        ID: Int,
        source_acf_id: String
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
        source_acf_id: String
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
        source_comment_id: String
        author: Int
        comment_date: String
        text: String
        comment_post_ID: Int
        status: String
      }
      
      type User {
        user_id: Int
        source_user_id: String
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
        source_menu_id: String
        name: String
        slug: String
        menu_items: [MenuItem]
      }
      
      type MenuItem {
        ID: Int
        source_menu_items_id: String
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
        source_term_id: String
        name: String
        slug: String
        description: String
        taxonomy: String
        count: Int
        filter: String
        parent: Int
        term_group: Int
        term_taxonomy_id: Int
        source_parent: String
      }

      schema {
        query: Query
      }
    `;
