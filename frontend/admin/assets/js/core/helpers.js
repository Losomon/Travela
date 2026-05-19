var Helpers = {
    debounce: function (fn, ms) {
        var timer = null;
        return function () {
            var context = this;
            var args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () { fn.apply(context, args); }, ms);
        };
    },
    formatCurrency: function (value) {
        return '$' + Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    formatDate: function (dateStr) {
        var d = new Date(dateStr);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    },
    relativeTime: function (ts) {
        var seconds = Math.floor((Date.now() - new Date(ts)) / 1000);
        var intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };
        for (var key in intervals) {
            var count = Math.floor(seconds / intervals[key]);
            if (count >= 1) return count + ' ' + key + (count === 1 ? '' : 's') + ' ago';
        }
        return 'just now';
    },
    generateId: function (prefix) {
        return prefix + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    },
    clampNumber: function (val, min, max) {
        return Math.min(Math.max(val, min), max);
    },
    select: function (selector) {
        return document.querySelector(selector);
    },
    selectAll: function (selector) {
        return document.querySelectorAll(selector);
    },
    addEventListenerMulti: function (el, event, /* ...targets */) {
        var targets = Array.prototype.slice.call(arguments, 3);
        el.addEventListener(event, function (e) {
            targets.forEach(function (sel) {
                var target = el.querySelector(sel);
                if (target && e.target.closest(sel)) {
                    target.dispatchEvent(new Event(event.replace('on', '')));
                }
            });
        });
    }
};
window.Helpers = Helpers;