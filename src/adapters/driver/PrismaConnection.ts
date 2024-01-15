// import { PrismaClient } from "@prisma/client";
import { IConnectionDatabase } from "@application/ports/IConnectionDatabase";

import { PrismaClient as BasePrismaClient } from "@prisma/client";

export class PrismaClient extends BasePrismaClient {}

export class PrismaConnection implements IConnectionDatabase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getConnection(): PrismaClient {
    return this.prisma;
  }

  async connect(): Promise<void> {
    await this.prisma.$connect();
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
