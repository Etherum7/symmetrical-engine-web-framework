import { User } from "./models/User";

const UserCollection = User.buildUserCollection();

UserCollection.events.on("change", () => {
  console.log(UserCollection);
});
UserCollection.fetch();
