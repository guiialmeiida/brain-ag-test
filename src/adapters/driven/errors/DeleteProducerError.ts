export class DeleteProducerError extends Error {
  constructor(data?: any) {
    super(`Error when deleting producer: ${data}`);
    this.name = "DeleteProducerError";
  }
}
