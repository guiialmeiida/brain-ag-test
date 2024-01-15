export class InvalidCpfCnpjError extends Error {
  constructor(cpfCnpj: string) {
    super(`Invalid CPF or CNPJ: ${cpfCnpj}`);
    this.name = "InvalidCpfCnpjError";
  }
}
