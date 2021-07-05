function replacer(char) {
  var radix = Math.random() * 16 | 0;
  if (char !== 'x')
    radix = (radix & 0x3) | 0x8;
  return radix.toString(16);
}

export default class Guid {
  static newGuid = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, replacer);
}