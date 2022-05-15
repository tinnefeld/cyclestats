import { writable } from "svelte/store";
import { Authentication, MeasurementUnit } from "./constants";

export const authenticationState = writable(Authentication.NONE);

export const bearerToken = writable("");

export const measurementUnitState = writable(MeasurementUnit.IMPERIAL);
