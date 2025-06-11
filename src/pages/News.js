import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/news.css';

export default function News() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Your Sportmonks API token
  const SPORTMONKS_API_TOKEN = 'vSUnbStuUSXetWYLJzJxMqQA8dAdDrY8d1DiPRb1vlx6JxVt8Ug24q7xgtE1';
  // League ID for Superliga (Danish League)
  const TARGET_LEAGUE_ID = 271; // Superliga ID

  useEffect(() => {
    const fetchSportmonksData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get today's date and a date in the near future (e.g., 2 weeks from now)
        const today = new Date();
        const twoWeeksLater = new Date();
        twoWeeksLater.setDate(today.getDate() + 14);

        const formatDate = (date) => date.toISOString().split('T')[0]; // YYYY-MM-DD

        const startDate = formatDate(today);
        const endDate = formatDate(twoWeeksLater);

        // Sportmonks API URL to fetch fixtures within a date range
        // We'll filter by league ID in the frontend.
        const apiUrl = `https://api.sportmonks.com/v3/football/fixtures/between/${startDate}/${endDate}?api_token=${SPORTMONKS_API_TOKEN}&include=league,localTeam,visitorTeam`;

        const response = await axios.get(apiUrl);

        // Sportmonks response for fixtures is typically `response.data.data`
        const allFixtures = response.data.data || [];

        // Filter the fixtures to only include those from the target league (Superliga)
        const filteredMatches = allFixtures.filter(
          (fixture) => fixture.league_id === TARGET_LEAGUE_ID && fixture.status_id === 1 // status_id 1 is 'Played' or 'Finished' depending on period
        );
        // Note: You may need to adjust the status_id or filter by 'type' for "upcoming" events

        setMatches(filteredMatches);

      } catch (err) {
        console.error("Error fetching Sportmonks data:", err);
        if (err.response) {
          console.error("API Response Error:", err.response.data);
          setError(`API Error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
        } else if (err.request) {
          setError("Network Error: No response from API (CORS or network issue).");
        } else {
          setError("Request Setup Error: " + err.message);
        }
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSportmonksData();
  }, []);

  if (loading) {
    return (
      <div className="news-page">
        <h1>📰 Football News</h1>
        <p>Loading latest match data from Sportmonks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-page">
        <h1>📰 Football News</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <p>Could not fetch football data. Check console for details. (Sportmonks API)</p>
      </div>
    );
  }

  return (
    <div className="news-page">
      <h1>📰 Upcoming Superliga Matches</h1>
      {matches.length === 0 ? (
        <p>No upcoming Superliga matches available in the next 2 weeks. Please check back later or adjust date range.</p>
      ) : (
        <div className="match-list">
          {matches.map((match) => (
            <div key={match.id} className="match-item">
              <h3>{match.localTeam.name} vs. {match.visitorTeam.name}</h3>
              <p>League: {match.league.name}</p>
              <p>Date: {new Date(match.starting_at.date_time).toLocaleString()}</p>
              <p>Venue: {match.venue?.name || 'N/A'}</p>
              {/* You can add more details like score if available for finished matches based on status_id */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
