<template>
    <footer class="footer chart chart-footer">
        <div class="chart-wrapper col-12">
        	<app-card class="col-3">
        		<template slot="cardLeft">
		            <h2>Revenus de l'année:</h2>
		            <br>
		            <p>{{ sum.earn | parsedDevise }}</p>
        		</template>
        		<template slot="cardRight">
		            <h2>Dépenses de l'année:</h2>
		            <br>
		            <p>{{ sum.spend | parsedDevise }}</p>
        		</template>
        	</app-card>
            <app-bar-chart 
            	class="col-9 col-offset-1" 
            	:datas="calculatePath"
            	:xVal="values.x"
            	:yVal="values.y">
            </app-bar-chart>
        </div>
    </footer>
</template>

<script>
	import * as d3 from 'd3'
	import { mapGetters } from 'vuex'

	import Barchart from '@/components/generics/Barchart.vue'
	import Card from '@/components/generics/Card.vue'

	export default {
		data() {
			return {
				sum: {
					earn: '',
					spend: ''
				},
				values: {
					x: 'month',
					y: ['earn', 'spend']
				}
			}
		},
		computed: {
			...mapGetters({
				expenses: 'Return_allExpenses',
				currentYear: 'Return_CurrentYear'
			}),
			calculatePath() {
				if( !this.expenses ) return;
				let data = this.filteredDatas()
				if(data) {
					this.sum.earn = data.reduce( (a, b) => a + b.earn, 0)
					this.sum.spend = data.reduce( (a, b) => a + b.spend, 0)			
				}
				return data
			},
		},
		methods: {
			filteredDatas() {
				if(!this.expenses.length) return;

				const primaryDatas = this.returnCurrentYear()

				if( primaryDatas.length) {
					let datas = primaryDatas[0].months.map( item => {
						return item = {
							earn: item.income,
							month: item.month,
							spend: item.outcome
						}
					})
					return datas
				}
			},
			returnCurrentYear() {
				if(!this.expenses.length) return;
				return this.expenses.filter( expense => expense.year === this.currentYear ? expense : [])
			}
		},
		components: {
			appBarChart: Barchart,
			appCard: Card,
		}
	}
</script>

<style lang="scss" scoped>
	.chart {
		grid-column-start: 2;
		grid-row-start: 3;
		padding: 1rem;
		
		&-wrapper { display: flex; }
	}
	.card { max-height: 100px; }
</style>