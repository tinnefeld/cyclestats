<script lang="ts">
  import { onMount } from "svelte";
  import { Authentication } from "./constants";
  import { authenticationState, bearerToken } from "./stores";
  const urlParams = new URLSearchParams(window.location.search);

  export let BACKEND_URL: string;

  const STRAVA_OAUTH_URL = "https://www.strava.com/oauth/authorize";
  const STRAVA_CLIENT_ID = "79758";
  const STRAVA_SCOPE = "read,read_all,activity:read_all";
  const REDIRECT_URL = "http://localhost:8080";

  onMount(async () => {
    if (urlParams.has("code")) {
      authenticationState.set(Authentication.PENDING);
      try {
        const oAuthResponse = await fetch(
          `${BACKEND_URL}/oauth/token?code=${urlParams.get("code")}`,
          { method: "post" }
        );
        if (oAuthResponse.status === 201) {
          const oAuthData = await oAuthResponse.json();
          bearerToken.set(oAuthData.bearerToken);
          authenticationState.set(Authentication.SUCCEEDED);
        } else {
          authenticationState.set(Authentication.NONE);
        }
      } catch (error) {
        authenticationState.set(Authentication.NONE);
        console.log(error);
      }
    }
  });

  function loginClick() {
    window.location.replace(`${STRAVA_OAUTH_URL}?client_id=${STRAVA_CLIENT_ID}&response_type=code&` +
                            `redirect_uri=${REDIRECT_URL}?approval_prompt=force&scope=${STRAVA_SCOPE}`);
  }
</script>

{#if $authenticationState === Authentication.NONE} 
    <button on:click={loginClick}>
      Login with Strava
  </button>
{/if}
