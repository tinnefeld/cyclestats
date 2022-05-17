import type { components } from "./models/ICycleStats";
type ISummary = components["schemas"]["Summary"];
type IStatistics = components["schemas"]["Statistics"];
type ISummaryPerMonth = components["schemas"]["SummaryPerMonth"];

export const DEMO_MODE = false; // if true, UI is in demo mode, serving static content

export const DEMO_DATA_SUMMARY: ISummary = {
  cyclist: {
    firstName: "James",
    lastName: "Miller",
    profileUrl: "https://cloudfront.net/athlete.jpg",
    sex: "Male",
    city: "Palo Alto",
    state: "California",
    country: "United States",
    ftp: 250,
    weight: 80,
    measurement: "IMPERIAL",
    bikes: [
      {
        name: "Canyon Ultimate",
        distance: 2135
      },
      {
        name: "Specialized Tarmac Expert Disc ",
        distance: 3700
      },
      {
        name: "Trek Remedy 8",
        distance: 2121
      }
    ]
  }
};

export const DEMO_DATA_STATISTICS: IStatistics = {
  monthlySummary: [],
  totalSummary: {
    distance: 0,
    elevation: 0,
    rides: 0,
    movingTime: 0,
    energy: 0
  }
};

[2018, 2019, 2020, 2021, 2022].forEach(y => {
  DEMO_DATA_STATISTICS.monthlySummary.push({ year: y, months: [] });
  const index = DEMO_DATA_STATISTICS.monthlySummary.length - 1;
  [...Array(12).keys()].forEach(m => {
    const s: ISummaryPerMonth = {
      month: m,
      distance: Math.floor(Math.random() * (500 - 200) + 200),
      elevation: Math.floor(Math.random() * (3000 - 100) + 100),
      rides: Math.floor(Math.random() * (16 - 4) + 4),
      movingTime: Math.floor(Math.random() * (4000 - 200) + 200),
      energy: Math.floor(Math.random() * (4000 - 200) + 200)
    };
    DEMO_DATA_STATISTICS.monthlySummary[index].months.push(s);
    DEMO_DATA_STATISTICS.monthlySummary[index].distance = 0;
    DEMO_DATA_STATISTICS.monthlySummary[index].elevation = 0;
    DEMO_DATA_STATISTICS.monthlySummary[index].rides = 0;
    DEMO_DATA_STATISTICS.monthlySummary[index].movingTime = 0;
    DEMO_DATA_STATISTICS.monthlySummary[index].energy = 0;
  });
  DEMO_DATA_STATISTICS.monthlySummary[index].months.forEach(m => {
    DEMO_DATA_STATISTICS.monthlySummary[index].distance += m.distance;
    DEMO_DATA_STATISTICS.totalSummary.distance += m.distance;
    DEMO_DATA_STATISTICS.monthlySummary[index].elevation += m.elevation;
    DEMO_DATA_STATISTICS.totalSummary.elevation += m.elevation;
    DEMO_DATA_STATISTICS.monthlySummary[index].energy += m.energy;
    DEMO_DATA_STATISTICS.totalSummary.energy += m.energy;
    DEMO_DATA_STATISTICS.monthlySummary[index].movingTime += m.movingTime;
    DEMO_DATA_STATISTICS.totalSummary.movingTime += m.movingTime;
    DEMO_DATA_STATISTICS.monthlySummary[index].rides += m.rides;
    DEMO_DATA_STATISTICS.totalSummary.rides += m.rides;
  });
});
