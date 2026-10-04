const Data = require('../models/Data');

// Create new data
const createData = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and message'
            });
        }

        const newData = new Data({ name, email, message });
        const savedData = await newData.save();

        res.status(201).json({
            success: true,
            message: 'Data saved successfully',
            data: savedData
        });
    } catch (error) {
        console.error('Error creating data:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all data
const getAllData = async (req, res) => {
    try {
        const allData = await Data.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: allData.length,
            data: allData
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get single data by ID
const getDataById = async (req, res) => {
    try {
        const data = await Data.findById(req.params.id);
        
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Data not found'
            });
        }

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update data
const updateData = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const updatedData = await Data.findByIdAndUpdate(
            req.params.id,
            { name, email, message },
            { new: true, runValidators: true }
        );

        if (!updatedData) {
            return res.status(404).json({
                success: false,
                message: 'Data not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Data updated successfully',
            data: updatedData
        });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete data
const deleteData = async (req, res) => {
    try {
        const deletedData = await Data.findByIdAndDelete(req.params.id);

        if (!deletedData) {
            return res.status(404).json({
                success: false,
                message: 'Data not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Data deleted successfully',
            data: deletedData
        });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Export all functions
module.exports = {
    createData,
    getAllData,
    getDataById,
    updateData,
    deleteData
};