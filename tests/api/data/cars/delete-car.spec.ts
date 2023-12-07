import { expect } from "@playwright/test";
import {
  VALID_BRANDS_RESPONSE_BODY,
  VALID_BRAND_MODELS,
} from "../../../../src/data/dict";
import { test } from "../../../../src/fixtures";
import { CreateCarModel } from "../../../../src/models";

test.describe("delete /cars/", () => {
  test("should delete car", async ({ clientWithNewUser }) => {
    const brand = VALID_BRANDS_RESPONSE_BODY.data[0];
    const model = VALID_BRAND_MODELS[brand.id].data[1];
    const carModel = new CreateCarModel({
      carBrandId: brand.id,
      carModelId: model.id,
      mileage: 122,
    });
    const res = await clientWithNewUser.cars.createCar(carModel);
    const carId = res.data.data.id as number;
    const response = await clientWithNewUser.cars.deleteCarById(carId);

    expect(response.status).toEqual(200);
    expect(response.data.status).toEqual("ok");
    expect(response.data.data).toEqual({ carId });
  });

  test("should return error for delete car", async ({ clientWithNewUser }) => {
    const response = await clientWithNewUser.cars.deleteCarById(
      "wwwwww" as unknown as number
    );

    expect(response.status).toEqual(500);
    expect(response.data).toEqual({
      message: "Unknown column 'NaN' in 'where clause'",
      status: "error",
    });
  });
});
