import { useEffect, useState } from 'react';
import { fetchLiveMatches } from '../api/footballData';

export default function LiveScores() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLiveMatches()
      .then(data => {
        setMatches(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch live matches.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="live-scores">
      <h3>⚽ LIVE MATCHES</h3>

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && matches.length === 0 && (
        <p>No live matches at the moment.</p>
      )}

      {!loading && !error && matches.map(match => (
        <div key={match.id} className="match">
          <span>{match.homeTeam.shortName}</span>
          <strong>{match.score.fullTime.home} - {match.score.fullTime.away}</strong>
          <span>{match.awayTeam.shortName}</span>
          <small>{match.minute ?? ''}'</small>
        </div>
      ))}
    </div>
  );
}
