export class Attributes<T> {
  constructor(private data: T) {
    this.get = this.get.bind(this);
  }

  get = <K extends keyof T>(propName: K): T[K] => {
    return this.data[propName];
  };
  getAll = (): T => {
    return this.data;
  };
  set(update: T): void {
    //Partial<IUserProps>
    Object.assign(this.data, update);
  }
}
