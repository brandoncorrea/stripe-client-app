export function encodeURI(obj) {
  var params = [];

  for (var property in obj) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(obj[property]);
    params.push(encodedKey + "=" + encodedValue);
  }
  
  return params.join("&");
}