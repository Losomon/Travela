const Modals = {
  _trapHandler: null,

  open(id) {
    var modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.add('active');
    var overlay = modal.querySelector('.modal-overlay') || modal;
    overlay.classList.add('active');

    var focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();

    if (!this._trapHandler) {
      this._trapHandler = function(e) {
        if (e.key !== 'Tab') return;
        var active = document.querySelector('.modal.active, .modal-overlay.active');
        if (!active) return;
        var targets = active.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!targets.length) return;
        var first = targets[0];
        var last = targets[targets.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      };
      document.addEventListener('keydown', this._trapHandler);
    }
  },

  close(id) {
    var modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.remove('active');
    var overlay = modal.querySelector('.modal-overlay') || modal;
    overlay.classList.remove('active');

    var inputs = modal.querySelectorAll('input, select, textarea');
    inputs.forEach(function(input) { input.value = ''; });

    var stillOpen = document.querySelectorAll('.modal.active, .modal-overlay.active');
    if (!stillOpen.length && this._trapHandler) {
      document.removeEventListener('keydown', this._trapHandler);
      this._trapHandler = null;
    }
  },

  closeAll() {
    document.querySelectorAll('.modal.active').forEach(function(modal) {
      modal.classList.remove('active');
    });
    document.querySelectorAll('.modal-overlay.active').forEach(function(overlay) {
      overlay.classList.remove('active');
    });
    if (this._trapHandler) {
      document.removeEventListener('keydown', this._trapHandler);
      this._trapHandler = null;
    }
  },

  init() {
    document.querySelectorAll('.modal-close, .modal-overlay').forEach(function(el) {
      el.addEventListener('click', function(e) {
        var modal = el.closest('.modal');
        if (modal) Modals.close(modal.id);
      });
    });
  }
};

window.Modals = Modals;
