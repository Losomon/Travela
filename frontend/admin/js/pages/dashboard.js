const Dashboard = {
  init() {
    Charts.initRevenueChart('revenueChart');
    Animations.fadeUp(document.querySelectorAll('.fade-up'));
    this.initFilterChips();
    this.initLiveFeed();
    this.initCommandPalette();
  },

  initCommandPalette() {
    const palette = document.getElementById('commandPalette');
    if (!palette) return;

    const openPalette = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        palette.classList.add('open');
        palette.querySelector('input').focus();
      }
    };

    const closePalette = (e) => {
      if (e.key === 'Escape' || e.target === palette) {
        palette.classList.remove('open');
      }
    };

    document.addEventListener('keydown', openPalette);
    document.addEventListener('click', closePalette);
    palette.addEventListener('keydown', closePalette);
  },

  initLiveFeed() {
    const feedItems = document.querySelectorAll('.feed-item');
    Animations.stagger(feedItems, 100);
  },

  initFilterChips() {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        Charts.updateFilter(filter);
      });
    });
  }
};

window.Dashboard = Dashboard;