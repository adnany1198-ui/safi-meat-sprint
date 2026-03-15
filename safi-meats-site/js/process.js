/* ==========================================================================
   SAFI MEATS — Process Stage Tabs
   Horizontal tab panel interaction for supply chain stages
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const stages = [
    {
      label: 'Step One',
      title: 'Controlled Sourcing',
      desc: 'Sourced from our own farms and vetted partner farms across Punjab\u2019s livestock belt. We control breed selection, feed quality, and animal health from the start.',
      overseer: 'Overseen by: Livestock & Sourcing Team',
      image: 'Stage Image'
    },
    {
      label: 'Step Two',
      title: 'Approved Processing Partners',
      desc: 'All processing occurs at export-certified, halal-compliant facilities that meet strict international hygiene standards.',
      overseer: 'Overseen by: Processing Operations',
      image: 'Stage Image'
    },
    {
      label: 'Step Three',
      title: 'Quality Inspection',
      desc: 'Multi-stage quality checks at pre-slaughter, during processing, and post-packaging. Every batch is graded before it advances.',
      overseer: 'Overseen by: Quality Assurance',
      image: 'Stage Image'
    },
    {
      label: 'Step Four',
      title: 'Cold Chain Integrity',
      desc: 'Temperature-controlled storage and transport from processing facility to port. No breaks in the chain.',
      overseer: 'Overseen by: Logistics Team',
      image: 'Stage Image'
    },
    {
      label: 'Step Five',
      title: 'Packaging',
      desc: 'Vacuum-sealed, export-grade packaging with full labelling \u2014 product type, cut, weight, batch number, processing date, and halal certification.',
      overseer: 'Overseen by: Packaging & QA',
      image: 'Stage Image'
    },
    {
      label: 'Step Six',
      title: 'Documentation',
      desc: 'Complete export documentation including health certificates, halal certificates, phytosanitary documents, commercial invoices, and customs clearance.',
      overseer: 'Overseen by: Export Documentation',
      image: 'Stage Image'
    },
    {
      label: 'Step Seven',
      title: 'Shipment (Air & Sea)',
      desc: 'Final dispatch via air freight for urgent orders or sea freight for bulk shipments. Full tracking provided to buyer from departure to arrival.',
      overseer: 'Overseen by: Logistics & Freight',
      image: 'Stage Image'
    }
  ];

  const tabs = document.querySelectorAll('.process-tab');
  const panel = document.querySelector('.process-panel');
  const track = document.querySelector('.process-tabs__track');

  if (!tabs.length || !panel || !track) return;

  const panelLabel = panel.querySelector('.process-panel__step-label');
  const panelTitle = panel.querySelector('.process-panel__title');
  const panelDesc = panel.querySelector('.process-panel__desc');
  const panelOverseer = panel.querySelector('.process-panel__overseer');
  const panelImage = panel.querySelector('.process-panel__image-placeholder');

  function updateProgressLine(index) {
    // Calculate how far the gold progress line should extend
    if (tabs.length <= 1) return;
    const pct = (index / (tabs.length - 1)) * 100;
    track.style.setProperty('--progress-width', pct + '%');
  }

  function selectStage(index) {
    // Update tab states
    tabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.classList.toggle('process-tab--active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Animate panel swap
    panel.classList.add('process-panel--transitioning');

    setTimeout(() => {
      const stage = stages[index];
      panelLabel.textContent = stage.label;
      panelTitle.textContent = stage.title;
      panelDesc.textContent = stage.desc;
      panelOverseer.textContent = stage.overseer;
      panelImage.textContent = stage.image;

      panel.classList.remove('process-panel--transitioning');
    }, 200);

    updateProgressLine(index);
  }

  // Attach click handlers
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const index = parseInt(tab.getAttribute('data-stage'), 10);
      selectStage(index);
    });
  });

  // Keyboard navigation (left/right arrows)
  tabs.forEach((tab) => {
    tab.addEventListener('keydown', (e) => {
      let currentIndex = parseInt(tab.getAttribute('data-stage'), 10);

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = Math.min(currentIndex + 1, tabs.length - 1);
        tabs[next].focus();
        selectStage(next);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(currentIndex - 1, 0);
        tabs[prev].focus();
        selectStage(prev);
      }
    });
  });

  // Initialize progress line for first stage
  updateProgressLine(0);
});
