<template>
	<div class="dashboard">
		<app-header></app-header>
		<app-sidebar></app-sidebar>
		<main class="content">
			<div 
				class="row"
				v-if="expenses.length">
				<div class="col-6">
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
				<div class="col-6">
	                <div class="form-group form-group-radio">
	                    <input 
	                        class="form-field" 
	                        type="radio" 
	                        name="typeFilter"
	                        value="year"
	                        v-model="filters.type">
	                    <label for="annualFilter">Année</label>
	                </div>
	                <div class="form-group form-group-radio">
	                    <input 
	                        class="form-field" 
	                        type="radio" 
	                        name="typeFilter"
	                        value="cats"
	                        v-model="filters.type">
	                    <label for="annualFilter">Catégories</label>
	                </div>
				</div>
			</div>
			<div class="row">
				<div class="col-6">
					<div class="panel chart">
						
					</div>
				</div>
				<div class="col-6 col-offset-1">
					<div class="panel chart">
						
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

	import { appUtils } from '@/functionsUtils'
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				sort: {
					date: 'asc',
					value: '',
					type: ''
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
	                    'Décembre',
					],
					thead_2: [
						'Mois',
						'Dépenses',
						'Revenus',
						'Epargne'
					]
				},
				monthsOutput: []
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
			appTdCat: TdCat
		}
	}
</script>

<style lang="scss">
	
</style>