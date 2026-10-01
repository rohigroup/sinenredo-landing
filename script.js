const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

async function loadChunkedImage(elementId, basePath, count) {
  const element = document.getElementById(elementId);
  if (!element) return;
  try {
    const paths = Array.from({ length: count }, (_, i) => `${basePath}/${String(i + 1).padStart(2, '0')}.txt`);
    const parts = await Promise.all(paths.map(async path => {
      const response = await fetch(path, { cache: 'force-cache' });
      if (!response.ok) throw new Error(`No se pudo cargar ${path}`);
      return (await response.text()).trim();
    }));
    element.src = `data:image/jpeg;base64,${parts.join('')}`;
  } catch (error) {
    console.error(error);
  }
}

loadChunkedImage('hero-photo', 'assets/jessica-hero-chunks', 4);
loadChunkedImage('profile-photo', 'assets/jessica-profile-chunks', 4);