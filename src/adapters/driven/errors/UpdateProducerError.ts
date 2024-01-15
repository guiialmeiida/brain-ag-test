export class UpdateProducerError extends Error {
  constructor(data?: any) {
    super(`Error when updating producer: ${data}`);
    this.name = "UpdateProducerError";
  }
}
