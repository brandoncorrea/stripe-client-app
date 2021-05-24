function getObjectEncoding(prefix, obj) {
  var params = [];

  for (var property in obj) {
    var key = prefix + '[' + encodeURIComponent(property) + ']';
    var value = encodeURIComponent(obj[property]);
    if (value.length > 0)
      params.push(key + "=" + value);
  }

  return params.join("&");
}

function getEncoding(property, obj) {
  var key = encodeURIComponent(property);
  var value = encodeURIComponent(obj[property]);

  if (typeof(obj[property]) === 'object')
    return getObjectEncoding(property, obj);
  else if (value.length > 0)
    return key + "=" + value;
  return '';
}

export function encodeURI(obj) {
  var params = [];
  for (var property in obj)
    params.push(getEncoding(property, obj));
  return params.join("&");
}