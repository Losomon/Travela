var TravelaConfig = {
    appName: 'Travela',
    apiBaseUrl: '/api',
    version: '1.0.0',
    features: {
        aiInsights: true,
        commandPalette: true,
        notifications: true,
        darkMode: true,
        realTimeUpdates: true,
        exportReports: true,
        collaboration: false
    },
    defaults: {
        pageSize: 25,
        refreshInterval: 30000,
        themes: ['light', 'dark', 'luxury']
    },
    cssSelector: {
        sidebar: '.smart-sidebar',
        commandPalette: '#commandPalette'
    },
    chartColors: {
        primary: '#6366f1',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
        purple: '#8b5cf6',
        pink: '#ec4899',
        gray: '#94a3b8'
    },
    tableDefaults: {
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 25, 50, 100],
        sortable: true,
        searchable: true,
        responsive: true
    },
    notificationDefaults: {
        duration: 5000,
        position: 'top-right',
        maxStack: 5,
        animate: true
    }
};

TravelaConfig.getApiUrl = function(endpoint) {
    return this.apiBaseUrl + (this.api.endpoints[endpoint] || endpoint);
};
TravelaConfig.get = function(path, defaultValue) {
    var keys = path.split('.');
    var value = this;
    for (var i = 0; i < keys.length; i++) {
        if (value && typeof value === 'object' && keys[i] in value) value = value[keys[i]];
        else return defaultValue;
    }
    return value;
};
TravelaConfig.isFeatureEnabled = function(feature) {
    return this.features[feature] === true;
};