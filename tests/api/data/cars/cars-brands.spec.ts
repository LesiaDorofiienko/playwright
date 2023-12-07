import { expect } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../../../src/data/dict";
import { test } from "../../../../src/fixtures";

test.describe("/cars/brands", () => {
  test("should return brands", async ({ client }) => {
    const response = await client.cars.getBrands();

    expect(response.status).toEqual(200);
    expect(response.data).toEqual(VALID_BRANDS_RESPONSE_BODY);
  });

  for (const brand of VALID_BRANDS_RESPONSE_BODY.data) {
    test(`should return brand ${brand.title} by id`, async ({ client }) => {
      const response = await client.cars.getBrandById(brand.id);

      expect(response.status).toEqual(200);
      expect(response.data.data).toEqual(brand);
    });
  }

  test("should return error for brand by id", async ({ client }) => {
    const response = await client.cars.getBrandById(777);

    expect(response.status).toEqual(404);
    expect(response.data).toEqual({
      message: "No car brands found with this id",
      status: "error",
    });
  });
});
