const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let DiscountSchema = new Schema(
  {
    code: {
      type: String
    },
    discount: {
      type: Number
    },
    discountType: {
      type: String
    },
    minimumSpend: {
      type: Number
    },
    isUnique: {
      type: Boolean
    },
    notes: {
      type: String
    }
  },
  { collection: "discounts" }
);

module.exports = mongoose.model("discounts", DiscountSchema);