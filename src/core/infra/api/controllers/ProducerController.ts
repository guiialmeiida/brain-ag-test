import { CreateProducerUseCase } from "@application/CreateProducerUseCase";
import { DeleteProducerUseCase } from "@application/DeleteProducerUseCase";
import { ListFarmInfoUseCase } from "@application/ListFarmInfoUseCase";
import { UpdateProducerUseCase } from "@application/UpdateProducerUseCase";
import IHttpServer from "@application/ports/IHttpServer";
import { HttpResponse, badRequest, created, ok, serverError } from "src/core/util/httpHelper";
import { MissingParamError } from "../../errors/MissingParamError";
import { validateProps } from "./ValidateProps";

export class ProducerController {
  constructor(private readonly httpServer: IHttpServer) {}

  registerEndpointCreateProducer(createProducerUseCase: CreateProducerUseCase) {
    this.httpServer.register(
      "post",
      "/producer",
      async function (params: any, body: any): Promise<HttpResponse> {
        try {
          const missingProps = validateProps([
            "cpfCnpj", 
            "name", 
            "farmName",
            "city",
            "state",
            "totalHectares",
            "arebleAreaInHectares",
            "vegetationAreaInHectares",
            "cultivatedCrops"
          ], body);

          if (missingProps.length > 0) {
            const missingParam = missingProps.join(" ");
            return badRequest({
              error: new MissingParamError(missingParam.trim()).message,
            });
          }

          const result = await createProducerUseCase.execute(body);
          if (result.isLeft()) {
            return badRequest({ error: result.value.message });
          }
          const producerDto = {
            key: result.value.getKey(),
            cpfCnpj: result.value.getCpfCnpj()
          };

          return created({
            message: "Producer created successfully!",
            producer: producerDto,
          });
        } catch (error) {
          console.log("===> ERRROR: ", error);
          return serverError(error);
        }
      }
    );
  }

  registerEndpointUpdateProducer(updateProducerUseCase: UpdateProducerUseCase) {
    this.httpServer.register(
      "put",
      "/producer/:id",
      async function (params: any, body: any): Promise<HttpResponse> {
        try {
          const missingProps = validateProps([
            "cpfCnpj", 
            "name", 
            "farmName",
            "city",
            "state",
            "totalHectares",
            "arebleAreaInHectares",
            "vegetationAreaInHectares",
            "cultivatedCrops"
          ], body);

          if (missingProps.length > 0) {
            const missingParam = missingProps.join(" ");
            return badRequest({
              error: new MissingParamError(missingParam.trim()).message,
            });
          }
          
          const updateBody = { id: params.id, ...body }
          const result = await updateProducerUseCase.execute(updateBody);
          if (result.isLeft()) {
            return badRequest({ error: result.value.message });
          }
          const producerDto = {
            key: result.value.getKey(),
            cpfCnpj: result.value.getCpfCnpj()
          };

          return ok({
            message: "Producer updated successfully!",
            producer: producerDto,
          });
        } catch (error) {
          console.log("===> ERRROR: ", error);
          return serverError(error);
        }
      }
    );
  }

  registerEndpointDeleteProducer(deleteProducerUseCase: DeleteProducerUseCase) {
    this.httpServer.register(
      "delete",
      "/producer/:id",
      async function (params: any, body: any) {
        try {
          const result = await deleteProducerUseCase.execute({
            id: params.id,
          });
          if (result.isLeft()) {
            return badRequest({ error: result.value.message });
          }

          return ok({
            message: "Producer removed successfully.",
          });
        } catch (error) {
          return serverError(error);
        }
      }
    );
  }

  registerEndpointListFarmInfo(listFarmInfoUseCase: ListFarmInfoUseCase) {
    this.httpServer.register(
      "get",
      "/farm-dashboard",
      async function () {
        try {
          const result = await listFarmInfoUseCase.execute();
          if (result.isLeft()) {
            return badRequest({ error: result.value.message });
          }
          return ok(result.value);
        } catch (error) {
          console.log("===> ERRRO: ", error);
          return serverError(error);
        }
      }
    );
  }
}