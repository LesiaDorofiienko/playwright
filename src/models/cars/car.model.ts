import { CreateCarData } from "../../types";

export class CreateCarModel {
  readonly carBrandId: number;
  readonly carModelId: number;
  readonly mileage: number;

  constructor({ carBrandId, carModelId, mileage }: CreateCarData) {
    this.carBrandId = carBrandId;
    this.carModelId = carModelId;
    this.mileage = mileage;
  }
}
