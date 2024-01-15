import { IConnectionDatabase } from "@application/ports/IConnectionDatabase";
import IHttpServer from "@application/ports/IHttpServer";
import { ProducerFactory } from "src/core/factories/ProducerFactory";

export default class Router {
  constructor(
    readonly httpServer: IHttpServer,
    readonly connection: IConnectionDatabase
  ) {}

  start() {
    console.log("> [Router] starting...");

    const producerFactory = new ProducerFactory(this.httpServer, this.connection);
    producerFactory.makeCreateProducerController();
    producerFactory.makeUpdateProducerController();
    producerFactory.makeDeleteProducerController();
    producerFactory.makeListFarmInfo();
  }
}
