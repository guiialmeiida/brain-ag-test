//import { CultivatedCropsType } from "@domain/value-objects/CultivatedCrops";

import { CultivatedCrops } from "@prisma/client";

export class InvalidCultivatedCropsError extends Error {
  constructor(value: string) {
    super(
      `Planting '${value}' is not valid. Valid plantings: ${Object.values(
        CultivatedCrops
      ).join(", ")}`
    );
    this.name = "InvalidCultivatedCropsError";
  }
}
