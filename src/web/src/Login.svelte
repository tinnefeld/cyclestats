<script lang="ts">
  import { onMount } from "svelte";
  import { Authentication, authenticationState, bearerToken } from "./stores";
  const urlParams = new URLSearchParams(window.location.search);

  export let BACKEND_URL;

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
</script>

{#if $authenticationState === Authentication.NONE}
  <button
    onclick="window.location.href='https://www.strava.com/oauth/authorize?client_id=79758&response_type=code&redirect_uri=http://localhost:8080?approval_prompt=force&scope=read,read_all,activity:read_all';"
  >
    Login with Strava
  </button>
{/if}
