<template>
	<div class="dashboard">
		<app-header></app-header>
		<app-sidebar></app-sidebar>
		<main class="content">
			<app-inline-form></app-inline-form>
			<div class="row">
				<div class="col-3">
					<app-info-panel></app-info-panel>
				</div>
				<div class="col-9 col-offset-1">
					<!--<app-expense-table></app-expense-table>-->
					<app-table>
						<template slot="theader">
							<tr>
								<th v-for="th in table.thead">{{ th }}</th>
							</tr>
						</template>
						<template 
							slot="tbody" 
							v-for="(item, index) in expenses.items"
							:id="index">
							<app-td :item="item" :id="index"></app-td>
						</template>
					</app-table>
				</div>
			</div>
		</main>
		<app-footer></app-footer>
	</div>
</template>

<script>
	import Header from '@/components/Header.vue'
	import Sidebar from '@/components/Sidebar.vue'
	import Table from '@/components/generics/Table.vue'
	import Footer from '@/components/Footer.vue'
	import Inlineform from '@/components/dashboard/InlineForm.vue'
	import Infopanel from '@/components/dashboard/InfoPanel.vue'
	import Td from '@/components/dashboard/ExpenseTd.vue'

	import { mapGetters } from 'vuex'
	import moment from 'moment'

	export default {
		data() {
			return {
				table: {
					thead: ['Nom', 'Catégorie', 'Date', 'Montant', 'Type', 'Actions'],
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
			appInlineForm: Inlineform,
			appInfoPanel: Infopanel,
			appTable: Table,
			appTd: Td
		}
	}
</script>

<style lang="scss">
	td {
		&.isEdited {
			> span { display: none; }
			> *:not(span) { display: flex; }
		}
		&.notEdited {
			> span { display: flex; }
			> *:not(span) { display: none; }
		}
	}
	.dashboard {
		display: grid;
		grid-template-columns: 70px 1fr;
		grid-template-rows: 70px 1fr 1fr;
		grid-column-gap: 1rem;
		background-color: rgb(245,246,250);
		height: 100%;
	}
	.content {
		grid-column-start: 2;
		grid-row-start: 2;
		grid-row-end: 3;
		padding: 1rem;
	}

	.card { 

		&-row {

			&:nth-child(2) {
				border-left: 1px solid rgb(238,238,242);
			}
			&:last-child {
				align-items: center;
				border-top: 1px solid rgb(238,238,242);
			}
		}
	}
</style>