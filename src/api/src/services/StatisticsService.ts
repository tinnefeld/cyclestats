import { components } from "../models/ICycleStats";
import { BearerToken } from "../models/IUtils";
import { StravaImportService } from "./StravaImportService.js";

type ICyclist = components["schemas"]["Cyclist"];
type IMonthlySummary = components["schemas"]["Statistics"]["monthlySummary"];
type ITotalSummary = components["schemas"]["Statistics"]["totalSummary"];
type IStatistics = components["schemas"]["Statistics"];
type ISummary = components["schemas"]["Summary"];

export class StatisticsService {
  private importService: StravaImportService;

  constructor(bearerToken: BearerToken) {
    this.importService = new StravaImportService(bearerToken);
  }

  public async createSummary(): Promise<ISummary> {
    const cyclistImport = await this.importService.getAthlete();
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
      if (cyclistImport.sex === "M") {
        cyclist.sex = "Male";
      } else if (cyclistImport.sex === "F") {
        cyclist.sex = "Female";
      } else {
        cyclist.sex = "Non-binary";
      }
    }
    if (cyclistImport.city) {
      cyclist.city = cyclistImport.city;
    }
    if (cyclistImport.state) {
      cyclist.state = cyclistImport.state;
    }
    if (cyclistImport.country) {
      cyclist.country = cyclistImport.country;
    }
    if (cyclistImport.ftp) {
      cyclist.ftp = cyclistImport.ftp;
    }
    if (cyclistImport.weight) {
      cyclist.weight = Math.round(cyclistImport.weight);
    }
    if (cyclistImport.measurement_preference) {
      if (cyclistImport.measurement_preference === "feet") {
        cyclist.measurement = "IMPERIAL";
      } else if (cyclistImport.measurement_preference === "meters") {
        cyclist.measurement = "METRIC";
      }
    }
    if (cyclistImport.bikes && cyclistImport.bikes.length > 0) {
      cyclist.bikes = [];
      cyclistImport.bikes.forEach(b => {
        if (b.name) {
          cyclist.bikes!.push({
            name: b.name
          });
          if (b.distance) {
            cyclist.bikes![cyclist.bikes!.length - 1].distance = Math.floor(b.distance / 1000);
          }
        }
      });
    }
    return { cyclist };
  }

  public async createStatistics(): Promise<IStatistics> {
    const activitiesImport = await this.importService.getActivities();
    const totalSummary: ITotalSummary = {
      distance: 0,
      elevation: 0,
      rides: 0,
      movingTime: 0,
      energy: 0
    };
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
            movingTime: 0,
            energy: 0
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
            movingTime: 0,
            energy: 0
          });
          indexMonth = (monthlySummary[indexYear].months.length - 1);
        }
        totalSummary.rides!++;
        if (monthlySummary[indexYear].rides !== undefined) {
          monthlySummary[indexYear].rides!++;
        }
        if (monthlySummary[indexYear].months[indexMonth].rides !== undefined) {
          monthlySummary[indexYear].months[indexMonth].rides!++;
        }
        if (activity.distance) {
          const distance = Math.round(activity.distance / 1000);
          totalSummary.distance! += distance;
          if (monthlySummary[indexYear].distance !== undefined) {
            monthlySummary[indexYear].distance! += distance;
          }
          if (monthlySummary[indexYear].months[indexMonth].distance !== undefined) {
            monthlySummary[indexYear].months[indexMonth].distance! += distance;
          }
        }
        if (activity.total_elevation_gain) {
          const elev = Math.round(activity.total_elevation_gain);
          totalSummary.elevation! += elev;
          if (monthlySummary[indexYear].elevation !== undefined) {
            monthlySummary[indexYear].elevation! += elev;
          }
          if (monthlySummary[indexYear].months[indexMonth].elevation !== undefined) {
            monthlySummary[indexYear].months[indexMonth].elevation! += elev;
          }
        }
        if (activity.elapsed_time) {
          const elapsed = Math.round(activity.elapsed_time / 60);
          totalSummary.movingTime! += elapsed;
          if (monthlySummary[indexYear].movingTime !== undefined) {
            monthlySummary[indexYear].movingTime! += elapsed;
          }
          if (monthlySummary[indexYear].months[indexMonth].movingTime !== undefined) {
            monthlySummary[indexYear].months[indexMonth].movingTime! += elapsed;
          }
        }
        if (activity.kilojoules) {
          const energy = Math.round(activity.kilojoules * 0.277778); // kilojoules to watt-hours
          totalSummary.energy! += energy;
          if (monthlySummary[indexYear].energy !== undefined) {
            monthlySummary[indexYear].energy! += energy;
          }
          if (monthlySummary[indexYear].months[indexMonth].energy !== undefined) {
            monthlySummary[indexYear].months[indexMonth].energy! += energy;
          }
        }
      }
    }
    monthlySummary.forEach(m => m.months.sort((a, b) => a.month - b.month));
    monthlySummary.sort((a, b) => a.year - b.year);
    return { monthlySummary, totalSummary };
  }
}
