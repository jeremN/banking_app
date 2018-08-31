<template>
    <div class="content-stats stats">
        <div class="stats-group">
            <p>
                revenus 
                <span v-if="expenses.items.length">{{ earnings | addDevise }}</span>
                <span v-else>0€</span>
            </p>
        </div>
        <div class="stats-group">
            <p>
                dépenses 
                <span v-if="expenses.items.length">{{ spending | addDevise }}</span>
                <span v-else>0€</span>
            </p>
        </div>
        <div class="stats-group">
            <p>month <span>-22%</span></p>
        </div>
        <div class="stats-group">
            <p>last-month <span>+2.4%</span></p>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        filters: {
            addDevise(value) {
                return `${value}€`
            }
        },
        mounted() {
            this.spending
            this.earning
        },
        computed : {
            ...mapGetters({
                expenses: 'Return_State'
            }),
            earnings() {
                return this.sum(this.resultByType("income"))  
            },
            spending() {
                return this.sum(this.resultByType("outcome"))  
            },
            compare() {

            }
        },
        methods: {
            resultByType(type) {
                if(!this.expenses.items)  return;
                let tempArray = []
                this.expenses.items.find( a => {
                    if (a.type === type) {
                        tempArray.push(Number(a.value) ) 
                    }  
                })
                return tempArray
            },
            sum(array) {
                if(!array || !array.length) return;
                return array.reduce((a, b) => a + b )
            },
            prevMonthComparison() {
                
            }
        }
    }
	
</script>