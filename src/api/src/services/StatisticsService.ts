import { components } from "../models/ICycleStats";
import { definitions } from "../models/IStrava";
import { BearerToken } from "../models/IUtils";
import { StravaImportService } from "./StravaImportService.js";

type ICyclist = components["schemas"]["Cyclist"];
type IMonthlySummary = components["schemas"]["Statistics"]["monthlySummary"];
type IStatistics = components["schemas"]["Statistics"];
type ISummary = components["schemas"]["Summary"];
type IStravaActivityStats = definitions["ActivityStats"];

export class StatisticsService {
  private importService: StravaImportService;

  constructor(bearerToken: BearerToken) {
    this.importService = new StravaImportService(bearerToken);
  }

  public async createSummary(): Promise<ISummary> {
    const cyclistImport = await this.importService.getAthlete();
    let cyclistStatsSummaryImport: IStravaActivityStats = {};
    if (cyclistImport.id) {
      cyclistStatsSummaryImport = await this.importService.getAthleteStats(cyclistImport.id);
    }
    const cyclist: ICyclist = {};
    if (cyclistImport.firstname) {
      cyclist.firstName = cyclistImport.firstname;
    }
    if (cyclistImport.lastname) {
      cyclist.lastName = cyclistImport.lastname;
    }
    if (cyclistImport.profile) {
      cyclist.profileUrl = cyclistImport.profile;
    }
    if (cyclistImport.sex) {
      cyclist.sex = cyclistImport.sex;
    }
    if (cyclistImport.city || cyclistImport.state || cyclistImport.country) {
      cyclist.location = `${cyclistImport.city} ${cyclistImport.state} ${cyclistImport.country}`;
    }
    if (cyclistImport.ftp) {
      cyclist.ftp = cyclistImport.ftp;
    }
    if (cyclistImport.weight) {
      cyclist.weight = cyclistImport.weight;
    }
    if (cyclistImport.measurement_preference) {
      if (cyclistImport.measurement_preference === "feet") {
        cyclist.measurement = "IMPERIAL";
      } else if (cyclistImport.measurement_preference === "meters") {
        cyclist.measurement = "METRIC";
      }
    }
    if (cyclistStatsSummaryImport.biggest_ride_distance) {
      cyclist.longestRide = cyclistStatsSummaryImport.biggest_ride_distance;
    }
    if (cyclistStatsSummaryImport.biggest_climb_elevation_gain) {
      cyclist.highestClimb = cyclistStatsSummaryImport.biggest_climb_elevation_gain;
    }
    return { cyclist };
  }

  public async createStatistics(): Promise<IStatistics> {
    const activitiesImport = await this.importService.getActivities();
    const monthlySummary: IMonthlySummary = [];
    for (const activity of activitiesImport) {
      if (activity.start_date_local) {
        const d = new Date(activity.start_date_local);
        let indexYear = monthlySummary.findIndex(e => e.year === d.getFullYear());
        if (indexYear < 0) {
          // does not exist, we need to create it
          monthlySummary.push({
            year: d.getFullYear(),
            months: [],
            distance: 0,
            elevation: 0,
            rides: 0,
            movingTime: 0
          });
          indexYear = (monthlySummary.length - 1);
        }
        let indexMonth = monthlySummary[indexYear].months.findIndex(e => e.month === d.getMonth());
        if (indexMonth < 0) {
          // does not exist, we need to create it
          monthlySummary[indexYear].months.push({
            month: d.getMonth(),
            distance: 0,
            elevation: 0,
            rides: 0,
            movingTime: 0
          });
          indexMonth = (monthlySummary[indexYear].months.length - 1);
        }
        if (monthlySummary[indexYear].rides !== undefined) {
          monthlySummary[indexYear].rides!++;
        }
        if (monthlySummary[indexYear].months[indexMonth].rides !== undefined) {
          monthlySummary[indexYear].months[indexMonth].rides!++;
        }
        if (activity.distance) {
          const distance = Math.round(activity.distance / 1000);
          if (monthlySummary[indexYear].distance !== undefined) {
            monthlySummary[indexYear].distance! += distance;
          }
          if (monthlySummary[indexYear].months[indexMonth].distance !== undefined) {
            monthlySummary[indexYear].months[indexMonth].distance! += distance;
          }
        }
        if (activity.total_elevation_gain) {
          const elev = Math.round(activity.total_elevation_gain);
          if (monthlySummary[indexYear].elevation !== undefined) {
            monthlySummary[indexYear].elevation! += elev;
          }
          if (monthlySummary[indexYear].months[indexMonth].elevation !== undefined) {
            monthlySummary[indexYear].months[indexMonth].elevation! += elev;
          }
        }
        if (activity.elapsed_time) {
          const elapsed = Math.round(activity.elapsed_time / 60);
          if (monthlySummary[indexYear].movingTime !== undefined) {
            monthlySummary[indexYear].movingTime! += elapsed;
          }
          if (monthlySummary[indexYear].months[indexMonth].movingTime !== undefined) {
            monthlySummary[indexYear].months[indexMonth].movingTime! += elapsed;
          }
        }
      }
    }
    monthlySummary.forEach(m => m.months.sort((a, b) => a.month - b.month));
    monthlySummary.sort((a, b) => a.year - b.year);
    return { monthlySummary };
  }
}
