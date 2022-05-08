import { components } from "../models/ICycleStats";
import { definitions } from "../models/IStrava";
import { BearerToken } from "../models/IUtils";
import { StravaImportService } from "./StravaImportService.js";

type ICyclist = components["schemas"]["Cyclist"];
type IDistancePerMonth = components["schemas"]["DistancePerMonth"];
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
    const distancesPerMonth: IDistancePerMonth[] = [];
    let currentMonth;
    let currentYear;
    let currentDistance = 0;
    for (const activity of activitiesImport) {
      if (activity.start_date_local) {
        const d = new Date(activity.start_date_local);
        if (currentMonth === undefined || currentYear === undefined) {
          // first pass
          currentMonth = d.getMonth();
          currentYear = d.getFullYear();
        } else if (currentMonth !== d.getMonth() || currentYear !== d.getFullYear()) {
          // we got a new month or year, we add currentDistance to the result
          distancesPerMonth.push({ month: currentMonth, year: currentYear, distance: Math.round(currentDistance) });
          currentMonth = d.getMonth();
          currentYear = d.getFullYear();
          currentDistance = 0;
        }
        if (activity.distance) {
          currentDistance += activity.distance;
        }
      }
    }
    distancesPerMonth.sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      if (a.month !== b.month) {
        return a.month - b.month;
      }
      return 0;
    });
    return { distancesPerMonth };
  }
}
