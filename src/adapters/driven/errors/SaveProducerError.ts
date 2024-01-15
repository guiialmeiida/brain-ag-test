export class SaveProducerError extends Error {
  constructor(data?: any) {
    super(`Error saving producer. ${data}`);
    this.name = "SaveProducerError";
  }
}
