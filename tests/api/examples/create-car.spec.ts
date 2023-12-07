import { expect, test } from "@playwright/test";
import { APIClient } from "../../../src/client";
import {
  USERS,
  VALID_BRANDS_RESPONSE_BODY,
  VALID_BRAND_MODELS,
} from "../../../src/data/dict";
import { CreateCarModel } from "../../../src/models";

test.describe("Cars", () => {
  let client: APIClient;

  test.beforeAll(async () => {
    client = await APIClient.authenticate({
      email: USERS.lesia.email,
      password: USERS.lesia.password,
      remember: false,
    });
  });

  test("should create car with valid data", async () => {
    const carModel = new CreateCarModel({
      carBrandId: 1,
      carModelId: 1,
      mileage: 22,
    });
    const brand = VALID_BRANDS_RESPONSE_BODY.data.find(
      (brand) => brand.id === carModel.carBrandId
    );
    const model =
      brand &&
      VALID_BRAND_MODELS[brand.id].data.find(
        (model) => model.id === carModel.carModelId
      );
    const response = await client.cars.createCar(carModel);

    const expectedBody = {
      ...carModel,
      initialMileage: carModel.mileage,
      id: expect.any(Number),
      carCreatedAt: expect.any(String),
      updatedMileageAt: expect.any(String),
      brand: brand?.title,
      model: model.title,
      logo: brand?.logoFilename,
    };
    expect(response.data.data, "Returned car object should ba valid").toEqual(
      expectedBody
    );
  });
});
