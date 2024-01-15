import { DeleteProducerError } from "@adapters/driven/errors/DeleteProducerError";
import { ListFarmInfoError } from "@adapters/driven/errors/ListFarmInfoError";
import { ProducerNotFoundError } from "@adapters/driven/errors/ProducerNotFoundError";
import { SaveProducerError } from "@adapters/driven/errors/SaveProducerError";
import { UpdateProducerError } from "@adapters/driven/errors/UpdateProducerError";
import { ProducerEntity } from "@domain/entities/ProducerEntity";
import { Either } from "src/shared/either";

export interface IProducerRepository {
  save(newProducer: ProducerEntity): Promise<Either<SaveProducerError, ProducerEntity>>;
  update(newProducer: ProducerEntity): Promise<Either<UpdateProducerError, ProducerEntity>>
  remove(id: string): Promise<Either<DeleteProducerError | ProducerNotFoundError, ProducerEntity>>
  list(): Promise<Either<ListFarmInfoError, ProducerEntity[]>>
}
