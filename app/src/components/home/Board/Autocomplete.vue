<template>
	<div class="autocomplete">
		<ul class="autocomplete-results">
			<li class="autocomplete-result"></li>
		</ul>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'

	export default {
		props: ['type', 'search']
	}
</script>

<style lang="scss" scoped>
	.autocomplete {
		width: 100%;
		position: relative;
	}
</style>