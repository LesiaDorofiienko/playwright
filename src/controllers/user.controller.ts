import { CookieJar } from "tough-cookie";
import { BaseController } from "./base.controller";
import { ControllerOptions } from "../types";

export class UserController extends BaseController {
  private readonly deleteUserPath = "/users";

  constructor(options: ControllerOptions) {
    super(options);
  }

  async deleteCurrentUser() {
    return this.client.delete(this.deleteUserPath);
  }
}
