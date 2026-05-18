/**
 * Travela SaaS - API Client
 * Centralized, zero-dependency fetch wrapper
 */

var ApiClient = (function() {
    'use strict';

    var config = window.TravelaConfig || {};
    var baseURL = (config.getApiUrl ? config.getApiUrl('') : '') || '/api';

    function request(method, path, body, options) {
        options = options || {};
        var url = path.indexOf('http') === 0 ? path : baseURL + path;

        var fetchOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            },
            signal: options.signal || null
        };

        if (options.headers) {
            for (var key in options.headers) {
                fetchOptions.headers[key] = options.headers[key];
            }
        }

        if (body && method !== 'GET' && method !== 'HEAD') {
            fetchOptions.body = JSON.stringify(body);
        }

        if (options.signal) fetchOptions.signal = options.signal;

        return fetch(url, fetchOptions)
            .then(function(response) {
                if (!response.ok) {
                    var err = new Error('HTTP ' + response.status + ': ' + response.statusText);
                    err.status = response.status;
                    err.response = response;
                    throw err;
                }
                var ct = response.headers.get('content-type');
                if (ct && ct.indexOf('application/json') !== -1) {
                    return response.json();
                }
                return response.text();
            });
    }

    function get(path, options)    { return request('GET',    path, null,  options); }
    function post(path, body, options) { return request('POST',   path, body,  options); }
    function put(path, body, options)  { return request('PUT',    path, body,  options); }
    function patch(path, body, options){ return request('PATCH',  path, body,  options); }
    function del(path, options)        { return request('DELETE', path, null,  options); }

    function getBookings(params) {
        var query = '';
        if (params) {
            var pairs = [];
            for (var k in params) pairs.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
            query = '?' + pairs.join('&');
        }
        return get('/bookings' + query);
    }

    function getDashboardMetrics() { return get('/dashboard/metrics'); }
    function getCustomers()         { return get('/customers'); }

    return {
        get: get, post: post, put: put, patch: patch, delete: del,
        getBookings: getBookings,
        getDashboardMetrics: getDashboardMetrics,
        getCustomers: getCustomers
    };
})();

window.ApiClient = ApiClient;
