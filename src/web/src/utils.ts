import colorLib from "@kurkle/color";

export const METERS_TO_FEET = 3.281;
export const MILES_TO_KILOMETER = 0.6214;
export const THREE_DOTS = /\B(?=(\d{3})+(?!\d))/g;

export const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export enum DistanceLongAbbreviated {
  IMPERIAL = "mi",
  METRIC = "km"
}

export enum DistanceLong {
  IMPERIAL = "miles",
  METRIC = "kilometers"
}

export enum DistanceShort {
  IMPERIAL = "feet",
  METRIC = "meters"
}

export enum ChartColors {
  A = "#003f5c", // DARK_BLUE
  B = "#58508d", // PURPLE
  C = "#bc5090", // PINK
  D = "#ff6361", // RED
  E = "#ffa600" // YELLOW
}

export function transparentize(value, opacity) {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}
