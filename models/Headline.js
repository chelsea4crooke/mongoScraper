var mongoose = require("mongoose");
var Schema = mongoose.schema;
var headlineSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true,
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

var headline = mongoose.model("Headline", headlineSchema);
module.exports = headline;