import React, { useEffect, useState } => 'react';
import axios from 'axios';
import '../styles/news.css'; // Make sure you have this CSS file if you want specific news styles

export default function News() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Your actual API token from football-data.org
  const FOOTBALL_DATA_API_TOKEN = '735f4252933a4793bae38856151a8ac8';

  useEffect(() => {
    const fetchFootballData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Original API URL for fetching upcoming matches
        const originalApiUrl = 'https://api.football-data.org/v4/matches?status=SCHEDULED&limit=5';

        // --- UPDATED: Use corsproxy.io to bypass CORS issues ---
        const apiUrl = `https://corsproxy.io/?${encodeURIComponent(originalApiUrl)}`;
        // ---------------------------------------------------

        const response = await axios.get(apiUrl, {
          headers: {
            'X-Auth-Token': FOOTBALL_DATA_API_TOKEN
          }
        });

        setMatches(response.data.matches || []);

      } catch (err) {
        console.error("Error fetching football data:", err);
        if (err.response) {
          console.error("API Response Error:", err.response.data);
          setError(`API Error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
        } else if (err.request) {
          setError("Network Error: No response from API (CORS or network issue)."); // Added more detail
        } else {
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
