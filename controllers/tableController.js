import asyncHandler from "express-async-handler";
import Table from "../models/tableModel.js";

const getTables = asyncHandler(async (req, res) => {
  const { search, status } = req.query;

  const queryObject = {};
  if (search) {
    queryObject["$or"] = [
      {
        name: { $regex: search, $options: "i" },
      },
      {
        status: { $regex: search, $options: "i" },
      },
    ];
  }
  if (status) {
    queryObject.status = status;
  }

  let result = Table.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.rowsPerPage) || 2;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const items = await result;
  const totalItems = await Table.countDocuments(queryObject);
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
      text: "status",
      sortable: false,
      value: "status",
    },
    {
      text: "Action",
      sortable: false,
      value: "actions",
    },
  ];

  res.json({ headers, items, totalItems, numOfPages });
});

const getTableById = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id);
  if (table) {
    res.json(table);
  } else {
    res.status(404);
    throw new Error(`Table not found`);
  }
});

const createTable = asyncHandler(async (req, res) => {
  const table = new Table({
    name: req.body.name,
  });
  const createdTable = await table.save();
  res.status(201).json(createdTable);
});

const updateTable = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const table = await Table.findById(req.params.id);
  if (table) {
    table.name = name;
    const updatedTable = await table.save();
    res.json(updatedTable);
  } else {
    res.status(404);
    throw new Error(`Table not found`);
  }
});

const deleteTable = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id);
  if (table) {
    await table.remove();
    res.json({ message: `Table removed` });
  } else {
    res.status(404);
    throw new Error(`Table not found`);
  }
});

//another - used
const fetchTables = asyncHandler(async (req, res) => {
  const tables = await Table.find({});
  res.json(tables);
});

export {
  getTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
  fetchTables,
};
