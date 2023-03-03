import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "super",
    lastName: "admin",
    name: "Admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("admin123", 10),
    isAdmin: true,
    isDeleted: false,
    deletedAt: null,
  },
  {
    firstName: "super",
    lastName: "user",
    name: "User",
    email: "user@email.com",
    password: bcrypt.hashSync("user123", 10),
    isDeleted: false,
    deletedAt: null,
  },
];

export default users;
