const apiKey = 'f55a1d7187ef4c618812f3e2cf7c4a46';

async function fetchJSON(url){
  try { const res = await fetch(url, { headers: { 'X-Auth-Token': apiKey } }); return await res.json(); }
  catch(e){ console.error('API error', e); return null; }
}

// Example: Display all clubs on clubs.html
async function displayClubs(){
  const container = document.getElementById('clubs-container');
  if(!container) return;
  const data = await fetchJSON('https://api.football-data.org/v4/competitions/PL/teams');
  data.teams.forEach(team => {
    const div = document.createElement('div');
    div.className = 'glass p-4 mb-4 shadow-lg';
    div.innerHTML = `<h2 class="text-xl font-bold">${team.name}</h2>
    <p>Manager: ${team.coach?.name || 'N/A'}</p>
    <p>Founded: ${team.founded || 'N/A'}</p>
    <p>Venue: ${team.venue || 'N/A'}</p>`;
    container.appendChild(div);
  });
}

// Example: Live matches
async function displayLiveMatches(){
  const container = document.getElementById('live-matches');
  if(!container) return;
  const data = await fetchJSON('https://api.football-data.org/v4/matches?status=LIVE');
  if(!data.matches) return;
  const table = document.createElement('table');
  table.className = 'table-glow';
  table.innerHTML = `<tr><th>Home</th><th>Score</th><th>Away</th><th>Status</th></tr>` +
    data.matches.map(m => `<tr><td>${m.homeTeam.name}</td><td>${m.score.fullTime.home}-${m.score.fullTime.away}</td><td>${m.awayTeam.name}</td><td>${m.status}</td></tr>`).join('');
  container.appendChild(table);
}

// Call relevant functions depending on page
document.addEventListener('DOMContentLoaded', () => {
  displayClubs();
  displayLiveMatches();
});