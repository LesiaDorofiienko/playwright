export type User = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

type UserKey = "lesia";

export const USERS = Object.freeze<Record<UserKey, User>>({
  lesia: {
    name: "Lesia",
    lastName: "Dorofiienko",
    email: "aqa-lesia-test@test.com",
    password: "YourName123",
  },
});
