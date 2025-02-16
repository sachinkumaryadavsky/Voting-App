const express= require('express');
const router = express.Router();
const {jwtAuthMiddleware} = require('../jwt');
const userController = require("../controllers/userController");
router.post('/login',userController.Login);
router.post('/register',userController.Register);
router.get('/protect',jwtAuthMiddleware,(req,res)=>{
     res.send("Welcome to protected route");
})
module.exports = router;