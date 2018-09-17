<template>
	<form class="content-form form"
		@submit.prevent="newExpense">
		<div class="form-group">
			<label for="expense">Nom</label>
			<input 
				id="expenseName" 
				type="text" 
				name="name"
				required
				v-model="expense.name"
				@input="onChange">
		</div>
		<div class="form-group">
			<label for="expenseCat">Catégorie</label>
			<input 
				id="expenseCat" 
				type="text" 
				name="category"
				required
				v-model="expense.category"
				@input="onChange">
		</div>
		<div class="form-group">
			<label for="expenseDate">Date</label>
			<input 
				id="expenseDate" 
				type="date" 
				name="date"
				v-model="expense.date"
				v-on:blur="formatDate">
		</div>
		<div class="form-group">
			<label for="expenseType">Type</label>
			<select 
				required
				v-model="expense.type">
				<option disabled value="">Choisir un type</option>
				<option value="outcome">Dépense</option>
				<option value="income">Revenu</option>
			</select>
		</div>
		<div class="form-group">
			<label for="expenseAmount">Montant</label>
			<input 
				id="expenseAmount" 
				type="number"
				step="0.01"
				name="amount"
				required
				v-model.number="expense.value">
		</div>
		<div class="form-group">
			<button class="btn btn-submit fas fa-plus" type="submit">
			</button>
		</div>
		<app-autocomplete 
			class="form-suggest"
			:searched="search">
		</app-autocomplete>
	</form>
</template>

<script>
	import {mapActions, mapGetters} 	from 'vuex'
	import moment 			from 'moment'
	import Autocomplete		from './Autocomplete.vue'

	export default {
		data() {
			return {
				expense: {
					name: '',
					category: '',
					date: moment().format('YYYY-MM-DD'),
					type: '',
					value: ''
				},
				search: {
					type: '',
					term: ''
				},
				suggest: ''

			}
		},
		watch: {
			setSuggestion() {
				let type = this.setSuggestion.type

				if( type === 'names' ) {
					this.expense.name = this.setSuggestion.term
				}
				else if( type === "categories" ) {
					this.expense.category = this.setSuggestion.term
				}
			}
		},
		computed: {
			...mapGetters({
				setSuggestion: 'Return_SearchTerm'
			})			
		},
		methods: {
			...mapActions({
				addExpenses:'Post_Expenses',
				searchTerm: 'Get_Term'
			}),
			formatDate() {
				return moment(this.expense.category, 'YYYY-MM-DD').format('DD/MM/YYYY')
			},
			newExpense() {
				this.addExpenses(this.expense)
				this.expense = {
					name: '',
					category: '',
					date: moment().format('YYYY-MM-DD'),
					type: '',
					value: ''
				}
			},
			onChange(evt) {
				const type = evt.target.name === 'name' ? 'names' : 'categories'
				const term = evt.target.name === 'name' ? this.expense.name : this.expense.category
				
				if( this.expense.name || this.expense.category ) {
					this.search = {
						type,
						term
					}
				}
			}
		},
		components: {
			appAutocomplete: Autocomplete
		}
	}
</script>

<style lang="scss" scoped>
	.form {
		position: relative;
	}
</style>