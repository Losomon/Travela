/**
 * Travela SaaS - Offline Store
 * Manages network connectivity state
 */

var OfflineStore = (function() {
    'use strict';

    var state = {
        isOnline:    navigator.onLine,
        wasOffline:  false,
        lastOnlineAt:  navigator.onLine ? new Date() : null,
        lastOfflineAt: navigator.onLine ? null : new Date()
    };

    var listeners = [];

    function notify() {
        for (var i = 0; i < listeners.length; i++) {
            try { listeners[i]({ isOnline: state.isOnline, wasOffline: state.wasOffline, lastOnlineAt: state.lastOnlineAt, lastOfflineAt: state.lastOfflineAt }); }
            catch (e) { console.error('OfflineStore listener error:', e); }
        }
    }

    function setOnline(v) {
        if (state.isOnline === v) return;
        if (v) {
            state.lastOnlineAt = new Date();
            state.wasOffline = true;
        } else {
            state.lastOfflineAt = new Date();
        }
        state.isOnline = v;
        notify();
        if (window.TravelaApp) {
            TravelaApp.emit(v ? 'network:online' : 'network:offline', state);
        }
    }

    function init() {
        window.addEventListener('online',  function() { setOnline(true);  });
        window.addEventListener('offline', function() { setOnline(false); });

        setInterval(function() {
            if (navigator.onLine !== state.isOnline) setOnline(navigator.onLine);
        }, 3000);
    }

    init();

    return {
        subscribe: function(cb) {
            listeners.push(cb);
            cb({ isOnline: state.isOnline, wasOffline: state.wasOffline, lastOnlineAt: state.lastOnlineAt, lastOfflineAt: state.lastOfflineAt });
            return function() { listeners = listeners.filter(function(l) { return l !== cb; }); };
        },
        getState: function() {
            return { isOnline: state.isOnline, wasOffline: state.wasOffline, lastOnlineAt: state.lastOnlineAt, lastOfflineAt: state.lastOfflineAt };
        },
        isOnline: function() { return state.isOnline; },
        setOnline: setOnline
    };
})();

window.OfflineStore = OfflineStore;
