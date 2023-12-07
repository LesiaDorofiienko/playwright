import { faker } from "@faker-js/faker";
import { SignUpData } from "../../types";

export class SignUpModel {
  private readonly data: SignUpData;

  constructor(data: SignUpData) {
    this.data = data;
  }

  extract() {
    return structuredClone(this.data);
  }

  setName(name: string) {
    this.data.name = name;
    return this;
  }

  setLastName(name: string) {
    this.data.lastName = name;
    return this;
  }

  static withRandomData() {
    return new SignUpModel({
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12, prefix: "AQA_" }),
    });
  }
}
