import { ListFarmInfoError } from "@adapters/driven/errors";
import { ProducerEntity } from "@domain/entities/ProducerEntity";
import { Either, left, right } from "src/shared/either";
import { IProducerRepository } from "./ports/IProducerRepository";

interface DashboardData {
  totalFarm: number;
  totalHectare: number;
  state: { [state: string]: number };
  cultures: { [culture: string]: number };
  soloUse: { arable: number; vegetation: number };
}

export class ListFarmInfoUseCase {
  constructor(readonly repository: IProducerRepository) {}

  async execute(): Promise<Either<ListFarmInfoError, DashboardData>> {
    const result = await this.repository.list();
    if (result.isLeft()) {
      return left(new ListFarmInfoError());
    }

    const dashboardData = this.createDashboardData(result.value);
    return right(dashboardData);
  }

  private createDashboardData(result: ProducerEntity[]): DashboardData {
    const dashboardData: DashboardData = {
      totalFarm: result.length,
      totalHectare: result.reduce((total, farm) => total + farm.getTotalHectares(), 0),
      state: {},
      cultures: {},
      soloUse: { arable: 0, vegetation: 0 },
    };

    result.forEach((farm) => {
      if (dashboardData.state[farm.getState()]) {
        dashboardData.state[farm.getState()]++;
      } else {
        dashboardData.state[farm.getState()] = 1;
      }

      farm.getCultivatedCrops().forEach((culture) => {
        if (dashboardData.cultures[culture]) {
          dashboardData.cultures[culture]++;
        } else {
          dashboardData.cultures[culture] = 1;
        }
      });

      dashboardData.soloUse.arable += farm.getArebleAreaInHectares();
      dashboardData.soloUse.vegetation += farm.getVegetationAreaInHectares();
    });

    return dashboardData;
  }
}
