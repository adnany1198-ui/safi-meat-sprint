/* ==========================================================================
   SAFI MEATS — Media Gallery Filter
   Category-based filtering for gallery items
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('.media-filter');
  const items = document.querySelectorAll('.media-item');

  if (!filters.length || !items.length) return;

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Update active filter
      filters.forEach((f) => f.classList.remove('media-filter--active'));
      btn.classList.add('media-filter--active');

      // Show/hide items
      items.forEach((item) => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.classList.remove('media-item--hidden');
        } else {
          item.classList.add('media-item--hidden');
        }
      });
    });
  });
});
