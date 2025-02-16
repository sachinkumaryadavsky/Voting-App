const User =require("../models/user");
const Candidate = require("../models/candidate");
const bcrypt = require("bcrypt");
const {jwtAuthMiddleware , generateToken} = require('../jwt');
const checkAdminRole = async(userId)=>{
       const user = await User.findById(userId);
       if(user.role ==='admin') return true;
       return false;
}
module.exports.Register = async(req,res)=>{
    try{
      
        
       // console.log("Request User:", req.user); // Debugging
       //USER(Admin) can add a new candidate
        if (!req.user || !req.user.id) {
            return res.status(403).json({ message: "User not authenticated" });
        }
        if(!(await checkAdminRole(req.user.id)))
        return res.status(403).json({message: 'user does not have admin role'});
         
          const {aadharnumber} = req.body;
          const data = req.body;
          const useraadharnumber = await Candidate.findOne({aadharnumber});
          if(useraadharnumber){
            return res.json({msg:"Username already exist",status:false});
          }
        
          
          const user= await Candidate.create(data);
        
          return res.json(data);
          
    }
    catch(err){
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" })
    }
}


