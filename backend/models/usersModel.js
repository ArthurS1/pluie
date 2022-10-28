const mongoose = require("mongoose");

const UsersModel = mongoose.model(
    "pluie-db",
    {
        mail: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        tokenAuth: {
            type: String,
            required: true,
        },
        google: {
            type: Boolean,
            default: false,
        },
        widgets: {
            type: Array,
            default: [],
        },
    },
    "Users"
);

module.exports = { UsersModel };
