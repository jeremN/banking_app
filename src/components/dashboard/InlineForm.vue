<template>
    <form 
        id="addExpense" 
        class="form form-inline panel"
        @submit.prevent="newExpense">
        <div class="form-group">
            <label class="form-label" for="expenseName">Nom <small>(requis)</small></label>
            <input 
                id="expenseName" 
                class="form-field" 
                type="text" 
                name="name"
                v-model="expense.name"
                @input="onChange"
                @keydown.down="onArrowDown"
                @keydown.up="onArrowUp"
                @keydown.enter="onEnter">
        </div>
        <div class="form-group">
            <label for="expenseCategory" class="form-label">Catégorie <small>(requis)</small></label>
            <input 
                id="expenseCategory" 
                class="form-field" 
                type="text" 
                name="category"
                v-model="expense.category"
                @input="onChange"
                @keydown.down="onArrowDown"
                @keydown.up="onArrowUp"
                @keydown.enter="onEnter">
        </div>
        <div class="form-group">
            <label for="expenseDate" class="form-label">Date</label>
            <input 
                id="expenseDate" 
                class="form-field" 
                type="date" 
                name="date"
                v-model="expense.date"
                v-on:blur="formatDate">
        </div>
        <div class="form-group">
            <label for="expenseType" class="form-label">Type <small>(requis)</small></label>
            <select 
                id="expenseType" 
                class="form-field" 
                name="type"
                v-model="expense.type">
                <option value="" disabled>Choisir un type</option>
                <option value="outcome">Dépense</option>
                <option value="income">Revenu</option>
            </select>
        </div>
        <div class="form-group">
            <label for="expenseValue" class="form-label">Montant <small>(requis)</small></label>
            <input 
                id="expenseValue" 
                class="form-field" 
                type="number" 
                step="0.01" 
                name="value"
                v-model.number="expense.value">
        </div>
        <div class="form-group">
            <button class="btn btn-blue" type="submit">
                Ajouter
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
	import { mapActions, mapGetters } from 'vuex'
    import moment from 'moment'

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

<style lang="scss">
	
</style>