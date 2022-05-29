/**
 * subscriptions data format: 
 * { eventType: { id: callback } }
 */

class EventBus {
  constructor() {
    this.subscriptions = {}
  }

  subscribe(eventType, callback) {
    const id = Symbol();

    if (!this.subscriptions[eventType])
      this.subscriptions[eventType] = {};

    this.subscriptions[eventType][id] = callback;

    return { 
      unsubscribe: () => {
        delete this.subscriptions[eventType][id];
        if (Object.getOwnPropertySymbols(this.subscriptions[eventType]).length === 0) delete this.subscriptions[eventType];
      }
    }
  }

  publish(eventType, arg) {
    if (!this.subscriptions[eventType])
      return;

    Object.getOwnPropertySymbols(this.subscriptions[eventType]).forEach(key => this.subscriptions[eventType][key](arg));
  }
}

let eventBus = new EventBus();

export default eventBus;