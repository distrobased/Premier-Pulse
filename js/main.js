const apiKey = 'f55a1d7187ef4c618812f3e2cf7c4a46';
const clubs = [
{name:'Arsenal',id:57}, {name:'Aston Villa',id:58}, {name:'Bournemouth',id:1044},
{name:'Brentford',id:397}, {name:'Brighton',id:397}, {name:'Burnley',id:328},
{name:'Chelsea',id:61}, {name:'Crystal Palace',id:354}, {name:'Everton',id:62},
{name:'Fulham',id:63}, {name:'Leeds',id:341}, {name:'Liverpool',id:64},
{name:'Man City',id:65}, {name:'Man Utd',id:66}, {name:'Newcastle',id:67},
{name:'Nottingham Forest',id:1046}, {name:'Sunderland',id:1047}, {name:'Tottenham',id:73},
{name:'West Ham',id:563}, {name:'Wolves',id:76}
];

async function fetchNews(clubId){
  try{
    const res = await fetch(`https://api.football-data.org/v4/teams/${clubId}`, { headers:{ 'X-Auth-Token': apiKey } });
    return await res.json();
  }catch(e){ console.error(e); return null; }
}

function displayClubs(){
  const container = document.getElementById('clubs-container');
  clubs.forEach(async c=>{
    const data = await fetchNews(c.id);
    const card = document.createElement('div');
    card.className = 'bg-white/80 glass p-4 shadow-lg';
    card.innerHTML = `
<h2 class='text-xl font-bold mb-2 text-center'>${c.name}</h2>
<p class='text-center'>Manager: ${data?.coach?.name || 'N/A'}</p>
<p class='text-center'>Stadium: ${data?.venue || 'N/A'}</p>
<p class='text-center'>Founded: ${data?.founded || 'N/A'}</p>
<h3 class='font-semibold mt-2'>Squad:</h3>
<ul class='text-sm list-disc list-inside'>
${data?.squad?.map(p=>`<li>${p.name} - ${p.position||'N/A'}</li>`).join('') || 'No squad data available'}
</ul>`;
    container.appendChild(card);
  });
}
displayClubs();