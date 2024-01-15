import { InvalidCpfCnpjError } from "@domain/errors/InvalidCpfCnpjError";
import { Either, left, right } from "src/shared/either";

export class CpfCnpj {
  private readonly value: string;

  constructor(cpfCnpj: string = "") {
    this.value = cpfCnpj;
  }

  public getValue(): string {
    return this.value;
  }

  private static isValidCpf(cpf: string) {
    cpf = cpf.replace(/[^\d]/g, ''); 

    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf[i - 1]) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf[9])) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf[i - 1]) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf[10])) {
      return false;
    }

    return true;
  }

  private static isValidCnpj(cnpj: string) {
    cnpj = cnpj.replace(/[^\d]/g, '');

    if (cnpj.length !== 14) {
      return false;
    }

    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    let sum = 0;
    let position = 5;

    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj[i]) * position--;

      if (position < 2) {
        position = 9;
      }
    }

    let remainder = sum % 11;

    if (remainder < 2) {
      remainder = 0;
    } else {
      remainder = 11 - remainder;
    }

    if (remainder !== parseInt(cnpj[12])) {
      return false;
    }

    sum = 0;
    position = 6;

    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj[i]) * position--;

      if (position < 2) {
        position = 9;
      }
    }

    remainder = sum % 11;

    if (remainder < 2) {
      remainder = 0;
    } else {
      remainder = 11 - remainder;
    }

    if (remainder !== parseInt(cnpj[13])) {
      return false;
    }

    return true;
  }

  public static validateCpfCnpj(cpfCnpj: string): Either<InvalidCpfCnpjError, CpfCnpj> {
    const cleanCpfCnpj = cpfCnpj.replace(/[^\d]/g, '');
    if (cleanCpfCnpj.length === 11 && this.isValidCpf(cleanCpfCnpj)) {
      return right(new CpfCnpj(cleanCpfCnpj));
    } else if (cleanCpfCnpj.length === 14 && this.isValidCnpj(cleanCpfCnpj)) {
      return right(new CpfCnpj(cleanCpfCnpj));
    } else {
      return left(new InvalidCpfCnpjError(cleanCpfCnpj));
    }
  }
}
