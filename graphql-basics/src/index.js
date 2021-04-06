import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid";
import db from "./db";

//Resolvers
const resolvers = {
  Query: {
    // users(parent, args, ctx, info) {
    users(parent, args, { db }, info) {
      if (!args.query) return db.users;

      return db.users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()));
    },
    posts(parent, args, { db }, info) {
      if (!args.query) return db.posts;

      return db.posts.filter((post) => {
        const title = post.title.split(" ");
        const body = post.body.split(" ");
        const isContain = [...title, ...body].includes(args.query);
        if (isContain) return post;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments;
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
    createUser(parent, args, { db }, info) {
      const emailTaken = db.users.some((user) => user.email === args.data.email);

      if (emailTaken) throw new Error("Email taken.");

      const user = {
        id: uuidv4(),
        ...args.data,
      };

      db.users.push(user);

      return user;
    },

    deleteUser(parent, args, { db }, info) {
      const userIndex = db.users.findIndex((user) => user.id === args.id);

      if (userIndex === -1) throw new Error("User not found");

      const deletedUsers = db.users.splice(userIndex, 1);

      console.log(deletedUsers);

      posts = db.posts.filter((post) => {
        const match = post.author === args.id; // if match author and id it will give true otherwise false
        console.log(match);
        if (match) {
          db.comments = db.comments.filter((comment) => comment.post !== post.id);
        }

        return !match; // should return true when we didn't find the match and return false when we did find the match.
      });
      db.comments = db.comments.filter((comment) => comment.author !== args.id);
      return deletedUsers[0];
    },

    createPost(parent, args, { db }, info) {
      const userExists = db.users.find((user) => user.id === args.data.author);

      if (!userExists) throw new Error(" User not Found");

      const post = {
        id: uuidv4(),
        ...args.data,
      };

      db.posts.push(post);

      return post;
    },

    deletePost(parent, args, { db }, info) {
      const postIndex = db.posts.findIndex((posts) => posts.id === args.id);

      if (postIndex === -1) throw new Error("Post not found");

      const deletedPosts = db.posts.splice(postIndex, 1);
      db.comments = db.comments.filter((comment) => comment.post !== args.id);
      return deletedPosts[0];
    },

    createComment(parent, args, { db }, info) {
      const userExists = db.users.some((user) => user.id === args.data.author);
      const postExists = db.posts.some((post) => post.id === args.data.post && post.published);

      if (!userExists || !postExists) throw new Error("unable to find user and post");

      const comment = {
        id: uuidv4(),
        ...args.data,
      };

      db.comments.push(comment);

      return comment;
    },

    deleteComment(parent, args, { db }, info) {
      const commentIndex = db.comments.findIndex((comment) => comment.id === args.id);

      if (commentIndex === -1) throw new Error("Comment not found");

      const deletedComments = db.comments.splice(commentIndex, 1);

      return deletedComments[0];
    },
  },

  Post: {
    author(parent, args, { db }, info) {
      return db.users.find((user) => user.id === parent.author);
    },

    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => comment.post === parent.id);
    },
  },

  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter((post) => post.author === parent.id);
    },

    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => comment.author === parent.id);
    },
  },

  Comment: {
    author(parent, args, { db }, info) {
      return db.users.find((user) => user.id === parent.author);
    },

    post(parent, args, { db }, info) {
      return db.posts.find((post) => post.id === parent.post);
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { db },
});

server.start(() => {
  console.log("The server has started");
});
