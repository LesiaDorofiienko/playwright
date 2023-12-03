import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import axios, { AxiosInstance } from "axios";
import { config } from "../../config/config";

export class BaseController {
  readonly client: AxiosInstance;

  constructor(
    readonly baseUrl: string = config.apiURL,
    readonly jar: CookieJar = new CookieJar()
  ) {
    this.client = wrapper(
      axios.create({
        baseURL: this.baseUrl,
        jar,
        validateStatus: (status) => {
          return status < 501;
        },
      })
    );
  }
}
