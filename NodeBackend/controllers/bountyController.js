import Bounty from '../models/bountyModel.js';

const postBounty = async (req, res) => {
    const { title, description, reward, deadline } = req.body;

    try {
        const bounty = new Bounty({
            title,
            description,
            reward,
            deadline,
            postedBy: req.user.id
        });

        const savedBounty = await bounty.save();
        res.status(201).json({ message: 'Bounty posted successfully', bounty: savedBounty });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
