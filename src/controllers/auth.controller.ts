import { CookieJar } from "tough-cookie";
import { BaseController } from "./base.controller";
import { ControllerOptions, SignInData, SignUpData } from "../types";

export class AuthController extends BaseController {
  private readonly signInPath = "/auth/signin";
  private readonly signUpPath = "/auth/signup";

  constructor(options?: ControllerOptions) {
    super(options);
  }

  async signUp(data: SignUpData) {
    return this.client.post(this.signUpPath, {
      ...data,
      repeatPassword: data.password,
    });
  }

  async signIn({ email, password, remember = false }: SignInData) {
    return this.client.post(this.signInPath, {
      email,
      password,
      remember,
    });
  }
}
