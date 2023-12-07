import { CookieJar } from "tough-cookie";
import { BaseController } from "./base.controller";
import { ControllerOptions } from "../types";

export class UserController extends BaseController {
  private readonly deleteUserPath = "/users";

  private readonly userProfilePath = "/users/profile";
  constructor(options?: ControllerOptions) {
    super(options);
  }

  getUserProfileInfo() {
    return this.client.get(this.userProfilePath);
  }

  deleteCurrentUser() {
    return this.client.delete(this.deleteUserPath);
  }
}
