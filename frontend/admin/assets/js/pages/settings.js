const Settings = {
  init() {
    this.initTabs();
    this.initFormValidation();
    this.initThemeToggle();
    Animations.fadeUp(document.querySelectorAll('.fade-up'));
  },

  initTabs() {
    const tabs = document.querySelectorAll('.settings-tab');
    const panels = document.querySelectorAll('.settings-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.querySelector(`[data-panel="${target}"]`)?.classList.add('active');
      });
    });
  },

  initFormValidation() {
    const forms = document.querySelectorAll('.settings-form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        Validation.validateForm(form);
      });
    });
  },

  initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('change', () => {
        ThemeStore.setTheme(toggle.checked ? 'dark' : 'light');
      });
    }
  }
};

window.Settings = Settings;