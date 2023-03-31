const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ProductSchema = new Schema(
  {
    img: {
      type: String
    },
    title: {
      type: String
    },
    desc: {
      type: String
    },
    price: {
      type: Number
    },
    totalStock: {
      type: Number
    },
    visibility: {
      type: Boolean
    },
    index: {
      type: Number
    }
  },
  { collection: "products" }
);

module.exports = mongoose.model("products", ProductSchema);
