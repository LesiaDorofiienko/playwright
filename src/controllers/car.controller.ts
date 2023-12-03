import { CookieJar } from "tough-cookie";
import { BaseController } from "./base.controller";

export class CarController extends BaseController {
  private readonly createCarPath = "/cars";
  private readonly getUserCarsPath = "/cars";
  private readonly deleteUserCarsPath = "/cars/#";
  private readonly getBrandPath = "/cars/models?carBrandId=";

  constructor(baseUrl: string, jar?: CookieJar) {
    super(baseUrl, jar);
  }

  async createCar(carData) {
    return this.client.post(this.createCarPath, carData);
  }

  async getUserCars() {
    return this.client.get(this.getUserCarsPath);
  }

  async getBrand(brandId: number) {
    return this.client(this.getBrandPath + brandId);
  }

  async deleteCar(id: string) {
    return this.client.delete(this.deleteUserCarsPath.replace("#", id));
  }
}
