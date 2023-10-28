export abstract class Entity {
  public toJSON() {
    const jsonObj = {} as Record<string, any>;
    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        jsonObj[prop] = this[prop];
      }
    }
    return jsonObj;
  }
}
