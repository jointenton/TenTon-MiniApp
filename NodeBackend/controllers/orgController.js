import Organization from '../models/organizationModel.js';

// Register a new organization
const registerOrganization = async (req, res) => {
    const { name, description, location } = req.body;

    // Check if organization already exists
    const orgExists = await Organization.findOne({ name });
    if (orgExists) {
        return res.status(400).json({ message: 'Organization already exists' });
    }

    // Create organization
    const organization = new Organization({
        name,
        description,
        location
    });

    try {
        const savedOrg = await organization.save();
        res.status(201).json({ message: 'Organization registered successfully', organization: savedOrg });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all organizations
const getAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.json(organizations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { registerOrganization, getAllOrganizations };
