export const COMMENT_FRAGMENT = `
    fragment CommentFragment on Comment {
        id
        text
        user {
            username
        }
    }
`;
