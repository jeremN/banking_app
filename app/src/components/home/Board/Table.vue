<template> 
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Cat</td>
                    <td>Date</td>
                    <td>Montant</td>
                    <td>Type</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                <app-item v-if="expenses.items" 
                    v-for="expense, index in expenses.items" 
                    :expense="expense" 
                    :key="index">
                </app-item>
            </tbody>
            <tfoot>
                <tr>
                    <td>{{ total.expenses }}</td>
                    <td>{{ total.cat }}</td>
                    <td>{{ total.outcome }}</td>
                    <td>{{ total.income }}</td>
                </tr>
            </tfoot>
        </table>
    </div>           
</template>

<script>
    import {mapGetters} from 'vuex'
    import Item from './Item.vue'

    export default {
        data() {
            return  {
                total: {
                    expenses: '',
                    cat: '',
                    outcome: '',
                    income: ''
                }
            }
        },
        computed: {
            ...mapGetters({
                expenses: 'Return_Expenses'
            }),
            totals() {

            }
        },
        components: {
            appItem: Item
        }
    }
	
</script>

<style lang="scss" scoped>
    .table-container {
        width: 100%;
        display: flex;
    }
    table { width: 100%; }
</style>
