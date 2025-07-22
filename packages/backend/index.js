// Import the Express library
import express from 'express';

// Initialize the Express application
const app = express();

// Define the port the server will run on.
// It's good practice to use an environment variable for the port.
const PORT = process.env.PORT || 3001;

// Define a basic "health check" route
// This will respond to GET requests at the /api/status URL
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Start the server and make it listen for incoming connections on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});