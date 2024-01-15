export class ListFarmInfoError extends Error {
  constructor() {
    super(`Error listing farm information`);
    this.name = "ListFarmInfoError";
  }
}
