import express from 'express';
import { registerOrganization, getAllOrganizations } from '../controllers/orgController.js';
const router = express.Router();

router.post('/signup', registerOrganization);
router.get('/', getAllOrganizations);

export default router;
