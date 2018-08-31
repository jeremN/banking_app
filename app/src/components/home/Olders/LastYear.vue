<template> 
    <div class="dashboard-main">
        <app-sidebar></app-sidebar>
        <div class="popin" v-if="popin.isActiv">
            <h2>Avertissement</h2>
            <p>{{ popin.message }}</p>
            <button
                @click.prevent=""
                type="button">
                Ok        
            </button>
        </div>
        <div class="filters">
            <div class="form-group form-group-radio" v-for="filter in filterArray">
                <input 
                        class="form-field" 
                        type="radio" 
                        name="statFilter" 
                        :value=filter
                        v-model="filters.checked">
                <label for="annualFilter">{{ filter }}</label>
            </div>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <td>Mois</td>
                        <td>Dépenses</td>
                        <td>Revenus</td>
                        <td>Montant</td>
                        <td>Réserves</td>
                    </tr>
                </thead>
                <tbody v-if="expenses.length"
                    v-for="item in expenseArray">
                    <app-item v-for="( expense, index ) in  item.months"
                        :expense="expense"
                        :key="index"
                        :id="index">
                    </app-item>
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td>{{ totalSpended | addDevise }}</td>
                        <td>{{ totalEarned | addDevise }}</td>
                        <td></td>
                        <td>filtre choisi: {{ filters.checked }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>           
    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Item from './Item.vue'
    import Sidebar from '../Sidebar.vue'

    export default {
        data() {
            return  {
                sort: {
                    date: 'asc',
                    value: '',
                    type: '' 
                },
                filters: {
                    checked: ''
                }
            }
        },
        filters: {
            addDevise(value) {
                return `${value}€`
            }
        },
        mounted() {
            this.filterArray
            this.expenseArray
        },
        computed: {
            ...mapGetters({
                expenses: 'Return_2017',
                popin: 'Return_Popin'
            }),
            expenseArray() {
                if(!this.expenses.length) return;
                return this.filteredArray()
            },
            filterArray() {
                if(!this.expenses.length) return;
                this.filters.checked = this.expenses[0].year 
                return this.expenses.map( expense => {
                   return expense.year
                })
            },
            totalEarned() { return parseFloat(this.getSumArray('income')).toFixed(2) },
            totalSpended() { return parseFloat(this.getSumArray('outcome')).toFixed(2) },
            totalInBank() {}
        },
        methods: {
            ...mapActions({
                postPrevExpenses: 'Post_PrevExpenses'
            }),
            getSumArray(key) {
                let tempArray = this.filteredArray()
                let newArray = []
                tempArray.filter( annual => annual.months.map( monthly => newArray.push(Number(monthly[key])) ) )
                return this.sum(newArray)
            },
            sum(array) {
                if(!array || !array.length) return;
                return array.reduce((a, b) => a + b )
            },
            substract(a, b) {

            },
            filteredArray() {
                return this.expenses.filter(expense => expense.year === this.filters.checked ? expense.months : false)
            }

        },
        components: {
            appItem: Item,
            appSidebar: Sidebar
        }
    }
	
</script>

<style lang="scss">
    .table-container {
        width: 100%;
        display: flex;
    }
    table {
        width: 100%;

        td { 
            background-color: #fff;
            padding: 0.5em 0.5em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        thead, tfoot {
            tr > td { 
                padding-top: 1em; 
                padding-bottom: 1em; 
            }
        }
    }
    thead {
        tr > td { background-color: #f9f8fd; }
    }
    tfoot {
        tr > td { background-color: #f8f7fd; }
    }
    .filters {
        display: flex;
    }
</style>
