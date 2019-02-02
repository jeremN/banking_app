<template>
	<div class="dashboard">
		<app-header></app-header>
		<app-sidebar></app-sidebar>
		<main class="content">
			<div class="row">
				<h1 class="content__title">Dashboard</h1>
				<app-form></app-form>
			</div>
			<div class="row">
			</div>
			<div class="row">
				<app-cards></app-cards>
				<div class="col-9">
					<app-table>
						<template slot="theader">
							<thead>
								<tr>
									<th v-for="(th, i) in table.thead">
										<div>
											{{ th }} 
											<div v-if="i !== table.thead.length - 1" class="table__sort">
												<button type="button" class="btn btn--transparent">
													<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="sort-up" class="svg-inline--fa fa-sort-up fa-w-10" role="img" viewBox="0 0 320 512" width="12">
														<path fill="currentColor" d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"/>
													</svg>
												</button>
												<button type="button" class="btn btn--transparent">
													<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="sort-down" class="svg-inline--fa fa-sort-down fa-w-10" role="img" viewBox="0 0 320 512" width="12">
														<path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"/>
													</svg>
												</button>
											</div>
										</div>
									</th>
								</tr>
							</thead>
						</template>
						<template
							slot="tbody"
							v-for="(item, i) in expenses.items">
							<tbody>
								<app-td :item="item" :id="i"></app-td>
							</tbody>
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
	import Form from '@/components/partials/newExpenseForm.vue'
	import Table from '@/components/partials/Table.vue'
	import Td from '@/components/partials/ExpenseTd.vue'
	import Cards from '@/components/partials/InfoPanel.vue'

	import { mapGetters } from 'vuex'
	import moment from 'moment'

	export default {
		data() {
			return {
				table: {
					thead: ['Type', 'Catégorie', 'Date', 'Montant', 'Actions'],
					tbody: ''

				},
				sort: {
					date: 'asc',
					value: '',
					type: ''
				},
				editMode: false,
				edit: {
					name: '',
					category: '',
					date: '',
					value: '',
					type: ''
				}
			}
		},
		computed: {
			...mapGetters({
				expenses: 'Return_State'
			}),
		},
		components: {
			appHeader: Header,
			appSidebar: Sidebar,
			appFooter: Footer,
			appForm: Form,
			appTable: Table,
			appTd: Td,
			appCards: Cards,
		}
	}
</script>

<style lang="scss" scoped> 
	.content > .row:first-child { margin-top: 2rem; }
	table {
		tbody {
			td:nth-child(3) {
				font-weight: 400;
			}
		}
	}
	.table {
		&__sort {
			display: flex;
			flex-direction: column;
			margin-left: 0.5rem;

			svg {
  				color: rgb(212, 216, 223);
			}
		}
	}
</style>