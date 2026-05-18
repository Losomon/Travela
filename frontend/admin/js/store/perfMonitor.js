/**
 * Travela SaaS - Performance Monitor
 * Tracks FPS and identifies performance bottlenecks
 */

var PerfMonitor = (function() {
    'use strict';

    var lastFrameTime = performance.now();
    var frames = 0;
    var currentFPS = 60;
    var rafId = null;
    var listeners = [];
    var isEnabled = true;

    var THRESHOLDS = { EXCELLENT: 55, GOOD: 45, OK: 30, POOR: 20 };

    function measureFPS() {
        if (!isEnabled) return;
        frames++;
        var now = performance.now();
        var delta = now - lastFrameTime;

        if (delta >= 1000) {
            currentFPS = Math.round((frames * 1000) / delta);
            frames = 0;
            lastFrameTime = now;
            notify();
        }
        rafId = requestAnimationFrame(measureFPS);
    }

    function notify() {
        for (var i = 0; i < listeners.length; i++) {
            try { listeners[i](currentFPS, getStatus()); }
            catch(e) { console.error('PerfMonitor listener error:', e); }
        }
    }

    function getStatus() {
        if (currentFPS >= THRESHOLDS.EXCELLENT) return 'excellent';
        if (currentFPS >= THRESHOLDS.GOOD)     return 'good';
        if (currentFPS >= THRESHOLDS.OK)       return 'ok';
        if (currentFPS >= THRESHOLDS.POOR)     return 'poor';
        return 'critical';
    }

    function start() {
        if (rafId) stop();
        isEnabled = true;
        lastFrameTime = performance.now();
        frames = 0;
        rafId = requestAnimationFrame(measureFPS);
    }

    function stop() {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        isEnabled = false;
    }

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) stop(); else start();
    });

    // Auto-start
    start();

    return {
        getFPS:     function() { return currentFPS; },
        getStatus:  getStatus,
        isLowFPS:   function(threshold) { return currentFPS < (threshold || 30); },
        subscribe:  function(fn) { listeners.push(fn); return function() { listeners = listeners.filter(function(l) { return l !== fn; }); }; },
        start:      start,
        stop:       stop,
        THRESHOLDS: THRESHOLDS
    };
})();

window.PerfMonitor = PerfMonitor;
