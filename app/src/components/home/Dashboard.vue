<template>
	<main class="dashboard-content content">
		<app-filter></app-filter>
		<app-fields></app-fields>
		<app-stats></app-stats>
		<app-graph></app-graph>
		<app-table></app-table>
		<app-popin></app-popin>
	</main>
</template>

<script>
	import Filter 		from './Board/Filter.vue'
	import Stats 		from './Board/Stats.vue'
	import Graph 		from './Board/Chart.vue'
	import Table 		from './Board/Table.vue'
	import Form 		from './Board/Fields.vue'
	import Popin 		from './Popin.vue'

	export default {
		components: {
			appFilter: Filter,
			appFields: Form,
			appStats: Stats,
			appGraph: Graph,
			appTable: Table,
			appPopin: Popin
		}
	}
</script>
