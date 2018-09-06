<template>
    <div>
        <thead>
            <tr>
                <td v-for="month in months">{{ month }}</td>
            </tr>
        </thead>
        <tbody>
            <tr :id="id" v-for="(cat, key, index) in renderCat">
                <td>{{ cat }}{{key}}{{index}}</td>
                <td v-for="item in cat">{{ item.value }}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
            </tr>
        </tfoot>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import moment from 'moment'

	export default {
        data() {
            return  {
                editMode: false,
                inbank: '',
                months: [],
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
            renderCat() {
                console.log(this.catObject())
                const a = Object.keys(this.catObject()).map( key => this.catObject()[key] )
                console.log(a)
                return a
            }
        },
        methods: {
            catObject() {
                const arr = this.categories.map( item => {
                    return {
                        categories: item.categories,
                        month: item.month
                    }
                })  
                return arr.reduce( (item, next) => {
                    let cat = ''
                    let value = ''
                    
                    for( let key in next.categories ) {
                        cat = next.categories[key].name
                        value = next.categories[key].value

                        if( !item[cat] ) {
                            item[cat] = []
                        }
                        item[cat].push({
                            month: next.month,
                            value: value
                        })
                    }
                    return item
                }, {})       
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