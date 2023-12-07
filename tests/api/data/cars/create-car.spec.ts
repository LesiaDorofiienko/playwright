import { expect } from "@playwright/test";
import {
  VALID_BRANDS_RESPONSE_BODY,
  VALID_BRAND_MODELS,
} from "../../../../src/data/dict";
import { test } from "../../../../src/fixtures";
import { CreateCarModel } from "../../../../src/models";

test.describe("create /cars/", () => {
  // No point to move non-dynamic data (i.e. constants) to before/after hooks
  const brand = VALID_BRANDS_RESPONSE_BODY.data[0];
  const model = VALID_BRAND_MODELS[brand.id].data[1];
  const carModel = new CreateCarModel({
    carBrandId: brand.id,
    carModelId: model.id,
    mileage: 122,
  });

  test("should create car", async ({ clientWithNewUser }) => {
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

    const response = await clientWithNewUser.cars.createCar(carModel);

    expect(response.status).toEqual(201);
    expect(response.data.status).toEqual("ok");
    expect(response.data.data).toEqual(expectedBody);
  });

  test("should return 400 for invalid data", async ({ clientWithNewUser }) => {
    const response = await clientWithNewUser.cars.createCar({
      ...carModel,
      mileage: undefined,
    });

    expect(response.status).toEqual(400);
    expect(response.data.status).toBe("error");
    expect(response.data.message).toBe("Mileage is required");
  });
});
