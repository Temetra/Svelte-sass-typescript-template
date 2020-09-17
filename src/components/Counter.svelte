<script lang="ts">
	import { count, squaredCount } from "@/stores/datastore";

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
	<p>
		The count is {$count} and the square is {$squaredCount}
	</p>
	<p>
		<button on:click={decrement}>-</button>
		<button on:click={increment}>+</button>
	</p>
</section>