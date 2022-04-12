<script lang="ts">
	import { writable } from 'svelte/store';
  import { onMount } from "svelte";

	export const apiData = writable([]);

  onMount(async () => {
		try {
		  const response = await fetch("http://localhost:8090/activities");
		  const data = await response.json();
			console.log(data);
      apiData.set(data);
		} catch (error) {
			console.log(error);
		}
	})
  export let name: string;
</script>

<main>
	<h1>Hello {name}!</h1>
	{#if $apiData.length > 0}
	<h3>Activities:</h3>
	<ul>
		{#each $apiData as activity}
			<li>{activity.name}</li>
		{/each}
	</ul>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	ul {
    text-align: center;
    list-style: inside;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>