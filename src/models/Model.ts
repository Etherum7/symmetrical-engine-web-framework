import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";
import { AxiosPromise } from "axios";

interface IAttributes<T> {
  get: <K extends keyof T>(propName: K) => T[K];
  getAll: () => T;
  set: (update: T) => void;
}
interface ISync<T> {
  fetch: (id: number) => AxiosPromise;
  save: (data: T) => AxiosPromise;
}
interface IEventing {
  on: (eventName: string, callback: () => void) => void;
  trigger: (eventName: string) => void;
}
interface HasId {
  id?: number;
}
export class Model<T extends HasId> {
  constructor(
    private attributes: IAttributes<T>,
    private sync: ISync<T>,
    private events: IEventing
  ) {}
  get get() {
    return this.attributes.get;
  }
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }
  set(update: T) {
    this.attributes.set(update);
    this.events.trigger("change");
  }
  async fetch() {
    const id = this.attributes.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }
    const response = await this.sync.fetch(id);
    this.set(response.data);
  }

  async save() {
    const obj = this.attributes.getAll();
    try {
      await this.sync.save(obj);
      this.trigger("save");
    } catch (err) {
      this.trigger("error");
    }
  }
}
