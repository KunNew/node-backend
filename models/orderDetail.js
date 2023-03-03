import mongoose from "mongoose";

const orderDetailSchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Order",
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Menu",
  },
  menuName: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  amount: {
    type: Number,
    required: true,
    default: 0.0,
  },
});

const OrderDetail = mongoose.model("orderDetailSchema", orderDetailSchema);

export default OrderDetail;
