<template>
	<div class="dashboard">
		<app-header></app-header>
		<app-sidebar></app-sidebar>
		<app-dashboard></app-dashboard>
		<app-footer></app-footer>
	</div>
</template>

<script>
	import Header from './Header.vue'
	import Sidebar from './Sidebar.vue'
	import Dashboard from './Dashboard.vue'
	import Footer from './Footer.vue'

	export default {
		components: {
			appHeader: Header,
			appSidebar: Sidebar,
			appDashboard: Dashboard,
			appFooter: Footer
		}
	}
</script>
