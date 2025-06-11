import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/news.css';

export default function News() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TheSportsDB Free API Key (1)
  const THESPORTSDB_API_KEY = '1';
  // PSL League ID
  const PSL_LEAGUE_ID = '4802';

  useEffect(() => {
    const fetchPSLMatches = async () => {
      try {
        setLoading(true);
        setError(null);

        // TheSportsDB API URL to fetch next 5 events for PSL
        const apiUrl = `https://www.thesportsdb.com/api/v1/json/${THESPORTSDB_API_KEY}/eventsnextleague.php?id=${PSL_LEAGUE_ID}`;
        // You could also use:
        // `https://www.thesportsdb.com/api/v1/json/${THESPORTSDB_API_KEY}/eventspastleague.php?id=${PSL_LEAGUE_ID}` for past results

        const response = await axios.get(apiUrl);

        // TheSportsDB response structure for events is usually `response.data.events`
        // It might return null if no events are found, so handle that.
        setMatches(response.data.events || []);

      } catch (err) {
        console.error("Error fetching PSL data:", err);
        setError("Failed to load PSL news. Please try again later.");
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPSLMatches();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return (
      <div className="news-page">
        <h1>📰 PSL News</h1>
        <p>Loading latest PSL match data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-page">
        <h1>📰 PSL News</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <p>Could not fetch PSL data. Check your internet connection or API settings.</p>
      </div>
    );
  }

  return (
    <div className="news-page">
      <h1>📰 Upcoming PSL Matches</h1>
      {matches.length === 0 ? (
        <p>No upcoming PSL matches available at the moment. Please check back later.</p>
      ) : (
        <div className="match-list">
          {matches.map((match) => (
            <div key={match.idEvent} className="match-item"> {/* Use idEvent as key */}
              <h3>{match.strHomeTeam} vs. {match.strAwayTeam}</h3>
              <p>League: {match.strLeague}</p>
              <p>Date: {match.dateEvent} {match.strTime} ({match.strEvent})</p>
              {/* You might want to add more details based on available fields from TheSportsDB */}
              {match.strVenue && <p>Venue: {match.strVenue}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
