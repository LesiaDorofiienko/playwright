import { expect } from "@playwright/test";
import {
  VALID_BRANDS_RESPONSE_BODY,
  VALID_BRAND_MODELS,
} from "../../../../src/data/dict";
import { test } from "../../../../src/fixtures";
import { CreateCarModel } from "../../../../src/models";

test.describe("get /cars/", () => {
  const brand = VALID_BRANDS_RESPONSE_BODY.data[0];
  const model = VALID_BRAND_MODELS[brand.id].data[1];
  const carModel = new CreateCarModel({
    carBrandId: brand.id,
    carModelId: model.id,
    mileage: 122,
  });
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

  test("should return user cars", async ({ clientWithNewUser }) => {
    await clientWithNewUser.cars.createCar(carModel);

    const response = await clientWithNewUser.cars.getUserCars();

    expect(response.status).toEqual(200);
    expect(response.data.status).toEqual("ok");
    expect(response.data.data).toHaveLength(1);
    expect(response.data.data[0]).toEqual(expectedBody);
  });

  test("should return user car by id", async ({ clientWithNewUser }) => {
    const res = await clientWithNewUser.cars.createCar(carModel);
    const carId = res.data.data.id as number;
    const response = await clientWithNewUser.cars.getCarById(carId);

    expect(response.status).toEqual(200);
    expect(response.data.status).toEqual("ok");
    expect(response.data.data).toEqual(expectedBody);
  });

  test("should return error for user car by id", async ({
    clientWithNewUser,
  }) => {
    const response = await clientWithNewUser.cars.getCarById(666);

    expect(response.status).toEqual(404);
    expect(response.data).toEqual({
      message: "Car not found",
      status: "error",
    });
  });
});
