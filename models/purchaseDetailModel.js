import mongoose from "mongoose";

const purchaseDetailSchema = mongoose.Schema({
  purchase: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Purchase",
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
  cost: {
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

  remain: {
    type: Number,
  },
});

const PurchaseDetail = mongoose.model("PurchaseDetail", purchaseDetailSchema);

export default PurchaseDetail;
