import axios, { AxiosInstance } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { test } from "../../src/fixtures";
import { expect } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../src/data/dict/models.js";
import { config } from "../../config/config.js";
import { USERS } from "../../src/data/dict/users.js";

test.describe("API /api/cars", () => {
  let client: AxiosInstance;

  test.beforeAll(async () => {
    const jar = new CookieJar();
    client = wrapper(
      axios.create({
        baseURL: config.apiURL,
        jar,
        validateStatus: (status) => {
          return status < 501;
        },
      })
    );

    await client.post("/auth/signin", {
      email: USERS.lesia.email,
      password: USERS.lesia.password,
      remember: false,
    });
  });

  test("should create new car", async () => {
    const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id;
    const modelId = VALID_BRAND_MODELS[brandId].data[1].id;

    const data = {
      carBrandId: brandId,
      carModelId: modelId,
      mileage: 122,
    };

    const response = await client.post("/cars", data);

    expect(response.status).toEqual(201);
    expect(response.data.status).toEqual("ok");
    expect(response.data.data).toMatchObject(data);
  });

  test("should return 404 for invalid brand id", async () => {
    const data = {
      carBrandId: 666,
      carModelId: 666,
      mileage: 122,
    };

    const response = await client.post("/cars", data);

    expect(response.status).toEqual(404);
    expect(response.data.status).toBe("error");
    expect(response.data.message).toBe("Brand not found");
  });

  test("should return 400 for invalid data", async () => {
    const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id;
    const modelId = VALID_BRAND_MODELS[brandId].data[1].id;

    const data = {
      carBrandId: brandId,
      carModelId: modelId,
    };

    const response = await client.post("/cars", data);

    expect(response.status).toEqual(400);
    expect(response.data.status).toBe("error");
    expect(response.data.message).toBe("Mileage is required");
  });
});
