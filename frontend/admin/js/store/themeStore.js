class ThemeStore {
  state = {
    theme: 'light',
    darkSupported: true,
  };

  _listeners = [];

  subscribe(fn) {
    this._listeners.push(fn);
    return () => {
      this._listeners = this._listeners.filter(l => l !== fn);
    };
  }

  _notify() {
    this._listeners.forEach(fn => fn(this.state));
  }

  _applyClass(theme) {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-luxury');
    document.body.classList.add('theme-' + theme);
  }

  setTheme(name) {
    this.state.theme = name;
    this._applyClass(name);
    localStorage.setItem('travela-theme', name);
    this._notify();
  }

  toggle() {
    var themes = ['light', 'dark', 'luxury'];
    var i = themes.indexOf(this.state.theme);
    var next = themes[(i + 1) % themes.length];
    this.setTheme(next);
  }

  init() {
    var saved = localStorage.getItem('travela-theme');
    var valid = ['light', 'dark', 'luxury'];
    if (saved && valid.indexOf(saved) !== -1) {
      this.state.theme = saved;
    }
    this._applyClass(this.state.theme);
  }
}

window.ThemeStore = new ThemeStore();
