import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import fs from "fs";
import { validationResult } from "express-validator";
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const photo = req.file ? req.file.path : null;
    console.log(photo, "photo");
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.updatedAvatar(photo);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      avatar: updatedUser.avatar,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  console.log(user);
  if (user) {
    user.password = newPassword || user.password;
    const updatedPassword = await user.save();
    res.json({ message: "Success" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//crud - user

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, firstName, lastName } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const photo = req.file ? req.file.path : null;
  const createdUser = await User.create({
    firstName,
    lastName,
    name,
    email,
    password,
    avatar: photo,
  });

  res.status(201).json({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const { search, sortBy } = req.query;
  const queryObject = {};
  if (search) {
    queryObject["$or"] = [
      {
        name: { $regex: search, $options: "i" },
      },
      {
        email: { $regex: search, $options: "i" },
      },
    ];
  }

  let result = User.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.rowsPerPage) || 2;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const items = await result;
  const totalItems = await User.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalItems / limit);

  const headers = [
    {
      text: "No",
      sortable: false,
      value: "no",
    },
    {
      text: "Name",
      sortable: false,
      value: "name",
    },
    {
      text: "Email",
      sortable: false,
      value: "email",
    },
    {
      text: "Action",
      sortable: false,
      value: "actions",
    },
  ];

  res.json({ headers, items, totalItems, numOfPages });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // if (user.avatar) fs.unlinkSync(user.avatar);
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json({
      data: {
        ...user._doc,
        avatar: null,
      },
      show: {
        ...user._doc,
      },
      additional: { avatar: user.avatar },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const photo = req.file ? req.file.path : null;
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.password = req.body.password || user.password;
    user.updatedAvatar(photo);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/*** returns the number of softDeleted elements ***/
const softDeleteUser = asyncHandler(async (req, res, next) => {
  const { id, name } = req.params;
  const numberDeletedElements = await User.softDelete({
    _id: id,
  }).catch((err) => {
    res.status(400).json({ message: err.message });
  });
  res.status(201).send(numberDeletedElements);
});

/*** returns all deleted elements ***/
const findDeletedUser = asyncHandler(async (req, res, next) => {
  const { search, sortBy } = req.query;
  const queryObject = {
    isDeleted: true,
  };
  if (search) {
    queryObject["$or"] = [
      {
        name: { $regex: search, $options: "i" },
      },
      {
        email: { $regex: search, $options: "i" },
      },
    ];
  }

  let result = User.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.rowsPerPage) || 2;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const items = await result;
  const totalItems = await User.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalItems / limit);

  const headers = [
    {
      text: "No",
      sortable: false,
      value: "no",
    },
    {
      text: "Name",
      sortable: false,
      value: "name",
    },
    {
      text: "Email",
      sortable: false,
      value: "email",
    },
    {
      text: "Action",
      sortable: false,
      value: "actions",
    },
  ];

  res.json({ headers, items, totalItems, numOfPages });
});

/*** returns the number of restores elements ***/
const restoreDeletedUser = async (req, res, next) => {
  //get chicken id
  const { id } = req.params;
  const numberRestoredElements = await User.restore({ _id: id }).catch(
    (err) => {
      res.status(400).json({ message: err.message });
    }
  );
  res.status(201).send(numberRestoredElements);
};

export {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createUser,
  softDeleteUser,
  findDeletedUser,
  restoreDeletedUser,
  updateUserPassword,
};
