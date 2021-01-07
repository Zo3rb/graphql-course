const GraphQLServer = require('graphql-yoga').GraphQLServer;

const resolvers = {
    Query: require("./resolvers/Query"),
    Mutation: require("./resolvers/Mutation"),
    User: require("./resolvers/User"),
    Post: require("./resolvers/Post"),
    Comment: require("./resolvers/Comment")
};

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: {
        db: require('./db')
    }
});

server.start(() => console.log('The GraphQL Server is Up and Running'));