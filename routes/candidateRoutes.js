const express= require('express');
const router = express.Router();
const {jwtAuthMiddleware} = require('../jwt');
const candidateController = require("../controllers/candidateController");
const upload = require("../middleware/upload");

router.post('/add-candidate',jwtAuthMiddleware,upload.single('photo'),candidateController.Register);
router.get('/',candidateController.AllCandidates);
router.get('/vote/count',candidateController.VoteCount);
router.put('/vote/cast/:candidateId', jwtAuthMiddleware,candidateController.VoteCast);
router.delete('/delete-candidate/:candidateId',jwtAuthMiddleware,candidateController.DeleteCandidate);

module.exports = router;