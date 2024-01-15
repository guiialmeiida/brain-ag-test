import { InvalidCultivatedCropsError } from "@domain/errors/InvalidCultivatedCropsError";
import { CultivatedCrops } from "@prisma/client";
import { Either, left, right } from "src/shared/either";

export class CultivatedCropsValidator {
  private readonly value: string[];

  constructor(cultivatedCrops: string[]) {
    this.value = cultivatedCrops;
  }

  public getValue(): string[] {
    return this.value;
  }

  public static execute(cultivatedCrops: string[]): Either<InvalidCultivatedCropsError, CultivatedCrops[]> {
    const validCrops: CultivatedCrops[] = [];
    for (const crop of cultivatedCrops) {
      if (!Object.values(CultivatedCrops).includes(crop as unknown as CultivatedCrops)) {
        return left(new InvalidCultivatedCropsError(crop));
      }
      validCrops.push(crop as unknown as CultivatedCrops);
    }
    return right(validCrops);
  }
}
