// File: aibproj/packages/backend/controllers/websitesController.js
import { db } from '../db.js';
import { createWordPressSite } from '../services/pleskService.js';

export async function createWebsite(req, res) {
  try {
    const { projectName, domain, userId } = req.body;

    if (!projectName || !domain || !userId) {
      return res.status(400).json({ message: 'Missing required fields: projectName, domain, userId' });
    }

    // Step 1: Call the external service
    const pleskResponse = await createWordPressSite(domain);

    if (!pleskResponse.success) {
      return res.status(500).json({ message: 'Plesk provisioning failed.', details: pleskResponse.message });
    }

    // Step 2: Save the successful result to our database
    // This transaction ensures both website and pleskInstance are created together
    const newWebsite = await db.website.create({
      data: {
        projectName: projectName,
        userId: userId,
        pleskInstance: {
          create: {
            domain: domain,
            pleskId: pleskResponse.data.pleskId,
          },
        },
      },
      include: {
        pleskInstance: true, // Include the nested object in the response
      },
    });

    res.status(201).json({ message: 'Website created and provisioned successfully!', data: newWebsite });
  } catch (error) {
    console.error('[Backend Controller Error]:', error.message);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
}