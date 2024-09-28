const jwt = require("jsonwebtoken")
const secrect = "12322354153241"


const craeteUser = (user)=>{
    try{
        return jwt.sign({
            name:user.name,
            email:user.email
        } , secrect)
    }
    catch(e)
    {
        console.log(e);
        return null
    }
}

const getUser = (token)=>{
    try{
        if(!token)
        {
            return null
        }
        return jwt.verify(token , secrect)
    }
    catch(e)
    {
        return null
    }
}

module.exports = {
    getUser , 
    craeteUser
}