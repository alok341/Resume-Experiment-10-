const express = require('express');
const router = express.Router();
const {
    createData,
    getAllData,
    getDataById,
    updateData,
    deleteData
} = require('../controllers/dataController');

// Make sure these routes are defined properly
router.post('/data', createData);
router.get('/data', getAllData);
router.get('/data/:id', getDataById);
router.put('/data/:id', updateData);
router.delete('/data/:id', deleteData);

// This is the important part - exporting the router
module.exports = router;  // ← Make sure this line exists