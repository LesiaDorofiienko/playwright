import { AuthController, CarController, UserController } from "../controllers";
import { CookieJar } from "tough-cookie";
import { config } from "../../config/config.js";

export class APIClient {
  readonly auth: AuthController;
  readonly cars: CarController;
  readonly users?: UserController;

  constructor(baseUrl: string, jar?: CookieJar) {
    this.auth = new AuthController(baseUrl, jar);
    this.cars = new CarController(baseUrl, jar);
  }

  static async authenticate(baseUrl = config.apiURL, userData) {
    const jar = new CookieJar();
    const authController = new AuthController(baseUrl, jar);

    await authController.signIn(userData);

    return new APIClient(baseUrl, jar);
  }
}
