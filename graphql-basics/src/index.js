import { GraphQLServer } from "graphql-yoga";

const users = [
  { id: "1", name: "Shivashankar", email: "shiva@gmail.com", age: 20 },
  { id: "2", name: "karthik", email: "karthik@gmail.com", age: 23 },
  { id: "3", name: "shankar", email: "shankar@gmail.com" },
];

const posts = [
  { id: "4", title: "graphql course", body: "by andrew mead", published: true, author: "1" },
  { id: "5", title: "graphql book", body: "by jon doe", published: true, author: "1" },
  { id: "6", title: "express", body: "by andrew mead", published: false, author: "2" },
];

const comments = [
  { id: "21", text: "javascript", author: "1" },
  { id: "22", text: "Node", author: "2" },
  { id: "23", text: "GraphQl", author: "2" },
  { id: "24", text: "Apollo", author: "3" },
];

//Type definitions (scheme)
const typeDefs = `
        type Query{
          users(query: String):[User!]!
          posts(query: String):[Post!]!
          comments:[Comment]!
          me: User!
          post:Post!
        }

        type User{
          id:ID!
          name:String!
          email:String!
          age:Int
          posts:[Post!]!
          comments:[Comment!]!
        }

        type Post{
          id:ID!
          title:String!
          body:String!
          published:Boolean!
          author:User!
        }

        type Comment{
          id:ID!
          text:String!
          author:User!
        }
    `;

//Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) return users;

      return users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()));
    },
    posts(parent, args, ctx, info) {
      if (!args.query) return posts;

      return posts.filter((post) => {
        const title = post.title.split(" ");
        const body = post.body.split(" ");
        const isContain = [...title, ...body].includes(args.query);
        if (isContain) return post;
      });
    },
    comments(parent, args, ctx, info) {
      return comments;
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
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.author);
    },
  },

  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
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
