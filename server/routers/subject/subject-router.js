const express = require('express');
const {addSubject,getUserSubjects,updateTopicProgress,getStudyPlan} = require('../../controllers/subject/subject-controller');


const router = express.Router();

router.post('/AddExam',addSubject);
router.post('/getSubject',getUserSubjects);
router.put('/updateSubject',updateTopicProgress);
router.get('/getStudyPlan/:userId',getStudyPlan);


module.exports = router;