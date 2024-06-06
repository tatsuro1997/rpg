const { v4: uuidv4 } = require("uuid");

const users = [
  {
    id: uuidv4(),
    name: "User1",
    email: "user1@example.com",
    birthday: "1999-11-11",
    password: "123456",
  },
  {
    id: uuidv4(),
    name: "User2",
    email: "user2@example.com",
    birthday: "2020-01-01",
    password: "123456",
  },
];

const experiences = [
  {
    userId: users[0].id,
    title: "title1",
    point: 65,
    date: "2023-11-07",
  },
  {
    userId: users[0].id,
    title: "title2",
    point: 16,
    date: "2023-11-08",
  },
  {
    userId: users[0].id,
    title: "title3",
    point: 50,
    date: "2023-11-09",
  },
  {
    userId: users[0].id,
    title: "title4",
    point: 90,
    date: "2023-11-10",
  },
];

module.exports = {
  users,
  experiences,
};
