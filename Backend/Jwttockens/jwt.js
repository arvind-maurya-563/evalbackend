const jwt = require('jsonwebtoken')
require('dotenv').config()
const signin = (payload)=>{
    const key = 'fhbukdbfujdwq459fdf99663gcvh9w'
     const token = jwt.sign(payload,key,{
        expiresIn:'7d'
     })
     return token;
}
const veryfy = (token)=>{
    try {
        const key = 'fhbukdbfujdwq459fdf99663gcvh9w'
       const data = jwt.verify(token,key)
    //    console.log(data)
       return data
    } catch (error) {
        throw new Error('somthing error in tocken or tocken is expired')
    }
}
const decode = (token)=>{
     return jwt.decode(token)
}
module.exports = {
    signin,
    veryfy,
    decode
}