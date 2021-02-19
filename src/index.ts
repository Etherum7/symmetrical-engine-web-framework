import { User } from "./models/User";

const user = User.buildUser({ id: 1 });

user.on("click", () => {
  console.log(1);
});
user.on("click", () => {
  console.log(1);
});

user.trigger("click");
console.log(user.get("name"));
