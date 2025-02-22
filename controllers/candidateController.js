const User =require("../models/user");
const Candidate = require("../models/candidate");
const upload = ("../middleware/upload.js");
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

        
        if(!req.file){
          res.status(404).json({msg:"File not available"});
        }
        const photo = req.file.buffer;
      
        if(!photo){
          res.status(404).json({msg:"Photo not available"});
        }
         
          const {aadharnumber} = req.body;
          const data = req.body;
          const useraadharnumber = await Candidate.findOne({aadharnumber});
          if(useraadharnumber){
            return res.json({msg:"Username already exist",status:false});
          }
        
          
          const candidate= await Candidate.create({...data,photo});
        
          return res.json(data);
          
    }
    catch(err){
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports.AllCandidates = async(req,res) =>{
  try{
    const candidates =await  Candidate.find({},'name party -_id');
    if (!candidates.length) {
      return res.status(200).json({ message: "No candidates found", candidates: [] });
    }
    res.status(200).json(candidates);
  
  }
  catch(error){
     console.log(error);
     res.status(500).json({"err":"Internal Server Error"});
  }
}
module.exports.VoteCount = async (req,res) =>{
      try{
      const candidates = await Candidate.find().sort({voteCount :-1});
      const voteRecord = candidates.map((x)=>{
         return {
          name:x.name,
          party: x.party,
          VoteCount:x.voteCount
         }
        
         
      })
      res.status(200).json(voteRecord);
    }
    catch(error){
      console.log(error);
      res.status(500).json({msg : "Internal Server Error"});

    }

}

module.exports.VoteCast = async(req,res)=>{
  try{

    //USER(Admin) can not cast any vote to  candidate
        if (!req.user || !req.user.id) {
            return res.status(403).json({ message: "User not authenticated" });
        }
        const userId = req.user.id;
        const user = await User.findById(userId);
        if((await checkAdminRole(userId)))
        return res.status(403).json({message: 'user  have admin role, admin can not vote'});
        
        if(user.isVoted){
            return res.json({msg:"User already voted "});
        }
      
          
          const {candidateId} = req.params;
          
           if(!candidateId){
             return res.json({msg:"candidate id is required"});
           }
          const candidate  = await Candidate.findById(candidateId);
          if(!candidate){
            return res.status(404).json({msg:"Candiadate  does not exist"});
          }

          candidate.votes.push({
            user: userId,
            votedAt: Date.now()
          });
          user.isVoted = true;

          candidate.voteCount++;

         await candidate.save();
         await  user.save();
          
        
          return res.status(200).json({name:candidate.name , party:candidate.party});


  }
  catch(error){
    console.log(error);
    res.status(500).json({msg:"Internal Server Erorr"});
  }

}


module.exports.DeleteCandidate = async(req,res)=>{
  try{

    //USER(Admin) can not cast any vote to  candidate
        if (!req.user || !req.user.id) {
            return res.status(404).json({ message: "User not authenticated" });
        }
        const userId = req.user.id;
       
        if(!(await checkAdminRole(userId)))
        return res.status(403).json({ message: "User does not have admin role, only admins can delete candidates" });

          
          const {candidateId} = req.params;
           const deletedcandidate = await Candidate.findByIdAndDelete(candidateId);

         if(!deletedcandidate){
            return res.status(404).json({msg:"Candidate not found"});
         }
         return res.status(200).json({msg:`Candidate ${candidateId} is deleted successfully `});
        
      


  }
  catch(error){
    console.log(error);
    res.status(500).json({msg:"Internal Server Erorr"});
  }

}
