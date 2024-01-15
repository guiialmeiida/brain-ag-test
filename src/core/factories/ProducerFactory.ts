import IHttpServer from "@application/ports/IHttpServer";

import ProducerDatabaseRepository from "@adapters/driven/ProducerDatabaseRepository";
import { CreateProducerUseCase } from "@application/CreateProducerUseCase";
import { DeleteProducerUseCase } from "@application/DeleteProducerUseCase";
import { ListFarmInfoUseCase } from "@application/ListFarmInfoUseCase";
import { UpdateProducerUseCase } from "@application/UpdateProducerUseCase";
import { IConnectionDatabase } from "@application/ports/IConnectionDatabase";
import { ProducerController } from "../infra/api/controllers/ProducerController";

export class ProducerFactory {
  private readonly producerController: ProducerController;
  private readonly producerRepository: ProducerDatabaseRepository;

  constructor(
    private readonly httpServer: IHttpServer,
    private readonly connection: IConnectionDatabase
  ) {
    this.producerController = new ProducerController(this.httpServer);
    this.producerRepository = new ProducerDatabaseRepository(this.connection);
  }

  makeCreateProducerController = () => {
    this.producerController.registerEndpointCreateProducer(
      new CreateProducerUseCase(this.producerRepository)
    );
  };

  makeUpdateProducerController = () => {
    this.producerController.registerEndpointUpdateProducer(
      new UpdateProducerUseCase(this.producerRepository)
    );
  };

  makeDeleteProducerController = () => {
   this.producerController.registerEndpointDeleteProducer(
    new DeleteProducerUseCase(this.producerRepository)
   );
  };

  makeListFarmInfo = () => {
    this.producerController.registerEndpointListFarmInfo(
     new ListFarmInfoUseCase(this.producerRepository)
    );
   };
}
