import { test } from "../../src/fixtures/";
import { expect } from "@playwright/test";
import {
  VALID_BRANDS_RESPONSE_BODY,
  VALID_BRAND_MODELS,
  VALID_MODELS_RESPONSE,
} from "../../src/data/dict";

test.describe("API /cars", () => {
  test.describe("/cars/brands", () => {
    test("should return brands", async ({ client }) => {
      const response = await client.cars.getBrands();

      expect(response.status).toEqual(200);
      expect(response.data).toEqual(VALID_BRANDS_RESPONSE_BODY);
    });

    test("should return brand by id", async ({ client }) => {
      const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id;
      const response = await client.cars.getBrandById(brandId);

      expect(response.status).toEqual(200);
      expect(response.data.data).toEqual(VALID_BRANDS_RESPONSE_BODY.data[0]);
    });

    test("should return error for brand by id", async ({ client }) => {
      const response = await client.cars.getBrandById(777);

      expect(response.status).toEqual(404);
      expect(response.data).toEqual({
        message: "No car brands found with this id",
        status: "error",
      });
    });
  });

  test.describe("/cars/models", () => {
    test("should return models", async ({ client }) => {
      const response = await client.cars.getCarsModels();

      expect(response.status).toEqual(200);
      expect(response.data).toEqual(VALID_MODELS_RESPONSE);
    });

    test("should return model by id", async ({ client }) => {
      const modelId = VALID_MODELS_RESPONSE.data[0].id;
      const response = await client.cars.getModelsById(modelId);

      expect(response.status).toEqual(200);
      expect(response.data.data).toEqual(VALID_MODELS_RESPONSE.data[0]);
    });

    test("should return error for models by id", async ({ client }) => {
      const response = await client.cars.getModelsById(7777);

      expect(response.status).toEqual(404);
      expect(response.data).toEqual({
        message: "No car models found with this id",
        status: "error",
      });
    });
  });

  test.describe("/cars/", () => {
    const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id;
    const modelId = VALID_BRAND_MODELS[brandId].data[1].id;
    const validCarData = {
      carBrandId: brandId,
      carModelId: modelId,
      mileage: 122,
    };

    test("should create car", async ({ clientWithNewUser }) => {
      const response = await clientWithNewUser.cars.createCar(validCarData);

      expect(response.status).toEqual(201);
      expect(response.data.status).toEqual("ok");
      expect(response.data.data).toMatchObject(validCarData);
    });

    test("should return 400 for invalid data", async ({
      clientWithNewUser,
    }) => {
      const data = {
        carBrandId: brandId,
        carModelId: modelId,
      };

      const response = await clientWithNewUser.cars.createCar(data);

      expect(response.status).toEqual(400);
      expect(response.data.status).toBe("error");
      expect(response.data.message).toBe("Mileage is required");
    });

    test("should return user cars", async ({ clientWithNewUser }) => {
      await clientWithNewUser.cars.createCar(validCarData);

      const response = await clientWithNewUser.cars.getUserCars();

      expect(response.status).toEqual(200);
      expect(response.data.status).toEqual("ok");
      expect(response.data.data[0]).toMatchObject(validCarData);
    });

    test("should return user car by id", async ({ clientWithNewUser }) => {
      const res = await clientWithNewUser.cars.createCar(validCarData);
      const carId = res.data.data.id as number;
      const response = await clientWithNewUser.cars.getCarById(carId);

      expect(response.status).toEqual(200);
      expect(response.data.status).toEqual("ok");
      expect(response.data.data).toMatchObject(validCarData);
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

    test("should update car", async ({ clientWithNewUser }) => {
      const res = await clientWithNewUser.cars.createCar(validCarData);
      const carId = res.data.data.id as number;
      const mileage = 444;
      const response = await clientWithNewUser.cars.updateCarsById(carId, {
        mileage,
      });

      expect(response.status).toEqual(200);
      expect(response.data.status).toEqual("ok");
      expect(response.data.data).toMatchObject({ ...validCarData, mileage });
    });

    test("should return error for update car", async ({
      clientWithNewUser,
    }) => {
      const res = await clientWithNewUser.cars.createCar(validCarData);
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

    test("should delete car", async ({ clientWithNewUser }) => {
      const res = await clientWithNewUser.cars.createCar(validCarData);
      const carId = res.data.data.id as number;
      const response = await clientWithNewUser.cars.deleteCarById(carId);

      expect(response.status).toEqual(200);
      expect(response.data.status).toEqual("ok");
      expect(response.data.data).toEqual({ carId });
    });

    test("should return error for delete car", async ({
      clientWithNewUser,
    }) => {
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
});
