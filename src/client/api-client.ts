import { AuthController, CarController, UserController } from "../controllers";
import { CookieJar } from "tough-cookie";
import { config } from "../../config/config.js";
import { ControllerOptions, SignInData } from "../types";

export class APIClient {
  readonly auth: AuthController;
  readonly cars: CarController;
  readonly users: UserController;

  constructor(options?: ControllerOptions) {
    this.auth = new AuthController(options);
    this.cars = new CarController(options);
    this.users = new UserController(options);
  }

  static async authenticate(userData: SignInData, options?: ControllerOptions) {
    const apiClient = new APIClient({
      baseUrl: options?.baseUrl ?? config.apiURL,
      cookie: options?.cookie ?? new CookieJar(),
    });

    await apiClient.auth.signIn(userData);

    return apiClient;
  }
}
