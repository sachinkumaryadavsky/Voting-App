const User =require("../models/user");
const bcrypt = require("bcrypt");
const {jwtAuthMiddleware , generateToken} = require('../jwt');
module.exports.Register = async(req,res)=>{
    try{
          const {aadharnumber,password,role, name,age,isVoted} = req.body;
          const useraadharnumber = await User.findOne({aadharnumber});
          if(useraadharnumber){
            return res.json({msg:"Aadhar alrenumberady exist",status:false});
          }
        
          const hashedPassword = await bcrypt.hash(password,10);
          const user= await User.create({aadharnumber,password:hashedPassword , role ,  name ,age,isVoted});
           
          delete user.password;
          const id = user._id;
          const token = generateToken({id,aadharnumber,name});
          return res.json(token);
          
    }
    catch(err){
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" })
    }
}
module.exports.Login=async(req,res)=>{
            try{
                       const {aadharnumber,password} =req.body;
                       const user = await User.findOne({aadharnumber});
                       if(!user){
                         return res.json({msg:"Username or password  is incorect",status:false});
                       }
                       
                       const passwordCheck = await bcrypt.compare(password,user.password);
                       if(!passwordCheck){
                         return  res.json({msg:"Username or password  is incorect",status:false});
                       }
                       delete user.password;
                       const name = user.name;
                        const token = generateToken({aadharnumber , name});
                        return res.json({token:token});
                    
            }
            catch(error){
               console.log(error);
                 return res.json({error:"Server error",status:false});
            }
}
