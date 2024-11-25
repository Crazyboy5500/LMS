const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
    {
        BibNum: { type: String, required: true },
        Title: { type: String, required: true },
        Author: { type: String, required: true },
        ISBN: { type: String, required: true },
        Publisher: { type: String, required: true },
        Genre: { type: String, required: true },
        ItemCount: { type: String, required: true },
    },
    { timestamps: true }
);

bookSchema.index({ Title: "text" });
module.exports = mongoose.model("book", bookSchema);
