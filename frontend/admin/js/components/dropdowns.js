const Dropdowns = {
  init() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        this.closeAll();
      }
    });

    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = btn.closest('.dropdown');
        this.toggle(dropdown);
      });
    });
  },

  toggle(el) {
    const dropdown = el.closest ? el.closest('.dropdown') : el;
    document.querySelectorAll('.dropdown').forEach(d => {
      if (d !== dropdown) d.classList.remove('open');
    });
    dropdown.classList.toggle('open');
  },

  closeAll() {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
  }
};

window.Dropdowns = Dropdowns;