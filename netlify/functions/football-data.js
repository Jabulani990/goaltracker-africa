// netlify/functions/football-data.js
const axios = require('axios'); // Axios is needed for making HTTP requests in Node.js

exports.handler = async function(event, context) {
  // Get the API key securely from Netlify Environment Variables
  const API_TOKEN = process.env.FOOTBALL_DATA_API_KEY;

  // Extract query parameters from the request made by your frontend
  // e.g., ?status=SCHEDULED&limit=5
  const { status, limit, competition } = event.queryStringParameters;

  let apiUrl = `https://api.football-data.org/v4/matches`; // Base URL for football-data.org matches

  // Construct the full football-data.org API URL based on parameters from your frontend
  const queryParams = new URLSearchParams();
  if (status) queryParams.append('status', status);
  if (limit) queryParams.append('limit', limit);
  if (competition) queryParams.append('competitions', competition); // Note: 'competitions' for competition ID

  if (queryParams.toString()) {
      apiUrl += `?${queryParams.toString()}`;
  }

  try {
    // Make the request to football-data.org from the Netlify Function (server-side)
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Auth-Token': API_TOKEN // Securely use the API token from environment variables
      }
    });

    // Return the API's response to your frontend
    // Important: Add CORS headers so your frontend can access it
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins for simplicity (you can restrict to your Netlify domain later)
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify(response.data) // Send the data back as JSON
    };
  } catch (error) {
    console.error("Error in Netlify function:", error.response?.data || error.message);
    // Return an error response to the frontend
    return {
      statusCode: error.response?.status || 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({
        message: 'Failed to fetch data via proxy function from football-data.org',
        errorDetails: error.response?.data || error.message
      })
    };
  }
};
