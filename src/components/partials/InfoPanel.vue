<template>
	<div class="col-3">
		<div class="card">
			<small>Revenu du mois</small>
			<h2 class="card__title">{{ earning ? earning : 0 | parsedDevise }}<span class="green">+5.2%</span></h2>
		</div>
		<div class="card">
			<small>Dépense du mois</small>
			<h2 class="card__title">{{ spending ? spending : 0 | parsedDevise }} <span :class="[Math.sign(compare.slice(0, -1)) === -1 ? 'green' : 'red']"><b v-if="Math.sign(compare.slice(0,-1)) !== -1">+</b>{{ compare }}</span></h2>
		</div>
		<div class="card">
			<small>Dépense du jour</small>
			<h2 class="card__title">300,65</h2>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { appUtils } from '@/functionsUtils'
	import moment from 'moment'

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
                    if(currentYearItem[0].months !== []) return
                                
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
	}
</script>

<style lang="scss" scoped>
	.card {
		flex-direction: column;
		padding: 1rem;

		small {
			font-size: 0.75rem;
			color: rgb(212, 216, 223);
			margin: 0 0 1rem 0;
		}

		&__title { 
			span { margin-left: 0.75rem; }
		}

		&:first-child {
			margin-top: 4.75rem;
		}
	}
</style>