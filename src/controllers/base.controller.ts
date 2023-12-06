import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import axios, { AxiosInstance } from "axios";
import { config } from "../../config/config";
import { ControllerOptions } from "../types";

export class BaseController {
  readonly client: AxiosInstance;

  constructor({ baseUrl, cookie }: ControllerOptions) {
    this.client = wrapper(
      axios.create({
        baseURL: baseUrl,
        jar: cookie,
        validateStatus: (status) => {
          return status < 501;
        },
      })
    );
  }
}
