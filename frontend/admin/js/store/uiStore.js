class UiStore {
  state = {
    sidebarCollapsed: false,
    loading: false,
    activePage: 'dashboard',
    pageTitle: 'Dashboard',
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

  _mapPageTitle(page) {
    const titles = {
      dashboard: 'Dashboard',
      travelers: 'Travelers',
      blocks: 'Blocks',
      packages: 'Packages',
      hotels: 'Hotels',
      settings: 'Settings',
    };
    return titles[page] || page;
  }

  toggleSidebar() {
    this.state.sidebarCollapsed = !this.state.sidebarCollapsed;
    this._notify();
  }

  setActivePage(page) {
    this.state.activePage = page;
    this.state.pageTitle = this._mapPageTitle(page);
    this._notify();
  }
}

window.UiStore = new UiStore();
