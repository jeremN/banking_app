<template>
	<div id="app" class="dashboard">
		<app-header></app-header>
    	<router-view></router-view>
	</div>
</template>

<script>
	import Header from './components/home/Header.vue'

	export default {
	  name: 'app',
	  components: {
		appHeader: Header,
	  },
	}
</script>

<style>
</style>