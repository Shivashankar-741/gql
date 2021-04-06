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
  { id: "21", text: "javascript", author: "1", post: "4" },
  { id: "22", text: "Node", author: "2", post: "5" },
  { id: "23", text: "GraphQl", author: "2", post: "5" },
  { id: "24", text: "Apollo", author: "3", post: "6" },
];

const db = { users, posts, comments };

export default db;
