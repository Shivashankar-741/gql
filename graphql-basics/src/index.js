import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid";

let users = [
  { id: "1", name: "Shivashankar", email: "shiva@gmail.com", age: 20 },
  { id: "2", name: "karthik", email: "karthik@gmail.com", age: 23 },
  { id: "3", name: "shankar", email: "shankar@gmail.com" },
];

let posts = [
  { id: "4", title: "graphql course", body: "by andrew mead", published: true, author: "1" },
  { id: "5", title: "graphql book", body: "by jon doe", published: true, author: "1" },
  { id: "6", title: "express", body: "by andrew mead", published: false, author: "2" },
];

let comments = [
  { id: "21", text: "javascript", author: "1", post: "4" },
  { id: "22", text: "Node", author: "2", post: "5" },
  { id: "23", text: "GraphQl", author: "2", post: "5" },
  { id: "24", text: "Apollo", author: "3", post: "6" },
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

        type Mutation{
          createUser(data: createUserInput): User!
          deleteUser(id: ID!): User!
          createPost(data: createPostInput):Post!
          createComment(data: createCommentInput):Comment!
        }

        input createUserInput{
          name: String!, 
          email: String!,
          age: Int
        }

        input createPostInput{
          title: String!
          body: String!
          published: Boolean!
          author: ID!
        }

        input createCommentInput{
          text: String!
          author: ID! 
          post:ID!
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
          comments:[Comment!]!
        }

        type Comment{
          id:ID!
          text:String!
          author:User!
          post:Post!
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

  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email);

      if (emailTaken) throw new Error("Email taken.");

      const user = {
        id: uuidv4(),
        ...args.data,
      };

      users.push(user);

      return user;
    },

    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex((user) => user.id === args.id);

      if (userIndex === -1) throw new Error("User not found");

      const deletedUsers = users.splice(userIndex, 1);

      posts = post.filter((post) => {
        const match = post.author === args.id;

        if (match) {
          comments = comments.filter((comment) => comment.post !== post.id);
        }

        return !match;
      });
      comments = comments.filter((comment) => comment.author !== args.id);
      return deletedUsers[0];
    },

    createPost(parent, args, ctx, info) {
      const userExists = users.find((user) => user.id === args.data.author);

      if (!userExists) throw new Error(" User not Found");

      const post = {
        id: uuidv4(),
        ...args.data,
      };

      posts.push(post);

      return post;
    },

    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);
      const postExists = posts.some((post) => post.id === args.data.post && post.published);

      if (!userExists || !postExists) throw new Error("unable to find user and post");

      const comment = {
        id: uuidv4(),
        ...args.data,
      };

      comments.push(comment);

      return comment;
    },
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },

  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },

    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.post);
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
