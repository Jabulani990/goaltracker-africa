import { useEffect, useState } from 'react';
import { fetchLiveMatches } from '../api/footballData';

export default function LiveScores() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLiveMatches()
      .then(data => {
        setMatches(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="live-scores">
      <h3>⚽ LIVE MATCHES</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        matches.map(match => (
          <div key={match.id} className="match">
            <span>{match.homeTeam.shortName}</span>
            <strong>{match.score.fullTime.home} - {match.score.fullTime.away}</strong>
            <span>{match.awayTeam.shortName}</span>
            <small>{match.minute}'</small>
          </div>
        ))
      )}
    </div>
  );
}
