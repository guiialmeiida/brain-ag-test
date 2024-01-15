
import IHttpServer from "@application/ports/IHttpServer";
import express, { Application, Request, Response } from "express";
import { Server } from "http";
import { HttpResponse } from "src/core/util/httpHelper";

export class ExpressAdapter implements IHttpServer {
  private app: Application;
  private server: Server;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
  }

  private setupMiddlewares() {
    this.app.use(express.json());
  }
  
  async register(
    method: string,
    url: string,
    callback: Function
  ): Promise<void> {
    this.app[method](url, async function (req: Request, res: Response) {
      const output: HttpResponse = await callback(
        req.params,
        req.body,
        req.query
      );
      res.status(output.statusCode).json(output.body);
    });
  }

  async start(port: number): Promise<void> {
    console.log(`> [ExpressAdapter] starting...`);
    this.server = this.app.listen(port, () => {
      console.log(`> [ExpressAdapter] Server is running on port ${port}`);
    });
  }

  async stop(): Promise<void> {
    if (this.server) {
      this.server.close();
      console.log("> [ExpressAdapter] Server has been stopped");
    }
  }
}
