<template>
    <div class="content-stats stats">
        <div class="stats-group">
            <p>
                revenus 
                <span v-if="earning">{{ earning | parsedDevise }}</span>
                <span v-else>0€</span>
            </p>
        </div>
        <div class="stats-group">
            <p>
                dépenses 
                <span v-if="spending">{{ spending | parsedDevise }} / {{ compare }}</span>
                <span v-else>0€</span>
            </p>
        </div>
        <div class="stats-group">
            <p>month<span>-22%</span></p>
        </div>
        <div class="stats-group">
            <p>last-month <span>{{ lastMonthExpense | parsedDevise }}</span></p>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Utilities    from '../../../Utilities'
    import moment       from 'moment'

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
                this.lastMonthExpense = this.prevMonthComparison()[0].outcome
                return parseFloat(this.comparison(this.spending, this.lastMonthExpense)).toFixed(2)+'%'
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
                return ( ( a - b ) / b ) * 100
            },
            prevMonthComparison() {
                const currentYearItem = this.expenses.expenses.filter( item => {
                    if( item.year === Utilities.currentYear() ) {
                        return item
                    }
                    return false
                })
                const previousMonthItem = currentYearItem[0].months.filter( obj => {
                    if( obj.month === moment(Utilities.currentDate(), 'DD/MMMM/YYYY').subtract(1, 'months').format('MMMM') ) {
                        return obj
                    }
                })
                return previousMonthItem
            }
        }
    }
	
</script>