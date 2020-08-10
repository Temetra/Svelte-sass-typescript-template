<script lang="ts">
	import { onMount } from "svelte";
	import TestWorker from "web-worker:~/modules/test.worker.ts";

	let worker: Worker, workerResponse: string;

	onMount(async () => {
		// Create and query worker
		worker = new TestWorker();

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
