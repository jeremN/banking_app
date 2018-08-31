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
                <tbody>
                    <app-item v-if="expenses.length" 
                        v-for="item in expenseArray" 
                        :expense="item"> 
                    </app-item>
                </tbody>
                <tfoot>
                    <tr>
                        <td>{{ expenses.length }} éléments enregistrés</td>
                        <td>{{ filters.checked }}</td>
                        <td></td>
                        <td></td>
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
        mounted() {
            this.filterArray
        },
        computed: {
            ...mapGetters({
                expenses: 'Return_2017',
                popin: 'Return_Popin'
            }),
            expenseArray() {
                if(!this.expenses.length) return;
                return this.expenses.filter(expense => {
                    if(expense.year === this.filters.checked) {
                        console.log(expense.months)
                        return expense.months
                    }
                })
            },
            filterArray() {
                if(!this.expenses.length) return;
                this.filters.checked = this.expenses[0].year 
                return this.expenses.map( expense => {
                   return expense.year
                })
            }
        },
        methods: {
            ...mapActions({
                postPrevExpenses: 'Post_PrevExpenses'
            })
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

        tr > td { 
            background-color: #fff;
            padding: 0.5em 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        thead, tfoot {
            tr > td { padding: 1em 0; }
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
