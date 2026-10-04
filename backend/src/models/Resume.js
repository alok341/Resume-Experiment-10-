const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    dob: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true,
        trim: true
    },
    skills: {
        type: String,
        required: true,
        trim: true
    },
    about: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Make sure this is exporting correctly
const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;