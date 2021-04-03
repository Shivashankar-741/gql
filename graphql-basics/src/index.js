import { GraphQLServer } from "graphql-yoga";

//Type definitions (scheme)
const typeDefs = `
        type Query{
          add(numbers: [Float!]): Float!
          greeting(name: String, position: String): String!
          grades:[Int!]!
          me: User!
          post:Post!
        }

        type User{
          id:ID!
          name:String!
          email:String!
          age:Int
        }

        type Post{
          id:ID!
          title:String!
          body:String!
          published:Boolean!
        }
    `;

//Resolvers
const resolvers = {
  Query: {
    grades(parent, args, ctx, info) {
      return [90, 98, 99];
    },
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) return 0;
      return args.numbers.reduce((a, b) => a + b);
    },
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) return `Hello ${args.name} working as a ${args.position}`;
      else return "hello";
    },
    me() {
      return {
        id: "1233-fdasf334",
        name: "Shiva",
        email: "shiva@gmail.com",
        age: 20,
      };
    },
    post() {
      return {
        id: "1233-fdas34433",
        title: "Graphql course",
        body: "by andrew mead",
        published: true,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The server has started");
});
