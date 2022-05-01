<script lang="ts">
  import { onMount } from "svelte";
  const urlParams = new URLSearchParams(window.location.search);

  export let BACKEND_URL;
  export let bearerTokenLogin;

  onMount(async () => {
    try {
      if (urlParams.has("code")) {
        const oAuthResponse = await fetch(
          `${BACKEND_URL}/oauth/token?code=${urlParams.get("code")}`,
          { method: "post" }
        );
        const oAuthData = await oAuthResponse.json();
        bearerTokenLogin = oAuthData.bearerToken;
      }
    } catch (error) {
      console.log(error);
    }
  });
</script>

{#if !urlParams.has("code")}
  <button
    onclick="window.location.href='https://www.strava.com/oauth/authorize?client_id=79758&response_type=code&redirect_uri=http://localhost:8080?approval_prompt=force&scope=read,read_all,activity:read';"
  >
    Login with Strava
  </button>
{/if}
