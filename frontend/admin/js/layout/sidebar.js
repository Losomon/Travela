const Sidebar = {
  init() {
    const toggleBtn = document.querySelector('.sidebar-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }
  },

  get collapsed() {
    return document.querySelector('.app').classList.contains('sidebar-collapsed');
  },

  set collapsed(value) {
    document.querySelector('.app').classList.toggle('sidebar-collapsed', value);
  },

  toggle() {
    this.collapsed = !this.collapsed;
  }
};

window.Sidebar = Sidebar;