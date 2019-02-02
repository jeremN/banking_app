<template>
    <footer class="footer chart chart-footer">
        <div class="chart-wrapper col-12">
        </div>
    </footer>
</template>

<script>
	import * as d3 from 'd3'
	import { mapGetters } from 'vuex'

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
		}
	}
</script>

<style lang="scss" scoped>

</style>