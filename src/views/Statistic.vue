<template>
	<div class="dashboard">
		<app-header></app-header>
		<app-sidebar></app-sidebar>
		<main class="content">
			<div 
				class="row"
				v-if="expenses.length">
				<div class="col-4 filters">
					<div 
					class="form-group form-group-radio"
					v-for="filter in filterArray">
					<input 
					class="form-field"
					type="radio" 
					name="statFilter"
					:value=filter
					v-model="filters.checked">
					<label>{{ filter }}</label>
					</div>
				</div>
				<div class="col-4 filters">
					<div class="form-group form-group-radio">
						<input 
						id="annualFilter"
						class="form-field" 
						type="radio" 
						name="typeFilter"
						value="year"
						v-model="filters.type">
						<label for="annualFilter">Année</label>
					</div>
					<div class="form-group form-group-radio">
						<input 
						id="catFilter"
						class="form-field" 
						type="radio" 
						name="typeFilter"
						value="cats"
						v-model="filters.type">
						<label for="catFilter">Catégories</label>
					</div>
				</div>
				<div class="col-4 filters">
					<div class="form-group form-group-radio">
						<input 
						id="isTable"
						class="form-field"
						type="radio"
						name="showTables"
						value="showTab"
						v-model="sort.type">
						<label for="isTable">
							<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="th" class="svg-inline--fa fa-th fa-w-16" role="img" viewBox="0 0 512 512" width="20" height="20"><path fill="currentColor" d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z"/></svg>						
						</label>
					</div>
					<div class="form-group form-group-radio">
						<input 
						id="isChart"
						class="form-field"
						type="radio"
						name="showTables"
						value="showTab"
						v-model="sort.type">
						<label for="isChart">
							<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="far" data-icon="chart-bar" class="svg-inline--fa fa-chart-bar fa-w-16" role="img" viewBox="0 0 512 512" width="20" height="20"><path fill="currentColor" d="M396.8 352h22.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-192 0h22.4c6.4 0 12.8-6.4 12.8-12.8V140.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h22.4c6.4 0 12.8-6.4 12.8-12.8V204.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zM496 400H48V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16zm-387.2-48h22.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8z"/></svg>						
						</label>
					</div>
				</div>
			</div>
			<div class="row" v-if="filters.type === 'year'">
				<div class="col-6">
					<div class="panel chart">
						<app-pie-chart
						:datas="pieOutcome" 
						:title="`Dépense / mois`"
						:chartId="`pieChart1`">
						</app-pie-chart>
					</div>
				</div>
				<div class="col-6">
						<div class="panel chart">
						<app-horizontal-bar-chart
							:datas="categoriesSorting"
							:chartTitle="`Dépense / mois`">
						</app-horizontal-bar-chart>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<app-table>
						<template slot="theader">
							<thead>
								<tr>
									<th 
										v-if="filters.type === 'year'"
										v-for="title in tables.thead_2">
										{{ title }}
									</th>
									<th 
										v-if="filters.type === 'cats'"
										v-for="title in tables.thead_1">
										{{ title }}
									</th>
								</tr>
							</thead>
						</template>
						<template 
							slot="tbody"
							v-if="filters.type === 'year'"
							v-for="item in expenseArray">
							<tbody>
								<app-td 
									v-for="(expense, index) in item.months"
									:expense="expense"
									:key="index"
									:id="index"
									:year="filters.checked">
								</app-td>
							</tbody>
						</template>
						<template 
							v-if="filters.type === 'cats'"
							slot="tbody"
							v-for="(item, key, index) in expenseArray">
							<app-td-cat :categories="item.months">
							</app-td-cat>
						</template>
						<template 
							slot="tfooter"
							v-if="filters.type === 'year'">
							<tr>
								<td></td>
								<td>{{ totalSpended | devise }}</td>
								<td>{{ totalEarned | devise  }}</td>
								<td></td>
							</tr>
						</template>
					</app-table>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import Header from '@/components/Header.vue'
	import Sidebar from '@/components/Sidebar.vue'
	import Footer from '@/components/Footer.vue'
	import Table from '@/components/generics/Table.vue'
	import Td from '@/components/statistics/Td.vue'
	import TdCat from '@/components/statistics/TdCategory.vue'
	import PieChart from '@/components/generics/Piechart.vue'
	import HorizontalBarChart from '@/components/generics/HorizontalBarchart.vue'

	import { appUtils } from '@/functionsUtils'
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				sort: {
					type: 'table'
				},
				filters: {
					checked: '',
					type: 'year'
				},
				edit: false,
				tables: {
					thead_1: [
					'Catégorie',
					'Janvier',
					'Février',
					'Mars',
					'Avril',
					'Mai',
					'Juin',
					'Juillet',
					'Août',
					'Septembre',
					'Octobre',
					'Novembre',
					'Décembre'
					],
					thead_2: [
					'Mois',
					'Dépenses',
					'Revenus',
					'Epargne'
					]
				},
				monthsOutput: [],
				fakeD: [
				[ "earned", 23143.41 ],
				[ "spended", 21191.18 ],
				[ "saved", 3000 ]
				]
			}
		},
		mounted() {
			this.filterArray
			this.expenseArray
		},
		computed: {
			...mapGetters({
				expenses: 'Return_allExpenses'
			}),
			expenseArray() {
				if(!this.expenses.length) return;
				return this.filteredArray()
			},
			filterArray() {
				if(!this.expenses.length) return;
				this.filters.checked = this.expenses[0].year 
				return this.expenses.map( expense => expense.year )
			},
			totalEarned() { return parseFloat(this.getSumArray('income')).toFixed(2) },
			totalSpended() { return parseFloat(this.getSumArray('outcome')).toFixed(2) },
			totalInBank() {},
			pieOutcome() { 
				if(this.expenses.length) {
					return this.filteredArray()[0].months.map( item => [ item.month, item.outcome ]) 
				}
			},
			categoriesSorting() {
				if(this.expenses.length) {
					const len = this.filteredArray()[0].months.length

					let months = this.filteredArray()[0].months.map(month => {
							if(month.categories === undefined) {
								return [{name: " ", value: 0}]
							}
							return month.categories
						})
					return months
				}
			}
		},
		methods: {
			getSumArray(key) {
				let tempArray = this.filteredArray()
				let newArray = []
				tempArray.filter( annual => annual.months.map( monthly => newArray.push(Number(monthly[key])) ) )
				return appUtils.sum(newArray)
			},
			substract(a, b) {

			},
			filteredArray() {
				return this.expenses.filter(expense => expense.year === this.filters.checked ? expense.months : false)
			}
		},
		components: {
			appHeader: Header,
			appSidebar: Sidebar,
			appFooter: Footer,
			appTable: Table,
			appTd: Td,
			appTdCat: TdCat,
			appPieChart: PieChart,
			appHorizontalBarChart: HorizontalBarChart
		}
	}
</script>

<style lang="scss" scoped>
.filters {
	display: flex;
	align-items: center;
}
.form {
	&-group {
		&-radio {
			position: relative;
			width: auto;
			max-width: 120px;
			margin-right: 1em;

			input, label {
				width: 120px;
			}

			input[type="radio"] { 
				position: absolute;
				opacity: 0;
				height: 100%;
				cursor: pointer;

				&:checked {

					+ label {
						background-color: #4c84ff;
						color: #ffffff;
					}
				}
			}

			label {
				background-color: transparent;
				border: 1px solid #d7d6d9;
				padding: 0.5em 1.5em;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
</style>