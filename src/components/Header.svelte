<style type="text/scss">
	// Import and use set-colors mixin from src/scss/_shared.scss
	@import "shared";

	$title: (
		"text": white,
		"background": darkslateblue
	);

	h1 {
		padding: 2rem;
		@include set-colors($title);
	}
</style>

<h1>Title using Sass mapped colours</h1>
