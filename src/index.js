const GraphQLServer = require('graphql-yoga').GraphQLServer;

// Creating a Users List to Demonstrate a Data Coming From The Server
const users = [
    {
        id: 1,
        username: "Ali",
        email: "Ali@example.com",
        age: 30,
        isAdmin: true
    },
    {
        id: 2,
        username: "Sarah",
        email: "Sarah@example.com",
        age: 30,
        isAdmin: true
    },
    {
        id: 3,
        username: "Bro",
        email: "Bro@example.com",
        age: 30,
        isAdmin: true
    }
];

// Creating a Posts List to Demonstrate a Data Coming From The Server
const posts = [
    {
        id: "abc123456",
        title: "The First Post",
        body: "The Body Of The First Post Created With The User => Check Author",
        isPublished: true,
        author: 1
    },
    {
        id: "abc12456",
        title: "The Second Post",
        body: "The Body Of The Second Post Created With The User => Check Author",
        isPublished: true,
        author: 1
    },
    {
        id: "abc12356",
        title: "The Third Post",
        body: "The Body Of The Third Post Created With The User => Check Author",
        isPublished: true,
        author: 3
    }
];

// Creating a Comment List to Demonstrate a Data Coming From The Server
const comments = [
    {
        id: 1,
        text: "This is a Comment Coming From The Server for a Specific Post",
        author: 2,
        post: "abc123456"
    },
    {
        id: 2,
        text: "This is a Comment Coming From The Server for a Specific Post",
        author: 3,
        post: "abc123456"
    },
    {
        id: 3,
        text: "This is a Comment Coming From The Server for a Specific Post",
        author: 3,
        post: "abc12356"
    },
    {
        id: 4,
        text: "This is a Comment Coming From The Server for a Specific Post",
        author: 1,
        post: "abc12456"
    }
];

// Creating Type Definitions
const typeDefs = `
    type Query {
        posts: [Post!]!
        users(query: String): [User!]!
        greeting(name: String): String!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        isPublished: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        age: Int!
        isAdmin: Boolean!
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`;

// Creating The Resolvers
const resolvers = {
    Query: {
        posts() {
            return posts;
        },
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            };
            return users.filter(user => {
                return user.username.toLowerCase().includes(args.query.toLowerCase())
            });
        },
        greeting(parent, args, ctx, info) {
            return `Hello ${args.name}`;
        },
        comments() {
            return comments;
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author);
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.post === parent.id);
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => post.author === parent.id);
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id);
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author);
        },
        post(parent, args, ctx, info) {
            return posts.find(post => post.id === parent.post);
        }
    }
};

// Initiating The GraphQL Server
const server = new GraphQLServer({ typeDefs, resolvers });

// Starting The Server
server.start(() => console.log('GraphQL Server Started'));
