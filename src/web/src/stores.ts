import { writable } from 'svelte/store';

export enum Authentication {
  NONE,
  PENDING,
  SUCCEEDED
}
export const authenticationState = writable(Authentication.NONE);

export const bearerToken = writable("");

export enum MeasurementUnit {
  IMPERIAL = "IMPERIAL",
  METRIC = "METRIC"
}
export const measurementUnitState = writable(MeasurementUnit.IMPERIAL);