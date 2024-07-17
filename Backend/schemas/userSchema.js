const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
      
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        address:{
            type:[Object],
        
        }

    }
)

const UserDetail = mongoose.model("UserDetail",schema)

module.exports = UserDetail