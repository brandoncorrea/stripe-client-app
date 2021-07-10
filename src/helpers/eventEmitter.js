export default class EventEmitter {
  static events = {};

  // Executes all callbacks associated with an event
  static dispatch(event, data) {
    if (!this.events[event]) 
      return;

    this.events[event]
    .forEach(callback =>
      callback(data));
  }

  // Attaches a callback to an event
  static subscribe(event, callback) {
    if (!this.events[event]) 
      this.events[event] = [];
    this.events[event].push(callback);
  }

  // Removes a callback from an event
  static unsubscribe(event, callback) {
    if (!this.events[event])
      return;
    this.events[event] = this.events[event].filter(i => i !== callback);
  }
}