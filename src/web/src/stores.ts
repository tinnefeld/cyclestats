import { writable } from 'svelte/store';

export enum Authentication {
  NONE,
  PENDING,
  SUCCEEDED
}
export const authenticationState = writable(Authentication.NONE);

export const bearerToken = writable("");
