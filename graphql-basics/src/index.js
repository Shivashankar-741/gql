import { GraphQLServer } from "graphql-yoga";

//Type definitions (scheme)
const typeDefs = `
        type Query{
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
