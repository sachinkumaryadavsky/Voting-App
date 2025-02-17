const express= require('express');
const router = express.Router();
const {jwtAuthMiddleware} = require('../jwt');
const candidateController = require("../controllers/candidateController");

router.post('/add-candidate',jwtAuthMiddleware,candidateController.Register);
router.get('/',candidateController.AllCandidates);
router.get('/vote/count',candidateController.VoteCount);

module.exports = router;