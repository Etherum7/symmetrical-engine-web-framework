import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

export class Collection<T, K> {
  constructor(
    public rootUrl: string,
    public deserialize: (data: K) => T
  ) {}

  models: T[] = [];
  events: Eventing = new Eventing();
  async fetch() {
    const response: AxiosResponse = await axios.get(
      this.rootUrl
    );
    response.data.forEach((user: K) => {
      this.models.push(this.deserialize(user));
    });
    this.events.trigger("change");
  }
}
