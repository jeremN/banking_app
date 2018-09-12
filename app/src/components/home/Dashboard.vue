<template>
	<main class="dashboard-content content">
		<app-filter></app-filter>
		<app-fields></app-fields>
		<app-stats></app-stats>
		<app-graph :datas = filteredDatas></app-graph>
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

	import {mapGetters} from 'vuex'

	export default {

		computed: {
			...mapGetters({
				state: 'Return_State'
			}),	
			filteredDatas() {
				const primaryDatas = this.returnCurrentYear()
				console.log(primaryDatas[0].months)
				let datas = primaryDatas[0].months.map( item => {
					return item = {
						value: item.income,
						month: item.month,
						spend: item.outcome
					}
				})
				console.log(datas)
				return primaryDatas[0].months
			}		
		},
		methods: {
			returnCurrentYear() {
				return this.state.expenses.filter( expense => expense.year === this.state.currentYear ? expense : false)
			}
		},
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
