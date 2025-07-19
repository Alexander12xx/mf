ScrollReveal().reveal('.hero', { delay: 200, origin: 'top', distance: '50px', duration: 1000 });
ScrollReveal().reveal('.stats div', { interval: 200 });
ScrollReveal().reveal('.match-card', { origin: 'left', distance: '50px' });
ScrollReveal().reveal('.league-slider', { origin: 'right', distance: '50px' });
ScrollReveal().reveal('.standings table', { scale: 0.85 });
ScrollReveal().reveal('.ads .ad-card', { interval: 150 });
ScrollReveal().reveal('.signup form', { origin: 'bottom', distance: '50px' });

const countdownEl = document.getElementById('countdown');
const matchDate = new Date('2025-07-20T16:00:00').getTime();
setInterval(() => {
  const now = new Date().getTime();
  const diff = matchDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

const form = document.getElementById('signupForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const team = document.getElementById('team').value;
  const role = document.getElementById('role').value;
  const phone = document.getElementById('phone').value;
  const msg = `Hello Mumo Foundation!%0AI would like to register as a ${role}.%0AName: ${name}%0ATeam: ${team}%0APhone: ${phone}`;
  window.open(`https://wa.me/254716868013?text=${msg}`, '_blank');
});

fetch('https://www.scorebat.com/video-api/v3/')
  .then(res => res.json())
  .then(data => {
    const liveScores = document.getElementById('liveScores');
    liveScores.innerHTML = '';
    data.response.slice(0,5).forEach(match => {
      const div = document.createElement('div');
      div.className = 'live-match';
      div.innerHTML = `<strong>${match.title}</strong><br><a href="${match.url}" target="_blank">Watch Highlights</a>`;
      liveScores.appendChild(div);
    });
  });

const toggle = document.createElement('button');
toggle.textContent = '🌙 Dark Mode';
toggle.style.position = 'fixed';
toggle.style.top = '1rem';
toggle.style.right = '1rem';
document.body.appendChild(toggle);
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});