import mongoose from "mongoose";
const saleDetailModel = mongoose.Schema(
  {
    saleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Sale",
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
    menuPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    menuQty: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["noConfirm"], // confirm or noconfirm
    },
  },
  {
    timestamps: true,
  }
);
const SaleDetail = mongoose.model("SaleDetail", saleDetailModel);

export default SaleDetail;
