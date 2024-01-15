export class InvalidFarmAreaError extends Error {
  constructor() {
    super(`The agricultural area and vegetation must not exceed the total area of ​​the farm.`);
    this.name = "InvalidFarmAreaError";
  }
}
