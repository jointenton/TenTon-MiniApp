import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
    name: {
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
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    about: {
        type: String,
        required: true
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
    },
    appointment: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Organization =  mongoose.model('Organization', organizationSchema);
export default Organization;
