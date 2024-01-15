import { PrismaClient, PrismaConnection } from "@adapters/driver/PrismaConnection";
import { IConnectionDatabase } from "@application/ports/IConnectionDatabase";
import { IProducerRepository } from "@application/ports/IProducerRepository";
import { ProducerEntity } from "@domain/entities/ProducerEntity";
import { CpfCnpj } from "@domain/value-objects/CpfCnpj";
import { Either, left, right } from "src/shared/either";
import { DeleteProducerError, ListFarmInfoError, ProducerNotFoundError, SaveProducerError, UpdateProducerError } from "./errors";


export default class ProducerDatabaseRepository implements IProducerRepository {
  private connection: IConnectionDatabase;
  private prisma: PrismaClient;

  constructor(connection: IConnectionDatabase) {
    this.connection = connection;
    this.prisma = (connection as PrismaConnection).getConnection();
  }

  async save(newProducer: ProducerEntity): Promise<Either<SaveProducerError, ProducerEntity>> {
    try {
      await this.connection.connect();
      const existingProducer = await this.prisma.producer.findFirst({
        where: { cpfCnpj: newProducer.getCpfCnpj() },
      });
      if (existingProducer) {
        const producerEntity = this.producerEntityFactory(existingProducer)
        return right(producerEntity);
      }
      await this.prisma.producer.create({
        data: {
          key: newProducer.getKey(),
          cpfCnpj: newProducer.getCpfCnpj(),
          name: newProducer.getName(),
          farmName: newProducer.getFarmName(),
          city: newProducer.getCity(),
          state: newProducer.getState(),
          totalHectares: newProducer.getTotalHectares(),
          arebleAreaInHectares: newProducer.getArebleAreaInHectares(),
          vegetationAreaInHectares: newProducer.getVegetationAreaInHectares(),
          cultivatedCrops: newProducer.getCultivatedCrops(),
        },
      });
      return right(newProducer);
    } catch (error) {
      console.log("===> ERRR", error);
      return left(new SaveProducerError(error));
    } finally {
      await this.connection.disconnect();
    }
  }

  async update(newProducer: ProducerEntity): Promise<Either<UpdateProducerError, ProducerEntity>> {
    try {
      await this.connection.connect();
      const existingProducer = await this.prisma.producer.findFirst({
        where: { key: newProducer.getKey() },
      });

      if(!existingProducer) {
        return left(new ProducerNotFoundError(newProducer.getKey()))
      }
      await this.prisma.producer.update({
        data: {
          cpfCnpj: newProducer.getCpfCnpj(),
          name: newProducer.getName(),
          farmName: newProducer.getFarmName(),
          city: newProducer.getCity(),
          state: newProducer.getState(),
          totalHectares: newProducer.getTotalHectares(),
          arebleAreaInHectares: newProducer.getArebleAreaInHectares(),
          vegetationAreaInHectares: newProducer.getVegetationAreaInHectares(),
          cultivatedCrops: newProducer.getCultivatedCrops(),
        },
        where: { key: newProducer.getKey() }
      });
      return right(newProducer);
    } catch (error) {
      console.log("===> ERRR", error);
      return left(new UpdateProducerError(error));
    } finally {
      await this.connection.disconnect();
    }
  }

  async remove(
    id: string
  ): Promise<Either<DeleteProducerError | ProducerNotFoundError, ProducerEntity>> {
    try {
      const producerFound = await this.prisma.producer.findUnique({
        where: { key: id },
      });
      if (!producerFound) {
        return left(new ProducerNotFoundError(id));
      }
      await this.prisma.producer.delete({ where: { key: id } });
      const productEntity = this.producerEntityFactory(producerFound);
      return right(productEntity);
    } catch (error) {
      return left(new DeleteProducerError());
    } finally {
      await this.connection.disconnect();
    }
  }

  async list(): Promise<Either<ListFarmInfoError, ProducerEntity[]>> {
    await this.connection.connect()
    const producersData = await this.prisma.producer.findMany();

    const producerEntities = producersData.map((producer) => {
      return this.producerEntityFactory(producer);
    })

    return right(producerEntities);
  }

  private producerEntityFactory(dataEntity) {
    const cpfCnpjOutput = CpfCnpj.validateCpfCnpj(dataEntity.cpfCnpj);
    const producerEntity = new ProducerEntity(
      cpfCnpjOutput.value as CpfCnpj,
      dataEntity.name,
      dataEntity.farmName,
      dataEntity.city,
      dataEntity.state,
      dataEntity.totalHectares,
      dataEntity.arebleAreaInHectares,
      dataEntity.vegetationAreaInHectares,
      dataEntity.cultivatedCrops,
      dataEntity.key,
    );
    return producerEntity;
  }
}
