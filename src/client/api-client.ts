import { AuthController, CarController, UserController } from "../controllers";
import { CookieJar } from "tough-cookie";
import { config } from "../../config/config.js";
import { ControllerOptions, SignInData } from "../types";

export class APIClient {
  readonly auth: AuthController;
  readonly cars: CarController;
  readonly users: UserController;

  constructor(options: ControllerOptions) {
    this.auth = new AuthController(options);
    this.cars = new CarController(options);
    this.users = new UserController(options);
  }

  static async authenticate(
    userData: SignInData,
    { baseUrl = config.baseURL, cookie = new CookieJar() }: ControllerOptions
  ) {
    const options: ControllerOptions = { baseUrl, cookie };
    const authController = new AuthController(options);

    await authController.signIn(userData);

    return new APIClient(options);
  }
}
