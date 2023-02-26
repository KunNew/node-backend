import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

const getCategories = asyncHandler(async (req, res) => {
  const { search, sortBy } = req.query;
  const queryObject = {};
  if (search) {
    queryObject["$or"] = [
      {
        name: { $regex: search, $options: "i" },
      },
      {
        description: { $regex: search, $options: "i" },
      },
    ];
  }

  let result = Category.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.rowsPerPage) || 2;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const items = await result;
  const totalItems = await Category.countDocuments(queryObject);
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

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error(`Category not found`);
  }
});

const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
  });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  
  const category = await Category.findById(req.params.id);
  if (category) {
    category.name = name;
    category.description = description;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error(`Category not found`);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await category.remove();
    res.json({ message: `Category removed` });
  } else {
    res.status(404);
    throw new Error(`Category not found`);
  }
});

//another - used
const fetchCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchCategories,
};
