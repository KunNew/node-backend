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
const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Table",
    },
    tableName: {
      type: String,
      required: true,
    },
    totalReceived: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    change: {
      type: Number,
      required: true,
      default: 0,
    },
    paymentType: {
      type: String,
      required: true,
      enum: ["cash", "credit"], // cash or credit or qrcode
      default: "cash",
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["unpaid", "ordered", "paid"],
      default: "unpaid",
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
const Order = mongoose.model("Order", orderSchema);

export default Order;
