// Trying to Create The 1st/Most Basic GraphQL server/api
const GraphQLServer = require('graphql-yoga').GraphQLServer;

// 1 --> The Application typeDefs (Schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

// 2 --> The Application Resolvers (Controllers in Rest APIs)
const resolvers = {
    Query: {
        hello() {
            return 'Hello World -- This is Our First Query From First Resolver';
        },
        name() {
            return "My Name's Ali Fakhri and I'm Trying to Copy/Paste The Code From The Course"
        },
        location() {
            return "I'm From Egypt"
        },
        bio() {
            return "JS Developer Inshullah"
        }
    }
};

// 3 --> Now We Initiate The Server
const graphQLServer = new GraphQLServer({
    typeDefs,
    resolvers
});

// 4 --> After Initiating The GraphQL Server WE Start The it
graphQLServer.start(() => console.log('The GraphQL Server Started Successfully'));
