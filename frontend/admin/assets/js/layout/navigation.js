const Navigation = {
  init() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(nav => nav.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const itemName = e.currentTarget.textContent.trim();
        document.dispatchEvent(new CustomEvent('SidebarNavigate', { detail: { itemName } }));
      });
    });
  },

  getActiveSection() {
    const activeItem = document.querySelector('.nav-item.active');
    return activeItem ? activeItem.textContent.trim() : null;
  },

  setActive(itemText) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.textContent.trim() === itemText);
    });
  }
};

window.Navigation = Navigation;