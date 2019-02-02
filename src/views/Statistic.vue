<template>
	<div class="dashboard">
		<app-header></app-header>
		<app-sidebar></app-sidebar>
		<main class="content">
			<div class="row">
				<h1 class="content__title">Statistics</h1>
			</div>
			<div class="row">
				<div class="col-8 form--inline card card--transparent">
					<div><strong>Trier par:</strong></div>
					<div 
						class="form__group form__group--radio"
						v-for="filter in filterArray">
						<input 
							class="form-field"
							type="radio" 
							name="statFilter"
							:value=filter
							v-model="filters.checked">
						<label>
							<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" viewBox="0 0 512 512" width="10" height="10">
								<path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/>
							</svg>
							{{ filter }}
						</label>
					</div>
					<span class="separator"></span>
					<div class="form__group form__group--radio">
						<input 
							id="annualFilter"
							class="form-field" 
							type="radio" 
							name="typeFilter"
							value="year"
							:disabled="sort === 'chart'"
							v-model="filters.type">
						<label for="annualFilter">
							<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" viewBox="0 0 512 512" width="10" height="10">
								<path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/>
							</svg>
							Année
						</label>
					</div>
					<div class="form__group form__group--radio">
						<input 
							id="catFilter"
							class="form-field" 
							type="radio" 
							name="typeFilter"
							value="cats"
							:disabled="sort === 'chart'"
							v-model="filters.type">
						<label for="catFilter">
							<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" viewBox="0 0 512 512" width="10" height="10">
								<path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/>
							</svg>
							Catégories
						</label>
					</div>
				</div>
				<div class="col-4 form--inline card card--noStyle card--filter">
					<button 
						class="btn btn--white" 
						:class="{is__active : sort === 'table'}" 
						@click="sort = 'table'">
						<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="th-list" class="svg-inline--fa fa-th-list fa-w-16" role="img" viewBox="0 0 512 512" width="20" height="20">
							<path fill="currentColor" d="M149.333 216v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zM125.333 32H24C10.745 32 0 42.745 0 56v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zm80 448H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm-24-424v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24zm24 264H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24z"/>
						</svg>					
					</button>
					<button 
						class="btn btn--white" 
						@click="sort = 'chart'" 
						:class="{is__active : sort === 'chart'}">
						<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="far" data-icon="chart-bar" class="svg-inline--fa fa-chart-bar fa-w-16" role="img" viewBox="0 0 512 512" width="20" height="20"><path fill="currentColor" d="M396.8 352h22.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-192 0h22.4c6.4 0 12.8-6.4 12.8-12.8V140.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h22.4c6.4 0 12.8-6.4 12.8-12.8V204.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zM496 400H48V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16zm-387.2-48h22.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8z"/></svg>						
					</button>
				</div>
			</div>
			<div class="row" v-if="sort === 'chart'">
				<div class="col-8 card">
					<app-bar-chart
						:title="`Revenu &amp; Dépenses ${filters.checked}`"
						:datas="calculatePath"
						:xVal="values.x"
						:yVal="values.y">
					</app-bar-chart>
				</div>
				<div class="col-4 card">
					<div class="card__header">
						<h2>Graph</h2>
					</div>
				</div>
			</div>
			<div class="row" v-if="sort === 'table'">
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
								<app-year-td
									v-for="(expense, i) in item.months"
									:expense="expense"
									:key="i"
									:id="expense.month + i"
									:year="filters.checked">
								</app-year-td>
							</tbody>
						</template>
						<template
							slot="tbody"
							v-else
							v-for="(item, key, i) in expenseArray">
							<app-cat-td :categories="item.months"></app-cat-td>		
						</template>
						<template 
							slot="tfooter"
							v-if="filters.type === 'year'">
							<tfoot>
								<tr>
									<td>Total</td>
									<td class="yellow">{{ totalSpended | devise }}</td>
									<td class="green">{{ totalEarned | devise  }}</td>
									<td></td>
								</tr>
							</tfoot>
						</template>
					</app-table>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import Header from '@/components/partials/Header.vue'
	import Sidebar from '@/components/partials/Sidebar.vue'
	import Footer from '@/components/partials/Footer.vue'
	import Table from '@/components/partials/Table.vue'
	import TdYear from '@/components/partials/YearTd.vue'
	import TdCat from '@/components/partials/CatTd.vue'
	import BarChart from '@/components/partials/BarChart.vue'

	import * as d3 from 'd3'
	import { appUtils } from '@/functionsUtils'
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
					y: ['earn', 'spend'],
				},
				sort: 'table',
				filters: {
					checked: '',
					type: 'year',
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
				expenses: 'Return_allExpenses',
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
			},
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
			},
			returnCurrentYear() {
				if(!this.expenses.length) return;
				let exp = []
				this.expenses.filter( expense => {
					if (expense.year === this.filters.checked) {
						exp = expense
					}
				})
				return exp
			},
			filteredDatas() {
				if (!this.expenses.length) return;
				let datas = []
				const primaryDatas = this.returnCurrentYear()
				if (primaryDatas) {
					let datas = primaryDatas.months.map( item => {
						return item = {
							earn: item.income,
							month: item.month,
							spend: item.outcome
						}
					})
					return datas
				}
			},

		},
		components: {
			appHeader: Header,
			appSidebar: Sidebar,
			appFooter: Footer,
			appTable: Table,
			appYearTd: TdYear,
			appCatTd: TdCat,
			appBarChart: BarChart,
		}
	}
</script>

<style lang="scss" scoped>
	.content > .row {
		&:first-child { margin-top: 2rem; }
	}

	strong { font-weight: 700; }
	.separator {
		width: 1px;
		height: 40px;
		background-color: rgb(234, 237, 244);
	}
	.filters {
		display: flex;
		align-items: center;
	}
	.row {
		justify-content: flex-start;
	}
	.card {
		justify-content: space-evenly;

		&--noStyle {
			background: none;
			border: none;
		}

		&--filter {
			justify-content: flex-end;

			.btn  {
				&:first-child { margin-right: 1rem; }
			}
		}
	}
	.form {
		&--inline {
			display: flex;
		}
		&__group {
			&--radio {
				position: relative;
				width: auto;
				max-width: 120px;

				input { border: none; }

				input, label {
					width: 120px;
				}

				input:disabled,
				input:disabled ~ label {
					cursor: not-allowed !important;
				}

				input[type="radio"] { 
					position: absolute;
					opacity: 0;
					height: 100%;
					cursor: pointer;

					&:checked {

						+ label {
							color: #4c84ff;
						}
					}
				}

				label {
					background-color: transparent;
					padding: 0.5em;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	label {
		> svg { margin-right: 0.5rem; }
	}

	.btn {
		&--transparent {
			border: 1px solid rgb(234, 237, 244)
		}

		&--white {
			background-color: rgb(255, 255, 255);
			border: 1px solid rgb(234, 237, 244);
			width: 50px;
			height: 50px;
			border-radius: 4px;
			color: rgb(220,220,220);

			&.is__active {
				background-color: rgb(76,132,255);
				color: rgb(255, 255, 255);
			}
		}
	}
</style>