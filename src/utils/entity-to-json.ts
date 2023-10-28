export function entityToJSON(obj: Record<any, any>) {
  const jsonObj = {} as Record<string, any>;
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      jsonObj[prop] = obj[prop];
    }
  }
  return jsonObj;
}
