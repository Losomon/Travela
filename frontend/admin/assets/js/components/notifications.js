const Notifications = {
  _abort: null,
  _pollInterval: 30000,

  init() {
    this._abort = new AbortController();
    this.poll();
    window.addEventListener('beforeunload', function() { Notifications.dispose(); });
  },

  poll() {
    if (this._abort && this._abort.signal.aborted) return;

    setTimeout(function() {
      if (Notifications._abort && Notifications._abort.signal.aborted) return;

      fetch('/api/notifications', { signal: Notifications._abort.signal })
        .then(function(r) { return r.json(); })
        .then(function(data) {
          var feed = document.querySelector('.notifications-feed');
          if (feed && Array.isArray(data)) {
            data.forEach(function(n) {
              var item = document.createElement('div');
              item.className = 'notification-item';
              item.innerHTML = '<div>' + n.message + '</div><small>' + n.time + '</small>';
              feed.appendChild(item);
            });
          }
        })
        .catch(function(err) {
          if (err.name !== 'AbortError') {
            console.warn('Notification poll failed:', err);
          }
        })
        .finally(function() { Notifications.poll(); });
    }, this._pollInterval);
  },

  show(options) {
    var toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.innerHTML = '<strong>' + (options.title || '') + '</strong><p>' + (options.message || '') + '</p>';
    document.body.appendChild(toast);

    setTimeout(function() { toast.remove(); }, options.duration || 5000);
  },

  markAsRead(id) {
    fetch('/api/notifications/' + id + '/read', { method: 'POST' });
  },

  dispose() {
    if (this._abort) {
      this._abort.abort();
      this._abort = null;
    }
  },

  setPollInterval(ms) {
    this._pollInterval = ms;
  }
};

window.Notifications = Notifications;
