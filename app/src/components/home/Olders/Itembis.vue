<template>
    <div>
        <tr :id="id" v-for="(cat, i) in categories">
        </tr>
        <span>{{ category }}</span>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import moment from 'moment'

	export default {
        data() {
            return  {
                editMode: false,
                inbank: ''
            }
        },
		props: ['categories', 'id'],
        filters: {
            addDevise(value) {
                return `${value}€`
            },
            localDateFr(date) {
                return moment(date, 'MMMM').locale('fr').format('MMMM')
            }
        },
        computed: {
            category() {
                const a = this.categories.map( item => {
                    console.log(item)
                    let b = this.mappedArray(item.categories)
                    console.log(b)
                })
                /*
                const a = this.categories.reduce( (item, next) => {
                    console.log('next', next.categories)
                    console.log('item', item)
                    let temp = this.mappedArray(next.categories)
                    let month = next.month
                    let cat = temp.name
                    console.log(cat, month, temp.val)
                    //console.log('temps is:', temp)
                    //console.log('item is:', item)
                    //console.log('next is:', next)

                    if( !item[cat] ) {
                        item[cat] = []
                    }

                    item[cat].push({month: month, value: temp.val})
                    return item
                }, {})
                console.log(a)
                */
            }
		},
        methods: {
            mappedArray(array) {
                let c
                array.map( item => {
                    return {
                        
                    }
                })

            }
        }
	}
	
</script>

<style lang="scss" scoped>
    .btn {
        cursor: pointer;
    }
    tbody {
        tr:nth-child(even) > td { background-color: #f1f1f9;  }
    }
</style>