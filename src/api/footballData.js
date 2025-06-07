const API_KEY = process.env.REACT_APP_FOOTBALL_API_KEY;

export const fetchLiveMatches = async () => {
  try {
    const response = await fetch('https://api.football-data.org/v4/matches', {
      headers: { 'X-Auth-Token': API_KEY }
    });
    const data = await response.json();
    return data.matches.filter(match => match.status === 'IN_PLAY');
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
};

export const fetchStandings = async (competitionId = 'PL') => {
  try {
    const response = await fetch(`https://api.football-data.org/v4/competitions/${competitionId}/standings`, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    const data = await response.json();
    return data.standings;
  } catch (error) {
    console.error("Error fetching standings:", error);
    return [];
  }
};
