import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import axios, { AxiosInstance } from "axios";
import { config } from "../../config/config";
import { ControllerOptions } from "../types";

export class BaseController {
  readonly client: AxiosInstance;

  constructor(options?: ControllerOptions) {
    this.client = wrapper(
      axios.create({
        baseURL: options?.baseUrl ?? config.apiURL,
        jar: options?.cookie ?? new CookieJar(),
        validateStatus: (status) => {
          return status < 501;
        },
      })
    );
  }
}
