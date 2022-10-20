const { veryfy } = require("../Jwttockens/jwt.js");

const Aouth = (req, res, next)=>{
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(' ')[1];
        if(token){
            try {
                const decode = veryfy(token)
                req.user = decode
            } catch (error) {
                console.log("error in tocken")
            }
        }
    }
    next()
}
module.exports = {Aouth}