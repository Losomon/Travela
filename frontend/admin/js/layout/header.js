const Header = {
  init() {
    const workspaceSwitcher = document.querySelector('[data-workspace-switcher]');
    const notificationBell = document.querySelector('[data-notification-bell]');
    const commandPalette = document.querySelector('[data-command-palette]');

    if (workspaceSwitcher) {
      workspaceSwitcher.addEventListener('click', () => this.toggleWorkspaceSwitcher());
    }
    if (notificationBell) {
      notificationBell.addEventListener('mouseenter', () => this.toggleNotifications(true));
      notificationBell.addEventListener('mouseleave', () => this.toggleNotifications(false));
    }
    if (commandPalette) {
      commandPalette.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('open-command-palette'));
      });
    }
  },

  toggleWorkspaceSwitcher() {
    const dropdown = document.querySelector('.workspace-dropdown');
    if (dropdown) {
      dropdown.classList.toggle('open');
    }
  },

  toggleNotifications(open) {
    const dropdown = document.querySelector('.notifications-dropdown');
    if (dropdown) {
      dropdown.classList.toggle('open', open);
    }
  },

  activateLiveStatus() {
    const liveDot = document.querySelector('.live-dot');
    if (liveDot) {
      liveDot.classList.add('pulse');
      setTimeout(() => liveDot.classList.remove('pulse'), 2000);
    }
  }
};

window.Header = Header;