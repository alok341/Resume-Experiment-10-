const express = require('express');
const router = express.Router();
const {
    createResume,
    getAllResumes,
    getResumeById,
    updateResume,
    deleteResume
} = require('../controllers/resumeController');

// Make sure these routes are defined properly
router.post('/resume', createResume);
router.get('/resume', getAllResumes);
router.get('/resume/:id', getResumeById);
router.put('/resume/:id', updateResume);
router.delete('/resume/:id', deleteResume);

// This is the important part - exporting the router
module.exports = router;  // ← Make sure this line exists