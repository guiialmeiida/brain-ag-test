import { IProducerRepository } from "@application/ports/IProducerRepository";
import { ProducerEntity } from "@domain/entities/ProducerEntity";
import { Either, left, right } from "src/shared/either";
import { DeleteProducerError } from "./errors/DeleteProducerError";
import { ListFarmInfoError } from "./errors/ListFarmInfoError";
import { ProducerNotFoundError } from "./errors/ProducerNotFoundError";
import { SaveProducerError } from "./errors/SaveProducerError";
import { UpdateProducerError } from "./errors/UpdateProducerError";

export class ProducerMemoryRepository implements IProducerRepository {
  private producers: ProducerEntity[] = [];

  async save(newProducer: ProducerEntity): Promise<Either<SaveProducerError, ProducerEntity>> {
    try {
      const existingProducer = this.producers.find((producer) =>
        producer.getCpfCnpj().includes(newProducer.getCpfCnpj())
      );

      if (existingProducer) {
        return right(existingProducer);
      }

      this.producers.push(newProducer);
      return right(newProducer);
    } catch (error) {
      console.log("===> ERRR", error);
      return left(new SaveProducerError(error));
    }
  }

  async update(newProducer: ProducerEntity): Promise<Either<UpdateProducerError, ProducerEntity>> {
    try {
      const index = this.producers.findIndex((producer) => producer.getKey() === newProducer.getKey());

      if (index === -1) {
        return left(new ProducerNotFoundError(newProducer.getKey()));
      }

      this.producers[index] = newProducer;
      return right(newProducer);
    } catch (error) {
      console.log("===> ERRR", error);
      return left(new UpdateProducerError(error));
    }
  }

  async remove(
    id: string
  ): Promise<Either<DeleteProducerError | ProducerNotFoundError, ProducerEntity>> {
    try {
      const index = this.producers.findIndex((producer) => producer.getKey() === id);

      if (index === -1) {
        return left(new ProducerNotFoundError(id));
      }

      const deletedProducer = this.producers.splice(index, 1)[0];
      return right(deletedProducer);
    } catch (error) {
      return left(new DeleteProducerError());
    }
  }

  async list(): Promise<Either<ListFarmInfoError, ProducerEntity[]>> {
    try {
      return right([...this.producers]);
    } catch (error) {
      return left(new ListFarmInfoError());
    }
  }
}
