const Query = {
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
};

export default Query;
