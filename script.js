// Cursor
const dot = document.getElementById('dot');
document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
});
document.addEventListener('mousedown', () => dot.classList.add('click'));
document.addEventListener('mouseup', () => dot.classList.remove('click'));
document.querySelectorAll('a,button,input,textarea,.project-item,.chip').forEach(el => {
  el.addEventListener('mouseenter', () => dot.classList.add('big'));
  el.addEventListener('mouseleave', () => dot.classList.remove('big'));
});

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.slide-up,.slide-left,.fade-in').forEach(el => obs.observe(el));

// Skill bars
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar[data-w]').forEach(b => {
        setTimeout(() => { b.style.transform = `scaleX(${b.dataset.w})`; }, 200);
      });
    }
  });
}, { threshold: 0.2 });
const skillsEl = document.querySelector('.about-skills');
if (skillsEl) skillObs.observe(skillsEl);

// Hero entrance
document.querySelectorAll('#hero .slide-up,#hero .slide-left,#hero .fade-in').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in')));
});

// Text scramble on project hover
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function scramble(el) {
  const original = el.textContent;
  let iter = 0;
  clearInterval(el._si);
  el._si = setInterval(() => {
    el.textContent = original.split('').map((c, i) => {
      if (i < iter) return original[i];
      if (c === '\n') return '\n';
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
    if (iter >= original.length) { clearInterval(el._si); el.textContent = original; }
    iter += 0.5;
  }, 28);
}
document.querySelectorAll('.project-item').forEach(item => {
  const title = item.querySelector('.p-title');
  if (title) item.addEventListener('mouseenter', () => scramble(title));
});

// Submit
function handleSubmit(btn) {
  btn.textContent = 'Sent ✓';
  btn.style.background = '#22c55e';
  btn.style.borderColor = '#22c55e';
  btn.style.color = '#000';
  setTimeout(() => {
    btn.textContent = 'Send it →';
    btn.style.cssText = '';
  }, 3000);
}
