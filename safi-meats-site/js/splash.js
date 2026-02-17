/* ==========================================================================
   SAFI MEATS — Splash Screen
   Auto-dismiss timing and click-to-skip
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const splash = document.querySelector('.splash');
  const pageContent = document.getElementById('page-content');

  if (!splash || !pageContent) return;

  // Prevent scrolling while splash is visible
  document.body.style.overflow = 'hidden';

  const dismissSplash = () => {
    if (splash.classList.contains('dismiss')) return; // Already dismissed

    splash.classList.add('dismiss');
    document.body.style.overflow = '';

    // Reveal page content after short delay
    setTimeout(() => {
      pageContent.classList.add('visible');
    }, 300);
  };

  // Auto-dismiss after 4 seconds
  const autoTimer = setTimeout(dismissSplash, 4000);

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
