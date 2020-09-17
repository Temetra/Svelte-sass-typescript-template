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

	div {
		width: 100%;
		height: 0.5rem;
		background: rgb(131,58,180);

		// Test for autoprefixer
		background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
	}
</style>

<h1>Title using Sass mapped colours</h1>
<div></div>