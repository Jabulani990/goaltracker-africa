import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LiveScores from '../components/LiveScores'; // Keep your existing LiveScores
import '../styles/home.css'; // Ensure this file is correctly created/updated
import newsIcon from '../assets/news.png'; // Placeholder for an icon - you'll need to add assets
import trophyIcon from '../assets/trophy.png'; // Placeholder for an icon

export default function Home() {
  const [featuredMatches, setFeaturedMatches] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState(null);

  // --- Fetch Featured Matches via Netlify Function ---
  useEffect(() => {
    const fetchFeaturedMatches = async () => {
      try {
        setLoadingFeatured(true);
        setErrorFeatured(null);

        // Call your Netlify function for a limited set of matches
        // You might fetch different matches here than in News.js, e.g., only major league games
        // For simplicity, let's use the same upcoming matches query as News.js
        const netlifyFunctionUrl = `/.netlify/functions/football-data?status=SCHEDULED&limit=4`; // Fetch 4 matches

        const response = await axios.get(netlifyFunctionUrl);
        setFeaturedMatches(response.data.matches || []);

      } catch (err) {
        console.error("Error fetching featured matches:", err);
        setErrorFeatured("Could not load featured matches.");
        setFeaturedMatches([]);
      } finally {
        setLoadingFeatured(false);
      }
    };

    fetchFeaturedMatches();
  }, []); // Run once on component mount

  return (
    <div className="home-container">

      {/* Hero Section: Eye-catching background, bold statement */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>GoalTracker Africa</h1>
          <p className="tagline">Your Ultimate Hub for South African Football.</p>
          <div className="hero-actions">
            <a href="/#/news" className="btn-hero btn-hero-primary">Explore Matches</a>
            <a href="/#/teams" className="btn-hero btn-hero-secondary">Discover Teams</a>
          </div>
        </div>
      </section>

      {/* Featured Matches Section */}
      <section className="featured-matches-section">
        <h2 className="section-title"><img src={trophyIcon} alt="Trophy" className="section-icon" /> Upcoming Highlights</h2>
        {loadingFeatured ? (
          <p className="loading-message">Loading top matches...</p>
        ) : errorFeatured ? (
          <p className="error-message">{errorFeatured}</p>
        ) : featuredMatches.length === 0 ? (
          <p className="no-data-message">No upcoming matches to highlight right now.</p>
        ) : (
          <div className="matches-grid">
            {featuredMatches.map((match) => (
              <div key={match.id} className="match-card">
                <div className="match-card-header">
                  <span className="match-status">{match.status}</span>
                  <span className="match-competition">{match.competition.name}</span>
                </div>
                <div className="match-teams">
                  <span className="team-name">{match.homeTeam.name}</span>
                  <span className="vs">vs</span>
                  <span className="team-name">{match.awayTeam.name}</span>
                </div>
                <p className="match-date">{new Date(match.utcDate).toLocaleString()}</p>
                {/* Add more details as needed */}
              </div>
            ))}
          </div>
        )}
        <div className="section-footer">
          <a href="/#/news" className="btn-link">View All Matches & News &raquo;</a>
        </div>
      </section>

      {/* Live Scores Snapshot Section */}
      <section className="live-scores-snapshot-section">
        <h2 className="section-title"><img src={newsIcon} alt="News" className="section-icon" /> Latest Scores</h2>
        <LiveScores /> {/* Your LiveScores component will render here */}
        <div className="section-footer">
          <a href="/#/news" className="btn-link">See Live Updates &raquo;</a>
        </div>
      </section>

      {/* Placeholder Sections for future development */}
      <section className="placeholder-section">
        <h2 className="section-title">Explore Leagues & Teams</h2>
        <p>Dive into detailed stats, player profiles, and league standings for your favorite clubs.</p>
        <div className="section-footer">
          <a href="/#/teams" className="btn-link">Browse Teams &raquo;</a>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2 className="section-title">Join the GoalTracker Community!</h2>
        <p>Get personalized updates, follow your favorite teams, and never miss a goal.</p>
        <button className="btn-primary">Sign Up Now!</button> {/* Placeholder for future sign-up */}
      </section>

    </div>
  );
}
