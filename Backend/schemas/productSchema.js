const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        id: Number,
        type:String,

        name: String,
        quantity: String,
        price: Number,
        discount: String,
        url:String,
        tag : [String],
        detail: String,
        brand: String,
        rate: Number,
        star:[Number],
        about: [String]

    }
)

const eachAndEveryProduct = mongoose.model("eachAndEveryProduct", productSchema)
module.exports = eachAndEveryProduct