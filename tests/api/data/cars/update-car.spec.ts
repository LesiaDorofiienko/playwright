import { expect } from "@playwright/test";
import {
  VALID_BRANDS_RESPONSE_BODY,
  VALID_BRAND_MODELS,
} from "../../../../src/data/dict";
import { test } from "../../../../src/fixtures";
import { CreateCarModel } from "../../../../src/models";

test.describe("update /cars/", () => {
  const brand = VALID_BRANDS_RESPONSE_BODY.data[0];
  const model = VALID_BRAND_MODELS[brand.id].data[1];
  const carModel = new CreateCarModel({
    carBrandId: brand.id,
    carModelId: model.id,
    mileage: 122,
  });

  test("should update car", async ({ clientWithNewUser }) => {
    const expectedBody = {
      ...carModel,
      initialMileage: carModel.mileage,
      id: expect.any(Number),
      carCreatedAt: expect.any(String),
      updatedMileageAt: expect.any(String),
      brand: brand.title,
      model: model.title,
      logo: brand.logoFilename,
    };
    const res = await clientWithNewUser.cars.createCar(carModel);
    const carId = res.data.data.id as number;
    const mileage = 444;
    const response = await clientWithNewUser.cars.updateCarsById(carId, {
      mileage,
    });

    expect(response.status).toEqual(200);
    expect(response.data.status).toEqual("ok");
    expect(response.data.data).toEqual({ ...expectedBody, mileage });
  });

  test("should return error for update car", async ({ clientWithNewUser }) => {
    const res = await clientWithNewUser.cars.createCar(carModel);
    const carId = res.data.data.id as number;
    const mileage = "wow";
    const response = await clientWithNewUser.cars.updateCarsById(carId, {
      mileage,
    });

    expect(response.status).toEqual(400);
    expect(response.data).toEqual({
      message: "No valid fields to edit",
      status: "error",
    });
  });
});
