<template>
	<div class="dashboard-main">
		<app-sidebar></app-sidebar>
		<app-dashboard></app-dashboard>
		<app-footer></app-footer>
	</div>
</template>

<script>
	import Sidebar from './Sidebar.vue'
	import Dashboard from './Dashboard.vue'
	import Footer from './Footer.vue'

	export default {
		components: {
			appSidebar: Sidebar,
			appDashboard: Dashboard,
			appFooter: Footer
		}
	}
</script>
