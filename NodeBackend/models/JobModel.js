import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to the organization/user posting the job
    location: { type: String, required: true },
    skillsRequired: [String], // Array of required skills
    salaryRange: { type: String },
    postedAt: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
