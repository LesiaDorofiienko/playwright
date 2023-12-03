import { CookieJar } from "tough-cookie";
import { BaseController } from "./base.controller";

export class AuthController extends BaseController {
  private readonly signInPath = "/auth/signin";
  private readonly signUpPath = "/auth/signup";

  constructor(baseUrl: string, jar?: CookieJar) {
    super(baseUrl, jar);
  }

  async signUp(userData) {
    return this.client.post(this.signUpPath, userData);
  }

  async signIn({ email, password, remember = false }) {
    return this.client.post(this.signInPath, {
      email,
      password,
      remember,
    });
  }
}
