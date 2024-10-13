import mongoose from 'mongoose';

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
        type: [String],  // Array of tags, e.g., ['Developer', 'Designer']
        required: true
    },
    location: {
        type: String,   // Could include lat/long coordinates for advanced geo-tracking
    },
    balance: {
        type: Number,
        default: 0      // Default balance for new users
    },
    referalId: {
        type: String,
        unique: true,   // Ensuring each referral ID is unique
    },
    about: {
        type: String,
    },
    socialLinks: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        linkedin: { type: String },
        telegram: { type: String },
        website: { type: String },
        portfolio: { type: String },
    },
    profileImage: {
        type: String,    // Path to the user's profile picture (stored on cloud or server)
    },
    appointment: {
        type: String,    // Information regarding any appointments (e.g., meetings)
    },
    skills: {
        type: [String],  // Array of skills the user possesses
        required: true
    },
    profession: {
        type: [String],  // Array of professions user is involved in, optional
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],  // Array of friend references (other users)
        ref: 'User'
    },
    appliedJobs: {
        type: [mongoose.Schema.Types.ObjectId],  // Array of job IDs the user has applied to
        ref: 'Job'
    },
}, {
    timestamps: true  // Automatically manage createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

export default User;
