/**
 * Travela Admin — JS entry point
 * Loads every module in dependency order and boots the app.
 * All module files are self-registering on `window`.
 */

(function () {
  'use strict';

  // ── Core ──────────────────────────────────────────────────────────────────
  TravelaConfig;      // js/core/config.js     — runs on script load
  Helpers;            // js/core/helpers.js
  Animations;         // js/core/animations.js
  TravelaApp;         // js/core/app.js
  ApiClient;          // js/core/api.js
  Sanitize;           // js/core/sanitize.js
  Validation;         // js/core/validation.js

  // ── Stores ────────────────────────────────────────────────────────────────
  UiStore;            // js/store/uiStore.js
  ThemeStore;         // js/store/themeStore.js
  WidgetStore;        // js/store/widgetStore.js
  OfflineStore;       // js/store/offlineStore.js
  PerfMonitor;        // js/store/perfMonitor.js

  // ── Layout ────────────────────────────────────────────────────────────────
  Sidebar;            // js/layout/sidebar.js
  Header;             // js/layout/header.js
  Navigation;         // js/layout/navigation.js

  // ── Components ────────────────────────────────────────────────────────────
  Charts;             // js/components/charts.js
  Tables;             // js/components/tables.js
  Modals;             // js/components/modals.js
  Dropdowns;          // js/components/dropdowns.js
  Tabs;               // js/components/tabs.js
  Notifications;      // js/components/notifications.js
  Widgets;            // js/components/widgets.js

  // ── Pages ─────────────────────────────────────────────────────────────────
  Dashboard;          // js/pages/dashboard.js
  Vendors;            // js/pages/vendors.js
  Analytics;          // js/pages/analytics.js
  Bookings;           // js/pages/bookings.js
  Finance;            // js/pages/finance.js

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  ThemeStore.init();
  OfflineStore.init();
  Animations.initPageTransitions();
  Sidebar.init();
  Header.init();
  Navigation.init();
  Modals.init();
  Dropdowns.init();
  Tabs.init();
  Notifications.init();
  Widgets.init();
  Tables.init();
  Dashboard.init();
  Notifications.show({ message: 'Travela dashboard loaded', type: 'success' });
})();
