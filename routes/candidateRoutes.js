const express= require('express');
const router = express.Router();
const {jwtAuthMiddleware} = require('../jwt');
const candidateController = require("../controllers/candidateController");
//router.post('/login',userController.Login);
router.post('/add-candidate',jwtAuthMiddleware,candidateController.Register);
// router.get('/protect',jwtAuthMiddleware,(req,res)=>{
//      res.send("Welcome to protected route");
// })
module.exports = router;