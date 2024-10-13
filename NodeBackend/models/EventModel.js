const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to the user or organization
    postedAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
