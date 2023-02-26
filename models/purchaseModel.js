import mongoose from "mongoose";

// const menuSchema = new mongoose.Schema({
//   menu: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "Menu",
//   },
//   price: {
//     type: Date,
//     required: true,
//   },
//   qty: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   cost: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   price: {
//     type: Number,
//     required: true,
//     default: 0,
//   },

//   remain: {
//     type: Number,
//   },
// });
const purchaseSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Supplier",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    // items: {
    //   type: [menuSchema],
    //   default: [],
    // },
    // menu: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "Menu",
    // },
    // price: {
    //   type: Date,
    //   required: true,
    // },
    // qty: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
    // cost: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
    // price: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },

    // remain: {
    //   type: Number,
    // },
  },
  {
    timestamps: true,
  }
);
const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
