import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/news.css';

export default function News() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // No API token needed here anymore, as the Netlify function handles it securely
  // REMOVE OR COMMENT OUT THIS LINE if it's still there
  // const FOOTBALL_DATA_API_TOKEN = '735f4252933a4793bae38856151a8ac8'; 

  useEffect(() => {
    const fetchFootballData = async () => {
      try {
        setLoading(true);
        setError(null);

        // --- UPDATED: Call your Netlify function instead of the direct API ---
        // The path to your function will be /.netlify/functions/football-data
        // You can still pass parameters like status, limit, etc., as query strings to your function.
        // Your Netlify function will then forward these to football-data.org
        const netlifyFunctionUrl = `/.netlify/functions/football-data?status=SCHEDULED&limit=5`;
        // If you later want specific competitions (e.g., PSL if available on your plan),
        // you'd pass the competition ID here:
        // `/.netlify/functions/football-data?status=SCHEDULED&limit=5&competition=2001` // Example Champions League
        // ------------------------------------------------------------------

        const response = await axios.get(netlifyFunctionUrl);

        // The response from your Netlify function will be the raw data from football-data.org
        setMatches(response.data.matches || []); // Access 'matches' property of the response data

      } catch (err) {
        console.error("Error fetching football data via Netlify function:", err);
        // Enhanced error message for debugging Netlify function issues
        let errorMessage = "Failed to load news. Please try again later.";
        if (err.response) {
            console.error("Netlify Function Response Error:", err.response.data);
            errorMessage = `Error from API Proxy: ${err.response.status} - ${err.response.data.message || JSON.stringify(err.response.data) || 'Unknown error'}`;
        } else if (err.request) {
            errorMessage = "Network Error: No response from proxy function.";
        } else {
            errorMessage = "Request Setup Error: " + err.message;
        }
        setError(errorMessage);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFootballData();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return (
      <div className="news-page">
        <h1>📰 Football News</h1>
        <p>Loading latest match data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-page">
        <h1>📰 Football News</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <p>Check browser console for detailed error, or verify Netlify function deployment and API key.</p>
      </div>
    );
  }

  return (
    <div className="news-page">
      <h1>📰 Upcoming Matches</h1>
      {matches.length === 0 ? (
        <p>No upcoming matches available at the moment. Please check back later or adjust your API query.</p>
      ) : (
        <div className="match-list">
          {matches.map((match) => (
            <div key={match.id} className="match-item">
              <h3>{match.homeTeam.name} vs. {match.awayTeam.name}</h3>
              <p>Competition: {match.competition.name}</p>
              <p>Date: {new Date(match.utcDate).toLocaleString()}</p>
              <p>Status: {match.status}</p>
              {match.score && match.status === 'FINISHED' && (
                <p>Score: {match.score.fullTime.home} - {match.score.fullTime.away}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
