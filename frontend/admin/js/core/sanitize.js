/**
 * Travela SaaS - Sanitize
 * Prevents XSS, sanitizes user input and API responses
 */

var Sanitize = (function() {
    'use strict';

    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\//g, '&#x2F;');
    }

    function stripHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str).replace(/<[^>]*>/g, '');
    }

    function sanitizeObject(obj, maxDepth) {
        maxDepth = maxDepth || 5;
        if (maxDepth <= 0) return null;

        if (typeof obj === 'string') return escapeHtml(obj);
        if (Array.isArray(obj)) return obj.map(function(item) { return sanitizeObject(item, maxDepth - 1); });
        if (obj && typeof obj === 'object') {
            var result = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    result[key] = sanitizeObject(obj[key], maxDepth - 1);
                }
            }
            return result;
        }
        return obj;
    }

    function sanitizeEmail(email) {
        if (!email) return '';
        var cleaned = String(email).trim().toLowerCase();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(cleaned) ? cleaned : '';
    }

    function sanitizeUrl(url) {
        if (!url) return '';
        var cleaned = String(url).trim();
        var dangerous = /^(javascript|data|vbscript):/i;
        return dangerous.test(cleaned) ? '' : cleaned;
    }

    function sanitizeNumber(value, defaultValue) {
        defaultValue = defaultValue || 0;
        var num = Number(value);
        return isNaN(num) ? defaultValue : num;
    }

    function truncate(str, maxLength, suffix) {
        maxLength = maxLength || 100;
        suffix = suffix || '...';
        if (!str) return '';
        var cleaned = stripHtml(str);
        if (cleaned.length <= maxLength) return cleaned;
        return cleaned.substring(0, maxLength - suffix.length) + suffix;
    }

    return {
        escapeHtml: escapeHtml,
        stripHtml: stripHtml,
        sanitizeObject: sanitizeObject,
        sanitizeEmail: sanitizeEmail,
        sanitizeUrl: sanitizeUrl,
        sanitizeNumber: sanitizeNumber,
        truncate: truncate
    };
})();

window.Sanitize = Sanitize;
