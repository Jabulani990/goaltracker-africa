export default function LiveScores() {
  const matches = [
    { home: "Kaizer Chiefs", away: "Orlando Pirates", score: "1-1", minute: "67'" },
    { home: "Mamelodi Sundowns", away: "SuperSport Utd", score: "2-0", minute: "HT" }
  ];

  return (
    <div className="live-scores">
      <h3>⚽ LIVE MATCHES</h3>
      <div className="matches">
        {matches.map((match, index) => (
          <div key={index} className="match">
            <span>{match.home}</span>
            <strong>{match.score}</strong>
            <span>{match.away}</span>
            <small>{match.minute}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
