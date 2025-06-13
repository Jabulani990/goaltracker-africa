import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LiveScores from '../components/LiveScores';
import '../styles/home.css';
import newsIcon from '../assets/news.png'; // Make sure these are in src/assets
import trophyIcon from '../assets/trophy.png';
import teamIcon from '../assets/team.png'; // Placeholder for team icon

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
  }, []);

  return (
    <div className="home-container">

      {/* 1. Hero Section: Large, engaging image/video background with main title and CTAs */}
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

      {/* 2. Featured Matches Section: Dynamic content in a grid/card layout */}
      <section className="featured-matches-section content-section">
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
                {/* Add a "View Match" link or button if applicable */}
              </div>
            ))}
          </div>
        )}
        <div className="section-footer">
          <a href="/#/news" className="btn-link">View All Matches & News &raquo;</a>
        </div>
      </section>

      {/* 3. Live Scores Snapshot Section: Concise display of current scores */}
      <section className="live-scores-snapshot-section content-section">
        <h2 className="section-title"><img src={newsIcon} alt="News" className="section-icon" /> Latest Scores</h2>
        <LiveScores /> {/* Your LiveScores component will render here */}
        <div className="section-footer">
          <a href="/#/news" className="btn-link">See Live Updates &raquo;</a>
        </div>
      </section>

      {/* 4. Explore Teams & Leagues Section: Visually appealing links to other parts of the site */}
      <section className="explore-section content-section">
        <h2 className="section-title"><img src={teamIcon} alt="Team" className="section-icon" /> Discover Your Clubs</h2>
        <p className="section-description">Dive into detailed stats, player profiles, and league standings for your favorite teams and competitions.</p>
        <div className="explore-grid">
            <div className="explore-card">
                <h3>South African Teams</h3>
                <p>Browse all PSL clubs and their details.</p>
                <a href="/#/teams" className="btn-secondary-small">View Teams</a>
            </div>
            <div className="explore-card">
                <h3>Leagues & Standings</h3>
                <p>Track your favorite league's progress.</p>
                <a href="/#/leagues" className="btn-secondary-small">Explore Leagues</a> {/* You might need a new /leagues route */}
            </div>
             <div className="explore-card">
                <h3>Player Profiles</h3>
                <p>Discover player stats, history, and news.</p>
                <a href="/#/players" className="btn-secondary-small">Find Players</a> {/* You might need a new /players route */}
            </div>
        </div>
      </section>

      {/* 5. Call to Action / Engagement Section */}
      <section className="cta-section">
        <h2 className="section-title">Join the GoalTracker Community!</h2>
        <p className="section-description">Get personalized updates, follow your favorite teams, and never miss a goal.</p>
        <button className="btn-primary">Sign Up Now!</button> {/* Placeholder for future sign-up */}
      </section>

    </div>
  );
}
