const Widgets = {
  observers: new Map(),

  init() {
    const widgets = document.querySelectorAll('[data-widget]');
    widgets.forEach(widget => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.refresh(entry.target.dataset.widget);
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(widget);
      this.observers.set(widget.dataset.widget, observer);
    });
  },

  refresh(widgetId) {
    const container = document.querySelector(`[data-widget="${widgetId}"]`);
    if (!container) return;

    fetch(`/api/widgets/${widgetId}`)
      .then(r => r.json())
      .then(data => this.render(container, data.html))
      .catch(() => {});
  },

  render(container, html) {
    container.style.opacity = '0';
    setTimeout(() => {
      container.innerHTML = html;
      container.style.transition = 'opacity 0.3s ease';
      container.style.opacity = '1';
    }, 150);
  }
};

window.Widgets = Widgets;