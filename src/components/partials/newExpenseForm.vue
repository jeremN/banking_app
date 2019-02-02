<template>
	<form id="addExpense" class="row card form" @submit.prevent="newExpense">
		<div class="form__group">
			<label for="expenseCategory">Categorie <small>(requis)</small></label>
			<input 
				id="expenseCategory"
				class="form__field"
				type="text" 
				name="category"
                v-model="expense.category"
                @input="onChange"
                @keydown.down="onArrowDown"
                @keydown.up="onArrowUp"
                @keydown.enter="onEnter">
	        <div class="form__suggest autocomplete" v-if="open && results.length">
	            <ul class="autocomplete__results">
	                <li 
	                    class="autocomplete__result"
	                    :class="{'isActive': i === arrowCounter}"
	                    v-for="(result, i) in results"
	                    :key="i"
	                    @click="setResult(result)">
	                    {{ result }}
	                </li>
	            </ul>
	        </div>
		</div>
		<div class="form__group">
			<label for="expenseDate">Date <small>(requis)</small></label>
			<input 
				id="expenseDate"
				class="form__field"
				type="date" 
				name="date"
                v-model="expense.date"
                v-on:blur="formatDate">
		</div>
		<div class="form__group">
			<label for="expenseCategory">Type <small>(requis)</small></label>
            <select 
                id="expenseType" 
                class="form__field" 
                name="type"
                v-model="expense.type">
                <option value="" disabled>Choisir un type</option>
                <option value="outcome">Dépense</option>
                <option value="income">Revenu</option>
            </select>
		</div>
		<div class="form__group">
			<label for="expenseValue">Montant <small>(requis)</small></label>
			<input 
				id="expenseValue"
				step="0.01"
				class="form__field"
				type="number" 
				name="value"
				v-model.number="expense.value">
		</div>
		<div class="form__group">
			<button type="submit" class="btn btn--blue">Ajouter</button>
		</div>
	</form>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
    import moment from 'moment'

    export default {
        data() {
            return {
                expense: {
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
                    category: '',
                    date: moment().format('YYYY-MM-DD'),
                    type: '',
                    value: ''
                }
            },
            onChange(evt) {
                const type = 'categories'
                const cat = this.expense.category
                
                if( this.expense.category ) {
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
		flex-flow: row nowrap !important;
		max-width: calc(75% - 1.5rem);
		margin: 0 1rem 1rem auto;

		&__group { position: relative; }

		&__suggest {
			position: absolute;
			left: 0;
			top: 100%;
			width: 100%;
			height: auto;
			max-height: 240px;
			overflow-y: auto;
			background-color: rgb(255,255,255);
			border: 1px solid rgb(220,220,220);

			li {
				padding: 0.5rem;

				&:hover {
					background-color: rgb(245,246,250);
				}
			}

		}
	}

	.btn {
		&--blue {
			flex-basis: 1;
			margin-top: 1.55rem;
			border-radius: 0;
		}
	}

	input, select, button {
		height: 32px;
	}
</style>