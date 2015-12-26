export default function(object, filter) {
  let filtered = {};
  for(const prop in object) {
    if(filter(object[prop])) {
      filtered[prop] = object[prop];
    }
  }
  return filtered;
}
