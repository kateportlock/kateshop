const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let OrderSchema = new Schema(
  {
    cart: {
      type: Array
    },
    cartValue: {
      type: Number
    },
    refunded: {
      type: Number
    },
    usedDiscounts: {
      type: Array
    },
    discountsVal: {
      type: Number
    },
    timestamp: {
      type: Number
    },
    orderNumber: {
      type: String
    },
    status: {
      type: String
    },
    user: {
      type: Object
    }
  },
  { collection: "orders" }
);

module.exports = mongoose.model("orders", OrderSchema);