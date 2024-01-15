export class ProducerNotFoundError extends Error {
  constructor(data?: any) {
    super(`Producer ${data} not found.`);
    this.name = "ProducerNotFoundError";
  }
}
