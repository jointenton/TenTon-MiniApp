import Event from '../models/eventModel.js';

const postEvent = async (req, res) => {
    const { name, description, location, date } = req.body;

    try {
        const event = new Event({
            name,
            description,
            location,
            date,
            organizer: req.user.id
        });

        const savedEvent = await event.save();
        res.status(201).json({ message: 'Event posted successfully', event: savedEvent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
