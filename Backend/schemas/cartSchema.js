const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
       email:String,
       cart:[Object]
    }
)

const Cart = mongoose.model("Cart",schema);

module.exports = Cart