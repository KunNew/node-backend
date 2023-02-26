import mongoose from "mongoose";
import fs from "fs";
const menuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    cost: {
      type: Number,
      required: true,
      default: 0,
    },
    qty: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      required: true,
      default: null,
    },
    image: {
      type: String,
      default: "no-photo.jpg",
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// update and replace new file

menuSchema.methods.updatedAvatar = async function (enteredAvatar) {
  if (enteredAvatar) {
    if (fs.existsSync(this.image)) {
      fs.unlinkSync(this.image);
      this.image = enteredAvatar;
      console.log("The file exists");
    } else {
      console.log("The file does not exist");
      this.image = enteredAvatar;
    }
  }
};

// remove and unlink file
menuSchema.pre("remove", async function (next) {
  if (!this.isModified("image")) {
    next();
  }

  fs.unlinkSync(this.image);
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
