import asyncHandler from "express-async-handler";
import Purchase from "../models/purchaseModel.js";
import PurchaseDetail from "../models/purchaseDetailModel.js";
import Menu from "../models/MenuModel.js";
import mongoose from "mongoose";

const getPurchases = asyncHandler(async (req, res) => {
  const { search, sortBy } = req.query;
  const queryObject = {};
  if (search) {
    queryObject["$or"] = [
      {
        'supplierDoc.name': { $regex: search, $options: "i" },
      },
      // {
      //   description: { $regex: search, $options: "i" },
      // },
    ];
  }

  // let result = Purchase.find(queryObject).populate("supplier", ["name"]);

  let result = Purchase.aggregate([
    {
      $lookup: {
        from: "suppliers",
        localField: "supplier",
        foreignField: "_id",
        as: "supplierDoc",
      },
    },
    {
      $unwind: {
        path: "$supplierDoc",
      },
    },
    {
      $match: queryObject,
    },
  ]);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.rowsPerPage) || 2;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const items = await result;
  const totalItems = await Purchase.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalItems / limit);

  const headers = [
    {
      text: "No",
      sortable: false,
      value: "no",
    },
    {
      text: "Date",
      sortable: false,
      value: "date",
    },

    {
      text: "Supplier",
      sortable: false,
      value: "supplierDoc.name",
    },

    {
      text: "Total",
      sortable: false,
      value: "total",
    },
    {
      text: "Action",
      sortable: false,
      value: "actions",
    },
  ];

  res.json({ headers, items, totalItems, numOfPages });
});

const createPurchase = asyncHandler(async (req, res) => {
  const { supplierId, date, items, total } = req.body;
  //   let doc = [];
  //   items.forEach((it) => {
  //     doc.push({
  //       menu: it._id,
  //       cost: it.cost,
  //       price: it.price,
  //       qty: it.qty,
  //       amount: it.qty * it.price,
  //     });
  //   });
  const purchase = new Purchase({
    supplier: supplierId,
    date,
    total,
    user: req.user._id,
  });

  const createdPurchase = await purchase.save();
  if (createdPurchase) {
    // await PurchaseDetail.insertMany(
    //   doc.map((it) => {
    //     let purchase = createdPurchase._id;
    //     return { ...it, purchase };
    //   })
    // );
    items.forEach(async (it) => {
      const purchaseDetail = new PurchaseDetail({
        purchase: createdPurchase._id,
        menu: it._id,
        cost: it.cost,
        price: it.price,
        qty: it.qty,
        menuName: it.name,
        amount: it.qty * it.price,
      });
      const createdPurchaseDetail = await purchaseDetail.save();
      if (createdPurchaseDetail) {
        const menu = await Menu.findById(createdPurchaseDetail.menu);
        menu.qty += createdPurchaseDetail.qty;
        await menu.save();
      }
    });
  }
  res.status(201).json(createdPurchase);
});

const getPurchaseById = asyncHandler(async (req, res) => {
  // console.log(req.params.id);
  // const purchase = await Purchase.findById(req.params.id);
  const purchase = await Purchase.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "suppliers",
        localField: "supplier",
        foreignField: "_id",
        as: "supplierDoc",
      },
    },
    {
      $unwind: {
        path: "$supplierDoc",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "purchasedetails",
        localField: "_id",
        foreignField: "purchase",
        as: "purchaseDetailDoc",
      },
    },
  ]);
  if (purchase) {
    res.json(purchase);
  } else {
    res.status(404);
    throw new Error(`Purchase not found`);
  }
});

const invoiceNumber = asyncHandler(async (req, res) => {
  const invoiceNumber = (await Purchase.find({}).count({})) + 1;
  res.json(invoiceNumber);
});

export { getPurchases, createPurchase, invoiceNumber, getPurchaseById };
