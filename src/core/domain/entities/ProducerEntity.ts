import { CpfCnpj } from "@domain/value-objects/CpfCnpj";
import { CultivatedCrops } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export enum CultivatedCropsType {
  Soja = 'Soja',
  Milho = 'Milho',
  Algodao = 'Algodão',
  Cafe = 'Café',
  Cana_de_Acucar = 'Cana de Açúcar',
}

export class ProducerEntity {
  private readonly key: string
  private readonly cpfCnpj: CpfCnpj;
  private readonly name: string;
  private readonly farmName: string;
  private readonly city: string;
  private readonly state: string;
  private readonly totalHectares: number;
  private readonly arebleAreaInHectares: number;
  private readonly vegetationAreaInHectares: number;
  //private readonly cultivatedCrops: CultivatedCropsType[];
  private readonly cultivatedCrops: CultivatedCrops[];

  constructor(
    cpfCnpj: CpfCnpj, 
    name: string,
    farmName: string,
    city: string,
    state: string,
    totalHectares: number,
    arebleAreaInHectares: number,
    vegetationAreaInHectares: number,
    cultivatedCrops: CultivatedCrops[],
    key?: string,
    ) {
    this.cpfCnpj = cpfCnpj;
    this.name = name;
    this.key = key ? key : uuidv4();
    this.farmName = farmName;
    this.city = city;
    this.state = state;
    this.totalHectares = totalHectares;
    this.arebleAreaInHectares = arebleAreaInHectares;
    this.vegetationAreaInHectares = vegetationAreaInHectares;
    this.cultivatedCrops = cultivatedCrops;
  }

  getKey() {
    return this.key;
  }

  getCpfCnpj() {
    return this.cpfCnpj.getValue();
  }

  getName() {
    return this.name;
  }

  getFarmName() {
    return this.farmName;
  }

  getCity() {
    return this.city;
  }
  
  getState() {
    return this.state;
  }

  getTotalHectares() {
    return this.totalHectares;
  }

  getArebleAreaInHectares() {
    return this.arebleAreaInHectares;
  }

  getVegetationAreaInHectares() {
    return this.vegetationAreaInHectares;
  }

  getCultivatedCrops() {
    return this.cultivatedCrops;
  }
}