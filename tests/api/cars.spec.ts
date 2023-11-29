import { test } from "../../src/fixtures";
import { expect } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../src/data/dict/models.js";

test.describe("API /api/cars", () => {
  test("should create new car", async ({ userAPIClient }) => {
    const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id;
    const modelId = VALID_BRAND_MODELS[brandId].data[1].id;

    const requestBody = {
      carBrandId: brandId,
      carModelId: modelId,
      mileage: 122,
    };

    const response = await userAPIClient.post("/api/cars", {
      data: requestBody,
    });
    const body = await response.json();

    await expect(response, "Positive response should be returned").toBeOK();

    expect(response.status(), "Status code should be 200").toEqual(201);
    expect(body.status).toBe("ok");
    expect(
      body.data,
      "Car should be created with data from request"
    ).toMatchObject(requestBody);
  });

  test("should return 404 for invalid brand id", async ({ userAPIClient }) => {
    const requestBody = {
      carBrandId: 666,
      carModelId: 666,
      mileage: 122,
    };

    const response = await userAPIClient.post("/api/cars", {
      data: requestBody,
    });
    const body = await response.json();

    expect(response.status()).toEqual(404);
    expect(body.status).toBe("error");
    expect(body.message).toBe("Brand not found");
  });

  test("should return 400 for invalid data", async ({ userAPIClient }) => {
    const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id;
    const modelId = VALID_BRAND_MODELS[brandId].data[1].id;

    const requestBody = {
      carBrandId: brandId,
      carModelId: modelId,
    };

    const response = await userAPIClient.post("/api/cars", {
      data: requestBody,
    });
    const body = await response.json();

    expect(response.status()).toEqual(400);
    expect(body.status).toBe("error");
    expect(body.message).toBe("Mileage is required");
  });
});
