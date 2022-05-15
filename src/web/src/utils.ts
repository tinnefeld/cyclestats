import colorLib from "@kurkle/color";
import { MeasurementUnit } from "./constants";
import {
  DistanceLong,
  DistanceLongAbbreviated,
  DistanceShort,
  DistanceShortAbbreviated,
  KILOGRAM_TO_POUND,
  METERS_TO_FEET,
  MILES_TO_KILOMETER,
  THREE_DIGITS,
  WeightAbbreviated
} from "./constants";

export function getDistanceLong(distanceInKm: number, unit: MeasurementUnit, abbreviated: boolean = false): string {
  let result = "";
  if (unit === MeasurementUnit.METRIC) {
    result = `${distanceInKm.toString().replace(THREE_DIGITS, ",")}`;
  } else if (unit === MeasurementUnit.IMPERIAL) {
    result = `${Math.round(distanceInKm * MILES_TO_KILOMETER).toString().replace(THREE_DIGITS, ",")}`;
  }
  if (abbreviated) {
    result += ` ${DistanceLongAbbreviated[unit]}`;
  } else {
    result += ` ${DistanceLong[unit]}`;
  }
  return result;
}

export function getDistanceShort(distanceInMeters: number,
  unit: MeasurementUnit,
  abbreviated: boolean = false): string {
  let result = "";
  if (unit === MeasurementUnit.METRIC) {
    result = `${distanceInMeters.toString().replace(THREE_DIGITS, ",")}`;
  } else if (unit === MeasurementUnit.IMPERIAL) {
    result = `${Math.round(distanceInMeters * METERS_TO_FEET).toString().replace(THREE_DIGITS, ",")}`;
  }
  if (abbreviated) {
    result += ` ${DistanceShortAbbreviated[unit]}`;
  } else {
    result += ` ${DistanceShort[unit]}`;
  }
  return result;
}

export function getWeight(weightInKg: number, unit: MeasurementUnit): string {
  let result = "";
  if (unit === MeasurementUnit.METRIC) {
    result = `${weightInKg} ${WeightAbbreviated[unit]}`;
  } else if (unit === MeasurementUnit.IMPERIAL) {
    result = `${Math.round(weightInKg * KILOGRAM_TO_POUND)} ${WeightAbbreviated[unit]}`;
  }
  return result;
}

export function convertMinutesToDaysAndHours(minutes: number, abbreviated: boolean = false) {
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor(minutes % (60 * 24) / 60);
  const daysDisplay =
    days > 0 ? days + (days === 1 ? ` ${abbreviated ? "d" : "day"} ` : ` ${abbreviated ? "d" : "days"} `) : "";
  const hoursDisplay =
    hours > 0 ? hours + (hours === 1 ? ` ${abbreviated ? "hr" : "hour"} ` : ` ${abbreviated ? "hrs" : "hours"} `) : "";
  return `${daysDisplay}${hoursDisplay}`;
}

export function transparentize(value, opacity) {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}
