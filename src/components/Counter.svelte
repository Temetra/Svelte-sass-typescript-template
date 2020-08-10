<script lang="ts">
	import { count } from "~/stores/datastore.ts";

	function increment() {
		count.update(n => n + 1);
	}
	
	function decrement() {
		count.update(n => n - 1);
	}
</script>

<style type="text/scss">
</style>

<section>
	<h2>Stores</h2>
	The count is {$count}

	<button on:click={decrement}>
		-
	</button>
	<button on:click={increment}>
		+
	</button>
</section>