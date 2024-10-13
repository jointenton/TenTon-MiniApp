const bountySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    reward: { type: String, required: true }, // Reward for completing the bounty
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to the user posting the bounty
    deadline: { type: Date, required: true },
    postedAt: { type: Date, default: Date.now }
});

const Bounty = mongoose.model('Bounty', bountySchema);

export default Bounty;
