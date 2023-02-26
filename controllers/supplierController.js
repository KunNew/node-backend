import asyncHandler from "express-async-handler";
import Supplier from "../models/supplierModel.js";

const getSuppliers = asyncHandler(async (req, res) => {
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
      {
        address: { $regex: search, $options: "i" },
      },
      {
        telephone: { $regex: search, $options: "i" },
      },
    ];
  }

  let result = Supplier.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.rowsPerPage) || 2;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const items = await result;
  const totalItems = await Supplier.countDocuments(queryObject);
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
      text: "Address",
      sortable: false,
      value: "address",
    },
    {
      text: "Action",
      sortable: false,
      value: "actions",
    },
  ];

  res.json({ headers, items, totalItems, numOfPages });
});

const getSupplierById = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (supplier) {
    res.json(supplier);
  } else {
    res.status(404);
    throw new Error(`Supplier not found`);
  }
});

const createSupplier = asyncHandler(async (req, res) => {
  const { name, email, address, telephone, companyName } = req.body;
  const supplier = new Supplier({
    name,
    email,
    address,
    telephone,
    companyName,
  });
  const createdSupplier = await supplier.save();
  res.status(201).json(createdSupplier);
});

const updateSupplier = asyncHandler(async (req, res) => {
  const { name, email, address, telephone, companyName } = req.body;
  const supplier = await Supplier.findById(req.params.id);
  if (supplier) {
    supplier.name = name;
    supplier.email = email;
    supplier.address = address;
    supplier.telephone = telephone;
    supplier.companyName = companyName;
    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
  } else {
    res.status(404);
    throw new Error(`Supplier not found`);
  }
});

const deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (supplier) {
    await supplier.remove({});
    res.json({ message: `Supplier removed` });
  } else {
    res.status(404);
    throw new Error(`Supplier not found`);
  }
});


//another - used
const fetchSuppliers = asyncHandler(async (req, res) => {
    const suppliers = await Supplier.find({});
    res.json(suppliers);
  });

  
export {
  getSuppliers,
  createSupplier,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  fetchSuppliers
};
