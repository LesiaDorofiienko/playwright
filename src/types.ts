import { CookieJar } from "tough-cookie";

export type ControllerOptions = {
  baseUrl: string;
  cookie: CookieJar;
};

export type SignInData = {
  email: string;
  password: string;
  remember?: boolean;
};

export type SignUpData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};
export type CreateCarData = {
  carBrandId: number;
  carModelId: number;
  mileage: number;
};
