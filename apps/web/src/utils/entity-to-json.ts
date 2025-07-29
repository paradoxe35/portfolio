export function entityToJSON(obj: Record<any, any>) {
  const jsonObj = {} as Record<string, any>;
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      jsonObj[prop] = obj[prop] || null;
    }
  }
  return jsonObj;
}

export function entitiesToJSON(objs: Record<any, any>[]) {
  return objs.map((obj) => entityToJSON(obj));
}
