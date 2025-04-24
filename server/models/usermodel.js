const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    authType: {
      type: String,
      enum: ["email", "google"],
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.authType === "email" && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
