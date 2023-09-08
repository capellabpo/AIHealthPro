const axios = require('axios');
const cors = require('cors'); // Import the cors middleware

const corsOptions = {
  origin: 'http://localhost:3300', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
  credentials: true, // Allow cookies to be sent with the request
};

// Use the cors middleware with the specified options
const corsMiddleware = cors(corsOptions);

export default async function (req, res, next) {
  // Apply the cors middleware to your route
  corsMiddleware(req, res, () => {
    // Continue with your proxy logic
    // ...
  });
}
