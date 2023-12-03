import { CookieJar } from "tough-cookie";
import { BaseController } from "./base.controller";

export class UserController extends BaseController {
  private readonly deleteUserPath = "/users";

  constructor(baseUrl: string, jar?: CookieJar) {
    super(baseUrl, jar);
  }

  async deleteCurrentUser() {
    return this.client.delete(this.deleteUserPath);
  }
}
