var App = {
    init: function () {
        window.dispatchEvent(new CustomEvent('AppReady', { detail: { config: TravelaConfig } }));
    },
    ready: function (fn) {
        if (fn) window.addEventListener('AppReady', fn);
    },
    dispatch: function (name, detail) {
        window.dispatchEvent(new CustomEvent(name, { detail: detail }));
    }
};
window.TravelaApp = App;