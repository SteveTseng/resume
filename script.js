let currentLang = localStorage.getItem('resume-lang') || 'zh';

function toggleLang() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('resume-lang', currentLang);
  applyLang();
}

function applyLang() {
  const isEn = currentLang === 'en';

  document.getElementById('langBtn').textContent = isEn ? '中文' : 'EN';
  document.documentElement.lang = isEn ? 'en' : 'zh-TW';
  document.title = isEn
    ? 'Steve YW Tseng | Resume'
    : '曾昱文 Steve YW Tseng | 履歷';

  document.querySelectorAll('[data-zh][data-en]').forEach(el => {
    const val = isEn ? el.dataset.en : el.dataset.zh;
    if (val !== undefined) el.innerHTML = val;
  });
}

// Project card expand/collapse
function toggleProject(button) {
  const card = button.closest('.project-card');
  card.classList.toggle('expanded');
  button.textContent = card.classList.contains('expanded')
    ? (currentLang === 'en' ? 'Collapse' : '摺疊')
    : (currentLang === 'en' ? 'Expand' : '展開');
}

// Smooth active link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--teal)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// Init on load
applyLang();
