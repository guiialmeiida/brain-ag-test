import { DeleteProducerError } from "@adapters/driven/errors";
import { ProducerEntity } from "@domain/entities/ProducerEntity";
import { InvalidCpfCnpjError } from "@domain/errors";
import { Either, left, right } from "src/shared/either";
import { IProducerRepository } from "./ports/IProducerRepository";

interface Input {
  id: string;
}

export class DeleteProducerUseCase {
  constructor(private readonly repository: IProducerRepository) {}

  async execute(
    input: Input
  ): Promise<Either<InvalidCpfCnpjError | DeleteProducerError, ProducerEntity>> {
    const deleteProductOutput = await this.repository.remove(input.id);
    if (deleteProductOutput.isLeft()) {
      return left(deleteProductOutput.value);
    }
    return right(deleteProductOutput.value as ProducerEntity);
  }
}