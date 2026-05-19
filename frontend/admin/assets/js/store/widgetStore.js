class WidgetStore {
  state = {
    widgets: {},
    widgetOrder: [],
  };

  _listeners = [];

  subscribe(fn) {
    this._listeners.push(fn);
    return () => {
      this._listeners = this._listeners.filter(l => l !== fn);
    };
  }

  _notify() {
    this._listeners.forEach(fn => fn(this.state));
  }

  register(id, config) {
    if (!this.state.widgets[id]) {
      this.state.widgets[id] = config;
      this.state.widgetOrder.push(id);
    }
    this._notify();
  }

  unregister(id) {
    delete this.state.widgets[id];
    this.state.widgetOrder = this.state.widgetOrder.filter(w => w !== id);
    this._notify();
  }

  update(id, data) {
    if (this.state.widgets[id]) {
      Object.assign(this.state.widgets[id], data);
      this._notify();
    }
  }

  get(id) {
    return this.state.widgets[id];
  }

  reorder(newOrder) {
    this.state.widgetOrder = newOrder;
    this._notify();
  }
}

window.WidgetStore = new WidgetStore();
