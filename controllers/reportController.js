import asyncHandler from "express-async-handler";
import Purchase from "../models/purchaseModel.js";

import dayjs from "dayjs";
import mongoose from "mongoose";

const getPurchaseReport = asyncHandler(async (req, res) => {
  const { supplierId } = req.body;
  const fromDate = dayjs(req.body.fromDate).endOf("days").toDate();
  const toDate = dayjs(req.body.toDate).endOf("days").toDate();
  const queryObject = {
    date: {
      $gte: fromDate,
      $lte: toDate,
    },
  };
  // if (supplierId) {
  //   queryObject.supplier = mongoose.Types.ObjectId(supplierId);
  // }
  
    if(supplierId) queryObject.supplier = mongoose.Types.ObjectId(supplierId);
    console.log(queryObject,'query');
  // console.log(queryObject);
  let result = await Purchase.aggregate([
    {
      $match: queryObject,
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
  ]);

  return res.json(result);
  // if (search) {
  //   queryObject["$or"] = [
  //     {
  //       name: { $regex: search, $options: "i" },
  //     },
  //     {
  //       description: { $regex: search, $options: "i" },
  //     },
  //   ];
  // }

  // let result = Category.find(queryObject);
});

const getPurchaseDetailBySupplierReport = asyncHandler(async (req, res) => {
  const { supplierId } = req.body;
  const fromDate = dayjs(req.body.fromDate).endOf("days").toDate();
  const toDate = dayjs(req.body.toDate).endOf("days").toDate();
  // console.log(toDate,'d');
  const queryObject = {
    date: {
      $gte: fromDate,
      $lte: toDate,
    },
  };
  if (supplierId) {
    queryObject.supplier = mongoose.Types.ObjectId(supplierId);
  }
  // console.log(queryObject);
  let result = await Purchase.aggregate([
    {
      $match: queryObject,
    },
    {
      $lookup: {
        from: "purchasedetails",
        localField: "_id",
        foreignField: "purchase",
        as: "detailDoc",
      },
    },
    {
      $unwind: {
        path: "$detailDoc",
        preserveNullAndEmptyArrays: true,
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
      $addFields: {
        dateStr: {
          $dateToString: {
            format: "%d/%m/%Y",
            date: "$date",
          },
        },
      },
    },
    {
      $group: {
        _id: "$supplier",
        supplier: {
          $last: "$supplierDoc.name",
        },
        details: {
          $push: {
            date: "$dateStr",
            name: "$detailDoc.menuName",
            qty: "$detailDoc.qty",
            cost: "$detailDoc.cost",
            price: "$detailDoc.price",
            amount: "$detailDoc.amount",
          },
        },
        totalAmount: {
          $sum: "$detailDoc.amount",
        },
      },
    },
  ]);

  return res.json(result);
  // if (search) {
  //   queryObject["$or"] = [
  //     {
  //       name: { $regex: search, $options: "i" },
  //     },
  //     {
  //       description: { $regex: search, $options: "i" },
  //     },
  //   ];
  // }

  // let result = Category.find(queryObject);
});

const getPurchaseSummaryBySupplierReport = asyncHandler(async (req, res) => {
  const { supplierId } = req.body;
  const fromDate = dayjs(req.body.fromDate).endOf("days").toDate();
  const toDate = dayjs(req.body.toDate).endOf("days").toDate();
  // console.log(toDate,'d');
  const queryObject = {
    date: {
      $gte: fromDate,
      $lte: toDate,
    },
  };
  if (supplierId) {
    queryObject.supplier = mongoose.Types.ObjectId(supplierId);
  }
  // console.log(queryObject);
  let result = await Purchase.aggregate([
    {
      $match: queryObject,
    },
    {
      $lookup: {
        from: "purchasedetails",
        localField: "_id",
        foreignField: "purchase",
        as: "detailDoc",
      },
    },
    {
      $unwind: {
        path: "$detailDoc",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: {
          supplierId: "$supplier",
          menuId: "$detailDoc.menu",
        },
        qty: {
          $sum: "$detailDoc.qty",
        },
        amount: {
          $sum: "$detailDoc.amount",
        },
      },
    },
    {
      $lookup: {
        from: "suppliers",
        localField: "_id.supplierId",
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
        from: "menus",
        localField: "_id.menuId",
        foreignField: "_id",
        as: "menuDoc",
      },
    },
    {
      $unwind: {
        path: "$menuDoc",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$supplierDoc._id",
        details: {
          $addToSet: {
            name: "$menuDoc.name",
            qty: "$qty",
            amount: "$amount",
          },
        },
        supplier: {
          $last: "$supplierDoc.name",
        },
        totalAmount: {
          $sum: "$amount",
        },
        totalQty: {
          $sum: "$qty",
        },
      },
    },
  ]);

  return res.json(result);
  // if (search) {
  //   queryObject["$or"] = [
  //     {
  //       name: { $regex: search, $options: "i" },
  //     },
  //     {
  //       description: { $regex: search, $options: "i" },
  //     },
  //   ];
  // }

  // let result = Category.find(queryObject);
});

export {
  getPurchaseReport,
  getPurchaseDetailBySupplierReport,
  getPurchaseSummaryBySupplierReport,
};
