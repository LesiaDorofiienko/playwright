import { expect, test } from "@playwright/test";
import { APIClient } from "../../../../src/client";
import { SignUpModel } from "../../../../src/models";
import { SignUpSchema } from "../../../../src/schema";

test.describe.skip("Auth", () => {
  let client = new APIClient();

  test.beforeAll(async ({}) => {});

  test.afterEach(async () => {
    await client.users.deleteCurrentUser();
  });

  test("should allow registration with valid data", async () => {
    const data = SignUpModel.withRandomData()
      .setName("Lesia")
      .setLastName("Dorofiienko")
      .extract();
    let userId: number;

    await test.step("Sign up", async () => {
      const response = await client.auth.signUp(data);

      expect(response.status).toBe(201);

      SignUpSchema.parse(response.data.data);

      const expectedBody = {
        userId: expect.any(Number),
        distanceUnits: "km",
        photoFilename: "default-user.png",
        currency: "usd",
      };
      expect(response.data.data, "Response should ba valid").toEqual(
        expectedBody
      );
      userId = response.data.data.userId;
    });

    await test.step("Get user info", async () => {
      client = await APIClient.authenticate({
        email: data.email,
        password: data.password,
      });

      const profileInfoResponse = await client.users.getUserProfileInfo();

      const expectedResponse = {
        status: "ok",
        data: {
          userId: userId,
          photoFilename: "default-user.png",
          name: data.name,
          lastName: data.lastName,
        },
      };

      expect(profileInfoResponse.data).toEqual(expectedResponse);
    });
  });
});
