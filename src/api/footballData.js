const API_KEY = '735f4252933a4793bae38856151a8ac8'; // Get from football-data.org

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

export const fetchStandings = async () => {
  // Similar implementation for standings
};
