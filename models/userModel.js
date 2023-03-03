import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";

import { softDeletePlugin } from "soft-delete-plugin-mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(softDeletePlugin);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// fullname
userSchema.methods.setFullName = async function (
  enteredFirstName,
  enteredLastName
) {
  this.name = enteredFirstName + enteredLastName;
};

// update and replace new file

userSchema.methods.updatedAvatar = async function (enteredAvatar) {
  if (enteredAvatar) {
    if (fs.existsSync(this.avatar)) {
      fs.unlinkSync(this.avatar);
      this.avatar = enteredAvatar;
      console.log("The file exists");
    } else {
      console.log("The file does not exist");
      this.avatar = enteredAvatar;
    }
    // fs.unlinkSync(this.avatar);
  }
};

// remove and unlink file
userSchema.pre("remove", async function (next) {
  if (!this.isModified("avatar")) {
    next();
  }

  fs.unlinkSync(this.avatar);
});

const User = mongoose.model("User", userSchema);

export default User;
