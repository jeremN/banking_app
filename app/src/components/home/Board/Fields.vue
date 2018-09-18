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
				@input="onChange"
				@keydown.down="onArrowDown"
				@keydown.up="onArrowUp"
				@keydown.enter="onEnter">
		</div>
		<div class="form-group">
			<label for="expenseCat">Catégorie</label>
			<input 
				id="expenseCat" 
				type="text" 
				name="category"
				required
				v-model="expense.category"
				@input="onChange"
				@keydown.down="onArrowDown"
				@keydown.up="onArrowUp"
				@keydown.enter="onEnter">
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
		<div class="form-suggest autocomplete">
			<ul 
				class="autocomplete-results" 
				v-show="open && results.length">
				<li 
					class="autocomplete-result"
					:class="{'isActive': i === arrowCounter}"
					v-for="(result, i) in results"
					:key="i"
					@click="setResult(result)">
					{{ result }}
				</li>
			</ul>
		</div>
	</form>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import moment 					from 'moment'

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
					cat: ''
				},
				suggest: '',
				results: [],
				open: false,
				arrowCounter: -1
			}
		},
		mounted() {
			document.addEventListener('click', this.handleOutsideClick)
		},
		destroyed() {
			document.removeEventListener('click', this.handleOutsideClick)
		},
		computed: {
			...mapGetters({
				suggestions: 'Return_Suggestions',
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
				const cat = evt.target.name === 'name' ? this.expense.name : this.expense.category
				
				if( this.expense.name || this.expense.category ) {
					this.search = {
						type,
						cat
					}
				}
				this.open = true;
				this.filterResults()
			},
			filterResults() {
				const key = this.search.type

				this.results = this.suggestions[key].filter(item => item.toLowerCase().indexOf(this.search.cat.toLowerCase()) > -1)
			},
			setResult(result) {
				const type = this.search.type

				if( type === 'names' ) {
					this.expense.name = result
				}
				else if( type === "categories" ) {
					this.expense.category = result
				}

				this.open = false
				this.search = {
					type: '',
					cat: ''
				}

			},
			onArrowDown() {
				if( this.arrowCounter < this.results.length ) {
					this.arrowCounter = this.arrowCounter + 1
				}
			},
			onArrowUp() {
				if( this.arrowCounter > 0 ) {
					this.arrowCounter = this.arrowCounter - 1
				}
			},
			onEnter() {
				this.suggest = this.results[this.arrowCounter]
				this.setResult(this.suggest)
				this.arrowCounter = -1
			},
			handleOutsideClick(evt) {
				if( !this.$el.contains(evt.target) ) {
					this.open = false
					this.arrowCounter = -1
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.form {
		position: relative;
	}
	.autocomplete {
		width: 100%;
		position: absolute;
		left: 0;
		top: 2.5em;
		&-results {
			padding: 0;
			margin: 0;
			background-color: white;
			min-height: 60px;
			overflow: auto;
		}
		&-result {
			list-style: none;
			text-align: left;
			padding: 0.25em;
			cursor: pointer;
			
			&:hover,
			&.isActive {
				background-color: grey;
				color: white;
			}
		}
	}
</style>