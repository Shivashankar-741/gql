import { GraphQLServer } from "graphql-yoga";

//Type definitions (scheme)
const typeDefs = `
        type Query{
           id:ID!
           name:String!
           age:Int!
           employed:Boolean!
           gpa:Float
           title:String!
           price:Float!
           releaseYear:Int
           rating:Float
           inStock:Boolean!
        }

        type User{
          id:ID!
          name:String!
          email:String!
          age:Int
        }
    `;

//Resolvers
const resolvers = {
  Query: {
    id() {
      return "abc-343-234asdfs";
    },
    name() {
      return "I'm Shivashankar here";
    },
    age() {
      return 20;
    },
    employed() {
      return true;
    },
    gpa() {
      return 3.8;
    },

    title() {
      return "Boat bass headset with Mic";
    },
    price() {
      return 1200.12;
    },
    releaseYear() {
      return 2021;
    },
    rating() {
      return 4.8;
    },
    inStock() {
      return true;
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
