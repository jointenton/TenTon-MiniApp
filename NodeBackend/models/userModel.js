const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    gender: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        // required: true
    },
    balance: {
        type: Number,
        // required: true
    },
    referalId: {
        type: String,
        // required: true
    },
    about: {
        type: String,
        // required: true
    },
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    telegram: {
        type: String,
    },
    website: {
        type: String,
    },
    portfolio: {
        type: String,
    },
    profileImage: {
        type: String,
        // required: true,
    },
    appointment: {
        type: String,
    },
    skills: {
        type: [String],
        required: true
    },
    profession: {
        type: [String],
        // required: true
    },
    friends: {
        type: [String],
        // required: true
    },
    appliedJobs: {
        type: [String],
        // required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
