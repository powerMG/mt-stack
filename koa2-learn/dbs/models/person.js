const mongoose = require("mongoose");
let persionSchema = mongoose.Schema({
    name: String,
    age: Number
})
module.exports = mongoose.model("Person", persionSchema);