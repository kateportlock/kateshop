const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String
    },
    role: {
      type: String
    },
    orderHistory: {
      type: Array
    }
  },
  { collection: "users" }
);

module.exports = mongoose.model("users", UserSchema);
