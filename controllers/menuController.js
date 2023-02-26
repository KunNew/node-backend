import asyncHandler from "express-async-handler";
import Menu from "../models/MenuModel.js";
// import fs from "fs";
// import { validationResult } from "express-validator";

const createMenu = asyncHandler(async (req, res) => {
  const { name, price, description, categoryId, status, cost, unit } = req.body;

  const image = req.file ? req.file.path : null;
  const createdMenu = await Menu.create({
    name,
    price,
    description,
    category: categoryId,
    image,
    status,
    cost,
    unit,
    user: req.user._id,
  });

  res.status(201).json(createdMenu);
});

const getMenus = asyncHandler(async (req, res) => {
  const { search, sortBy } = req.query;
  const queryObject = {};
  if (search) {
    queryObject["$or"] = [
      {
        name: { $regex: search, $options: "i" },
      },
    ];
  }

  let result = Menu.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.rowsPerPage) || 2;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const items = await result;
  const totalItems = await Menu.countDocuments(queryObject);
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
      text: "Price",
      sortable: false,
      value: "price",
    },
    {
      text: "Description",
      sortable: false,
      value: "description",
    },
    {
      text: "Action",
      sortable: false,
      value: "actions",
    },
  ];

  res.json({ headers, items, totalItems, numOfPages });
});

const deleteMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);

  if (menu) {
    await menu.remove();
    res.json({ message: "Menu removed" });
  } else {
    res.status(404);
    throw new Error("Menu not found");
  }
});

const getMenuById = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id).populate("category");

  if (menu) {
    res.json({
      data: {
        ...menu._doc,
        image: null,
      },
      show: {
        ...menu._doc,
      },
      additional: { avatar: menu.image },
    });
  } else {
    res.status(404);
    throw new Error("Menu not found");
  }
});

const updateMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  const image = req.file ? req.file.path : null;
  if (menu) {
    menu.name = req.body.name || menu.name;
    menu.price = req.body.price || menu.price;
    menu.cost = req.body.cost || menu.cost;
    menu.unit = req.body.unit || menu.unit;
    menu.description = req.body.description || menu.description;
    menu.category = req.body.categoryId || menu.categoryId;
    menu.status = req.body.status || menu.status;
    menu.updatedAvatar(image);

    const updatedMenu = await menu.save();

    res.json(updatedMenu);
    // res.json({
    //   _id: updatedUser._id,
    //   name: updatedUser.name,
    //   email: updatedUser.email,
    //   isAdmin: updatedUser.isAdmin,
    // });
  } else {
    res.status(404);
    throw new Error("Menu not found");
  }
});

//another - used
const fetchMenus = asyncHandler(async (req, res) => {
  let queryObject = { status: 1 };
  const menus = await Menu.find(queryObject);
  res.json(menus);
});

export {
  createMenu,
  getMenus,
  getMenuById,
  deleteMenu,
  updateMenu,
  fetchMenus,
};
