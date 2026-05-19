const Tabs = {
  init() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const panelId = btn.dataset.target;
        this.activate(panelId);
      });
    });
  },

  activate(panelId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

    const btn = document.querySelector(`.tab-btn[data-target="${panelId}"]`);
    const panel = document.getElementById(panelId);

    if (btn) btn.classList.add('active');
    if (panel) panel.classList.add('active');
  }
};

window.Tabs = Tabs;