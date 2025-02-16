const jwt = require('jsonwebtoken');
const jwtAuthMiddleware = (req,res,next)=>{
  

    const authorization = req.headers.authorization;
    if(!authorization ) return res.json({msg:"token not found"});

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.json({msg:"Unauthorised"});
    try{
    const decoded = jwt.verify(token,process.env.JWT_KEY);
      req.user = decoded;
      next();
    }
    catch(err){
             console.log(err);
             return res.json({error:"Invalid Token "});
    }
    

}


const generateToken = (userData)=>{
      const token = jwt.sign(userData,process.env.JWT_KEY);
      return token;
}
module.exports = { jwtAuthMiddleware ,generateToken};