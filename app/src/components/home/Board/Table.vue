<template>            
	<div class="content-list list-group">
        <div class="list-group-item list-heading">
            <span class="list-item">Name</span>
            <span class="list-item">Cat</span>
            <span class="list-item">Date</span>
            <span class="list-item">Montant</span>
        </div>
        <app-item 
            v-for="expense, index in expenses.items" 
            :expense="expense" 
            :key="index">
        </app-item>
        <div class="list-group-item list-footer">
            <span class="list-item">{{ total.expenses }}</span>
            <span class="list-item">{{ total.cat }}</span>
            <span class="list-item">{{ total.outcome }}</span>
            <span class="list-item">{{ total.income }}</span>
        </div>
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

            },
        },
        components: {
            appItem: Item
        }
    }
	
</script>
