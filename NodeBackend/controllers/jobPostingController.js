import Job from '../models/jobModel.js';

const postJob = async (req, res) => {
    const { title, description, location, skillsRequired, salaryRange } = req.body;

    try {
        const job = new Job({
            title,
            description,
            location,
            skillsRequired,
            salaryRange,
            company: req.user.id
        });

        const savedJob = await job.save();
        res.status(201).json({ message: 'Job posted successfully', job: savedJob });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
