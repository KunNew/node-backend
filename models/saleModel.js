import mongoose from "mongoose";
const saleSchema = mongoose.Schema(
  {
    table: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Table",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalReceived: {
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
      enum: ["Cash", "Credit Card"],
    },
    saleStatus: {
      type: String,
      required: true,
      default: "unpaid", // paid and unpaid
    },
  },
  {
    timestamps: true,
  }
);
const Sale = mongoose.model("Sale", saleSchema);

export default Sale;
