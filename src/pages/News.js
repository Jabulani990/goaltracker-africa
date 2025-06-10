import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/news.css'; // Make sure you have this CSS file if you want specific news styles

export default function News() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- REPLACE 'YOUR_FOOTBALL_DATA_API_TOKEN' with your actual token ---
  const FOOTBALL_DATA_API_TOKEN = '735f4252933a4793bae38856151a8ac8';
  // ------------------------------------------------------------------

  useEffect(() => {
    const fetchFootballData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Example API URL: Fetching all upcoming matches (LIMIT 5 for simplicity)
        // You might need to adjust the URL based on what you want to show as "news"
        // e.g., /v4/matches (for all matches), /v4/competitions/PL/matches (for Premier League matches)
        // Check football-data.org API documentation for available endpoints.
        const apiUrl = 'https://api.football-data.org/v4/matches?status=SCHEDULED&limit=5';
        // const apiUrl = 'https://api.football-data.org/v4/matches?status=FINISHED&limit=5'; // For finished matches

        const response = await axios.get(apiUrl, {
          headers: {
            'X-Auth-Token': FOOTBALL_DATA_API_TOKEN
          }
        });

        // Assuming the API returns an 'matches' array
        setMatches(response.data.matches || []);

      } catch (err) {
        console.error("Error fetching football data:", err);
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("API Response Error:", err.response.data);
          setError(`API Error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
        } else if (err.request) {
          // The request was made but no response was received
          setError("Network Error: No response from API.");
        } else {
          // Something else happened in setting up the request that triggered an Error
          setError("Request Setup Error: " + err.message);
        }
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
        <p>Please ensure your API token is correct and check the browser console for details.</p>
      </div>
    );
  }

  return (
    <div className="news-page">
      <h1>📰 Upcoming Matches</h1> {/* Changed heading to reflect content */}
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
              {/* You can add more details like score if status is FINISHED */}
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
