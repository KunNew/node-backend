import mongoose from "mongoose";

const tableSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["available", "unavilable"],
      default: "available", // available & unavilable
    },
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;
