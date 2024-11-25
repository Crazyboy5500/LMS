const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        username: {
            type: String,
            required: true,
            unique: true,
            match:
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        },
        password: { 
            type: String, 
            required: true 
        },
        userType: { 
            type: String,
            required: true 
        },
        phone: { 
            type: String, 
            required: true 
        },
        dob: { type: String },
        address: { type: String },
        uniqueId: { 
            type: String, 
            required: true 
        },
        borrowed: []
        , cart: [],
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
