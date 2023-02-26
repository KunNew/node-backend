import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("admin123", 10),
    isAdmin: true,
    isDeleted: false,
    deletedAt: null,
  },
  {
    name: "User",
    email: "user@email.com",
    password: bcrypt.hashSync("user123", 10),
    isDeleted: false,
    deletedAt: null,
  },
  {
    name: "Seller",
    email: "seller@email.com",
    password: bcrypt.hashSync("user123", 10),
    isDeleted: false,
    deletedAt: null,
  },
  {
    name: "Staff",
    email: "staff@email.com",
    password: bcrypt.hashSync("staff123", 10),
    isDeleted: false,
    deletedAt: null,
  },
  {
    name: "IT",
    email: "it@email.com",
    password: bcrypt.hashSync("it123", 10),
    isDeleted: false,
    deletedAt: null,
  },
  {
    name: "cook",
    email: "cook@email.com",
    password: bcrypt.hashSync("cook123", 10),
    isDeleted: false,
    deletedAt: null,
  },
];

export default users;
