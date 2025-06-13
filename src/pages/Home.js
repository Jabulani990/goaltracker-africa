import React from 'react';
import LiveScores from '../components/LiveScores';
// You might eventually import a "NewsHighlights" component or similar
// import NewsHighlights from '../components/NewsHighlights';
// import FeaturedTeams from '../components/FeaturedTeams';
import '../styles/home.css'; // Assuming you'll create a specific CSS for Home page

export default function Home() {
  return (
    <main className="home-page-content">
      {/* Hero Section or Welcome Banner */}
      <section className="welcome-section">
        <h1>Welcome to GoalTracker Africa</h1>
        <p className="tagline">Your ultimate destination for African football news, live scores, and team insights.</p>
        {/* Optional: Add a hero image or video here */}
      </section>

      {/* Live Scores Section */}
      <section className="live-scores-section">
        <h2>Live Match Updates</h2>
        <LiveScores />
        {/* Optional: Button to view all live scores, if LiveScores component doesn't lead there */}
        <div className="section-actions">
          <a href="/#/news" className="btn-primary">View All Matches</a>
        </div>
      </section>

      {/* News Highlights Section (Conceptual) */}
      <section className="news-highlights-section">
        <h2>Latest Football News</h2>
        {/*
          Here you would ideally:
          - Fetch top 3-5 news headlines from your API (if API supports pagination/limit).
          - Render them as short cards/previews.
          - Or import a dedicated NewsHighlights component here.
        */}
        <div className="news-placeholder">
          <p>Stay updated with the latest happenings in African football.</p>
          <ul>
            <li>Headline 1: Major game result...</li>
            <li>Headline 2: Player transfer rumors...</li>
            <li>Headline 3: League standings update...</li>
          </ul>
        </div>
        <div className="section-actions">
          <a href="/#/news" className="btn-secondary">Read All News</a>
        </div>
      </section>

      {/* Featured Teams/Leagues Section (Conceptual) */}
      <section className="featured-section">
        <h2>Explore Teams & Leagues</h2>
        {/*
          Here you could:
          - Display logos of featured teams or popular leagues.
          - Link to their respective detail pages.
          - Or import a FeaturedTeams component.
        */}
        <div className="teams-placeholder">
          <p>Dive deep into your favorite teams and leagues.</p>
          <div className="team-logos-placeholder">
            {/* Example: <img src="team-logo.png" alt="Team A" /> */}
            [Team A Logo] [Team B Logo] [League X Logo]
          </div>
        </div>
        <div className="section-actions">
          <a href="/#/teams" className="btn-secondary">Browse All Teams</a>
        </div>
      </section>

      {/* General Call to Action / Footer-like section */}
      <section className="cta-section">
        <h3>Join the African Football Community!</h3>
        <p>GoalTracker Africa is constantly evolving. Your feedback helps us grow.</p>
        {/* Optional: Newsletter signup, contact form link etc. */}
      </section>
    </main>
  );
}
