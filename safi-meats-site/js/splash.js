/* ==========================================================================
   SAFI MEATS — Splash Screen
   Auto-dismiss timing, click-to-skip, first-visit-only via localStorage
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const splash = document.querySelector('.splash');
  const pageContent = document.getElementById('page-content');

  if (!splash || !pageContent) return;

  // Only show splash on first visit
  if (localStorage.getItem('safi_splash_seen')) {
    splash.style.display = 'none';
    pageContent.classList.add('visible');
    document.body.style.overflow = '';
    return;
  }

  // Prevent scrolling while splash is visible
  document.body.style.overflow = 'hidden';

  const dismissSplash = () => {
    if (splash.classList.contains('dismiss')) return; // Already dismissed

    splash.classList.add('dismiss');
    document.body.style.overflow = '';
    localStorage.setItem('safi_splash_seen', '1');

    // Reveal page content after short delay
    setTimeout(() => {
      pageContent.classList.add('visible');
    }, 300);
  };

  // Auto-dismiss after 3 seconds
  const autoTimer = setTimeout(dismissSplash, 3000);

  // Click/tap to skip
  splash.addEventListener('click', () => {
    clearTimeout(autoTimer);
    dismissSplash();
  });

  // Allow keyboard skip (Enter or Space)
  splash.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      clearTimeout(autoTimer);
      dismissSplash();
    }
  });
});
