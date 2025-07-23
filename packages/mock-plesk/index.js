// File: aibproj/packages/mock-plesk/index.js
import express from 'express';

const app = express();
const PORT = 3002; // Note: Different port from the main backend

app.use(express.json());

// This is the fake endpoint our main backend will call
app.post('/api/provision/wordpress', (req, res) => {
  const { domain } = req.body;
  console.log(`[Mock Plesk]: Received request to provision WordPress for: ${domain}`);

  if (!domain) {
    return res.status(400).json({ success: false, message: 'Domain name is required.' });
  }

  // Simulate a delay for a realistic response time
  setTimeout(() => {
    const fakePleskId = `wp_${Math.floor(1000 + Math.random() * 9000)}`;
    console.log(`[Mock Plesk]: Successfully provisioned WordPress for ${domain} with ID ${fakePleskId}`);
    
    // Send back a successful response with some fake data
    res.status(200).json({
      success: true,
      message: 'WordPress instance created successfully.',
      data: {
        pleskId: fakePleskId,
        siteUrl: `http://${domain}`,
      },
    });
  }, 1500); // 1.5 second delay
});

app.listen(PORT, () => {
  console.log(`[Mock Plesk Server] is running on http://localhost:${PORT}`);
});