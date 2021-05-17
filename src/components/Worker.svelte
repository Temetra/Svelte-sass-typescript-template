<script lang="ts">
	import { onMount } from "svelte";
	import workerURL from "omt:+/modules/test.worker";

	let worker: Worker, workerResponse: string;

	onMount(async () => {
		// Create and query worker
		worker = new Worker(`./build/${workerURL}`, { type: "module" });

		worker.addEventListener("message", function(evt) {
			console.log(`Client got: ${evt.data}`);
			workerResponse = evt.data;
		});

		worker.postMessage("Sending message to worker");
	});
</script>

<style type="text/scss">
</style>

<section>
	<h2>Web workers</h2>
	{#if workerResponse}
		<p>Worker responded with "{workerResponse}"</p>
	{:else}
		<p>Waiting for worker response</p>
	{/if}
</section>
