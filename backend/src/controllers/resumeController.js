const Resume = require('../models/Resume');

// Create new resume entry
const createResume = async (req, res) => {
    try {
        const { name, contact, email, dob, qualification, skills, about } = req.body;
        
        if (!name || !contact || !email || !dob || !qualification || !skills || !about) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const newResume = new Resume({
            name,
            contact,
            email,
            dob,
            qualification,
            skills,
            about
        });

        const savedResume = await newResume.save();

        res.status(201).json({
            success: true,
            message: 'Resume data saved successfully',
            data: savedResume
        });
    } catch (error) {
        console.error('Error creating resume:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all resume entries
const getAllResumes = async (req, res) => {
    try {
        const allResumes = await Resume.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: allResumes.length,
            data: allResumes
        });
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get single resume by ID
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update resume
const updateResume = async (req, res) => {
    try {
        const { name, contact, email, dob, qualification, skills, about } = req.body;
        
        const updatedResume = await Resume.findByIdAndUpdate(
            req.params.id,
            { name, contact, email, dob, qualification, skills, about },
            { new: true, runValidators: true }
        );

        if (!updatedResume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Resume updated successfully',
            data: updatedResume
        });
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Delete resume
const deleteResume = async (req, res) => {
    try {
        const deletedResume = await Resume.findByIdAndDelete(req.params.id);

        if (!deletedResume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Resume deleted successfully',
            data: deletedResume
        });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Export all functions
module.exports = {
    createResume,
    getAllResumes,
    getResumeById,
    updateResume,
    deleteResume
};