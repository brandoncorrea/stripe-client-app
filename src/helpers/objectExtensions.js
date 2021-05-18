Object.defineProperty(Object.prototype, "encodeURI", {
  value: function encodeURI() {
    var params = [];

    for (var property in this) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(this[property]);
      params.push(encodedKey + "=" + encodedValue);
    }
    
    return params.join("&");
  },
  writable: true,
  configurable: true
});