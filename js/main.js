const apiKey = 'f55a1d7187ef4c618812f3e2cf7c4a46';

async function fetchJSON(url) {
  try {
    const res = await fetch(url, {
      headers: { 'X-Auth-Token': apiKey }
    });
    return await res.json();
  } catch (e) {
    console.error('API error', e);
    return null;
  }
}

async function displayClubs() {
  const container = document.getElementById('clubs-container');
  if (!container) return;

  // First, get all PL teams
  const data = await fetchJSON('https://api.football-data.org/v4/competitions/PL/teams');
  if (!data || !data.teams) return;

  // For each team, fetch full details
  for (let team of data.teams) {
    const teamDetails = await fetchJSON(`https://api.football-data.org/v4/teams/${team.id}`);
    const div = document.createElement('div');
    div.className = 'glass p-4 mb-4 shadow-lg';
    div.innerHTML = `
      <h2 class="text-xl font-bold mb-2">${team.name}</h2>
      <p>Manager: ${teamDetails?.coach?.name || 'N/A'}</p>
      <p>Stadium: ${teamDetails?.venue || 'N/A'}</p>
      <p>Founded: ${teamDetails?.founded || 'N/A'}</p>
      <h3 class="font-semibold mt-2">Squad:</h3>
      <ul class="text-sm list-disc list-inside">
        ${teamDetails?.squad?.map(p => `<li>${p.name} - ${p.position || 'N/A'}</li>`).join('') || 'No squad data available'}
      </ul>
    `;
    container.appendChild(div);
  }
}

document.addEventListener('DOMContentLoaded', displayClubs);
