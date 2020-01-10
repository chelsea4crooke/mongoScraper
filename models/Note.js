var mongoose = require("mongoose");
var schema = mongoose.schema;
var noteSchema = new schema({
    headline: {
        type: schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteText: String
});

var note = mongoose.model("Note", noteSchema);
module.exports = note;