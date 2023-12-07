import { expect } from "@playwright/test";
import { VALID_MODELS_RESPONSE } from "../../../../src/data/dict";
import { test } from "../../../../src/fixtures";

test.describe("/cars/models", () => {
  test("should return models", async ({ client }) => {
    const response = await client.cars.getCarsModels();

    expect(response.status).toEqual(200);
    expect(response.data).toEqual(VALID_MODELS_RESPONSE);
  });

  for (const model of VALID_MODELS_RESPONSE.data) {
    test(`should return model ${model.title} by id`, async ({ client }) => {
      const response = await client.cars.getModelsById(model.id);

      expect(response.status).toEqual(200);
      expect(response.data.data).toEqual(model);
    });
  }

  test("should return error for models by id", async ({ client }) => {
    const response = await client.cars.getModelsById(7777);

    expect(response.status).toEqual(404);
    expect(response.data).toEqual({
      message: "No car models found with this id",
      status: "error",
    });
  });
});
