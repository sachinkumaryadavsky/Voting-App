const express= require('express');
const router = express.Router();
const {jwtAuthMiddleware} = require('../jwt');
const candidateController = require("../controllers/candidateController");

router.post('/add-candidate',jwtAuthMiddleware,candidateController.Register);
router.get('/',candidateController.AllCandidates);
router.get('/vote/count',candidateController.VoteCount);
router.put('/vote/cast', jwtAuthMiddleware,candidateController.VoteCast);

module.exports = router;