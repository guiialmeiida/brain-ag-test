import { SaveProducerError } from "@adapters/driven/errors";
import { ProducerEntity } from "@domain/entities/ProducerEntity";
import { InvalidCpfCnpjError, InvalidCultivatedCropsError, InvalidFarmAreaError } from "@domain/errors";
import { CpfCnpj } from "@domain/value-objects/CpfCnpj";
import { CultivatedCropsValidator } from "@domain/value-objects/CultivatedCrops";
import { CultivatedCrops } from "@prisma/client";
import { Either, left, right } from "src/shared/either";
import { IProducerRepository } from "./ports/IProducerRepository";

interface Input {
  cpfCnpj: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalHectares: number;
  arebleAreaInHectares: number;
  vegetationAreaInHectares: number;
  cultivatedCrops: CultivatedCrops[];
}

export class CreateProducerUseCase {
  constructor(private readonly repository: IProducerRepository) {}
  async execute(
    input: Input
  ): Promise<Either<InvalidCpfCnpjError | SaveProducerError | InvalidCultivatedCropsError, ProducerEntity>> {
    const cpfCnpjOutput = CpfCnpj.validateCpfCnpj(input.cpfCnpj);
    if (cpfCnpjOutput.isLeft()) {
      return left(cpfCnpjOutput.value);
    }
    const cpfCnpj = cpfCnpjOutput.value as CpfCnpj;

    if (input.arebleAreaInHectares + input.vegetationAreaInHectares > input.totalHectares) {
      return left(new InvalidFarmAreaError());
    }

    const cultivatedCropsOutput = CultivatedCropsValidator.execute(input.cultivatedCrops);
    if (cultivatedCropsOutput.isLeft()) {
      return left(cultivatedCropsOutput.value);
    }
    const cultivatedCrops = cultivatedCropsOutput.value;

    const producerEntity = new ProducerEntity(
      cpfCnpj,
      input.name,
      input.farmName,
      input.city,
      input.state,
      input.totalHectares,
      input.arebleAreaInHectares,
      input.vegetationAreaInHectares,
      cultivatedCrops
      );
    const saveEntityOutput = await this.repository.save(producerEntity);
    if (saveEntityOutput.isLeft()) {
      return left(saveEntityOutput.value);
    }
    return right(saveEntityOutput.value);
  }
}