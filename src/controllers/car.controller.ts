import { CookieJar } from "tough-cookie";
import { BaseController } from "./base.controller";

export class CarController extends BaseController {
  private readonly deleteUserCarsPath = "/cars/#";
  private readonly getBrandPath = "/cars/models?carBrandId={id}";

  private readonly getCarsBrandsPath = "/cars/brands";
  private readonly getCarsBrandsIdPath = "/cars/brands/{id}";

  private readonly getCarsModelsPath = "/cars/models";
  private readonly getCarsModelsIdPath = "/cars/models/{id}";

  private readonly createCarPath = "/cars";
  private readonly getUserCarsPath = "/cars";
  private readonly getCarByIdPath = "/cars/{id}";
  private readonly updateCarBydIdPath = "/cars/{id}";
  private readonly deleteCarIdPath = "/cars/{id}";

  constructor(baseUrl: string, jar?: CookieJar) {
    super(baseUrl, jar);
  }

  async createCar(carData) {
    return this.client.post(this.createCarPath, carData);
  }

  async getUserCars() {
    return this.client.get(this.getUserCarsPath);
  }

  async getBrand(id: number) {
    return this.client(this.getBrandPath.replace("{id}", String(id)));
  }

  async deleteCar(id: string) {
    return this.client.delete(this.deleteUserCarsPath.replace("#", id));
  }

  // =========================================================================================================
  getBrands() {
    return this.client.get(this.getCarsBrandsPath);
  }

  getBrandById(id: number) {
    return this.client.get(
      this.getCarsBrandsIdPath.replace("{id}", String(id))
    );
  }

  getCarsModels() {
    return this.client.get(this.getCarsModelsPath);
  }

  getModelsById(id: number) {
    return this.client.get(
      this.getCarsModelsIdPath.replace("{id}", String(id))
    );
  }

  createCarsById() {
    return this.client.put(this.updateCarBydIdPath);
  }

  getCarById(id: number) {
    return this.client.get(this.getCarByIdPath.replace("{id}", String(id)));
  }

  updateCarsById(id: number, carData) {
    return this.client.put(
      this.getCarByIdPath.replace("{id}", String(id)),
      carData
    );
  }

  deleteCarById(id: number) {
    return this.client.delete(this.deleteCarIdPath.replace("{id}", String(id)));
  }
}
