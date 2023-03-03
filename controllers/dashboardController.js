import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import Menu from "../models/MenuModel.js";

const getTotalCategories = asyncHandler(async (req, res) => {
  const categoreis = await Category.find({}).count();

  res.json(categoreis);
});

const getTotalMenus = asyncHandler(async (req, res) => {
  const menus = await Menu.find({}).count();

  res.json(menus);
});

export { getTotalCategories, getTotalMenus };
