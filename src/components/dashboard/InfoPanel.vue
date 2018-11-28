<template>
    <app-card>
        <template slot="cardLeft">
            <h2>Revenus du mois:</h2>
            <br>
            <p v-if="earning">{{ earning | parsedDevise }}</p>
            <p v-else>0€</p>
        </template>
        <template slot="cardRight">
            <h2>Dépenses du mois:</h2>
            <br>
            <p v-if="spending">{{ spending | parsedDevise }}</p>
            <p v-else>0€</p>
        </template>
        <template slot="cardBottom">
            <h2>Variations <small>mois précédent/ mois en cours</small>:</h2>
            <br>
            <p>
                <span :class="[Math.sign(compare.slice(0, -1)) === -1 ? 'green' : 'red']"><b v-if="Math.sign(compare.slice(0,-1)) !== -1">+</b>{{ compare }}</span>
                <span></span>
            </p>
        </template>
    </app-card>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { appUtils } from '@/functionsUtils'
	import moment from 'moment'

    import Card from '@/components/generics/Card.vue'

	export default {
        data() {
            return {
                lastMonthExpense: ''
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
            earning() {
                return this.sum(this.resultByType("income"))  
            },
            spending() {
                return this.sum(this.resultByType("outcome"))  
            },
            compare() {
                this.lastMonthExpense = this.prevMonthComparison()
                return parseFloat(this.comparison(this.lastMonthExpense, this.spending)).toFixed(2)+'%'
            }
        },
        methods: {
            resultByType(type) {
                if( !this.expenses.items )  return;
                let tempArray = []
                this.expenses.items.find( a => {
                    if (a.type === type) {
                        tempArray.push(Number(a.value) ) 
                    }  
                })
                return tempArray
            },
            sum(array) {
                if( !array || !array.length ) return;
                return array.reduce((a, b) => a + b )
            },
            comparison(a, b) {
                if( a === undefined 
                    || b === undefined
                    || a === null
                    || b === null ) {
                    return 0
                }
                return ( ( b - a) / a ) * 100
            },
            prevMonthComparison() {
                let currentYearItem = null,
                    previousMonthItem = 0

                currentYearItem = this.expenses.expenses.filter( item => {
                    if( item.year === appUtils.currentYear() ) {
                        return item
                    }
                    return false
                })

                if( currentYearItem.length ) {                    
                    previousMonthItem = currentYearItem[0].months.filter( obj => {
                        if( obj.month === moment(appUtils.currentDate(), 'DD/MMMM/YYYY').subtract(1, 'months').format('MMMM') ) {
                            return obj
                        }
                    })
                    return previousMonthItem[0].outcome
                }
                else {
                    return previousMonthItem
                }
            }
        },
        components: {
            appCard: Card
        }
	}
</script>

<style lang="scss">
	
</style>