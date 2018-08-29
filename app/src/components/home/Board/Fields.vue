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
				v-model="expense.name">
		</div>
		<div class="form-group">
			<label for="expenseCat">Catégorie</label>
			<input 
				id="expenseCat" 
				type="text" 
				name="category"
				required
				v-model="expense.category">
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
				type="text"
				name="amount"
				required
				v-model="expense.value">
		</div>
		<div class="form-group">
			<button 
				class="btn btn-submit fas fa-plus" 
				type="submit">
			</button>
		</div>
	</form>
</template>

<script>
	import {mapActions} from 'vuex'
	import moment from 'moment'

	export default {
		data() {
			return {
				expense: {
					name: '',
					category: '',
					date: '',
					type: '',
					value: ''
				}
			}
		},
		methods: {
			...mapActions({
				addExpenses:'Post_Expenses'
			}),
			formatDate() {
				return moment(this.expense.category, 'YYYY-MM-DD').format('DD/MM/YYYY')
			},
			newExpense() {
				this.addExpenses(this.expense)
				this.expense = {
					name: '',
					category: '',
					date: '',
					type: '',
					value: ''
				}
			},
		}
	}
</script>