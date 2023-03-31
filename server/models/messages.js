const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let MessageSchema = new Schema(
    {
        type: {
            type: String
        },
        backgroundUrl: {
            type: String
        },
        textColor: {
            type: String
        },
        textPosition: {
            type: String
        },
        textWeight: {
            type: String
        },
        content: {
            type: String
        },
        visibility: {
            type: Boolean
        }
    },
    { collection: "messages" }
);

module.exports = mongoose.model("messages", MessageSchema);