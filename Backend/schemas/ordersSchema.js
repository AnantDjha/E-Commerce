const mongoose = require("mongoose")

const schema = mongoose.Schema({
    email:String,
    orders:[Object]
})

const orders = mongoose.model("orders",schema)

module.exports = orders