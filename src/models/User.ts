import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";

import { Model } from "./Model";
import { Collection } from "./Collection";
export interface IUserProps {
  name?: string;
  age?: number;
  id?: number;
}
//type alias

export class User extends Model<IUserProps> {
  static buildUser(data: IUserProps): User {
    return new User(
      new Attributes(data),
      new Sync("http://localhost:3000"),
      new Eventing()
    );
  }
  static buildUserCollection(): Collection<
    User,
    IUserProps
  > {
    return new Collection<User, IUserProps>(
      "http://localhost:3000/users",
      (json: IUserProps) => User.buildUser(json)
    );
  }
}
const user = User.buildUser({});
