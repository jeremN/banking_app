<template>
  <div>
    <thead>
      <tr>
        <td>Catégorie</td>
        <td 
          :id=month 
          v-for="month in outputMonths"> 
          {{ month | monthFr }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr 
        :key="index"
        :id="index"
        v-for="(cat, index) in renderCat">
        <td>{{ index }}</td>
        <td 
          v-for="month in outputMonths">
          {{ elementSelector(cat, month) | devise}}
        </td>
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
  import moment       from 'moment'

  export default {
    data() {
      return  {
        editMode: false,
        inbank: '',
        months: [],
      }
    },
    props: ['categories', 'id'],
    computed: {
      renderCat() {
        return this.catObject()
      },
      outputMonths() {
        //https://gist.github.com/telekosmos/3b62a31a5c43f40849bb, delete duplicate node
        return this.months.reduce((x,y) => x.includes(y) ? x : [...x, y], []);            
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
            this.months.push(next.month)
          }
          return item
        }, {})       
      },
      elementSelector(array, string) {
        let val = 0
        for( let key in array ) {
          if( string === array[key].month ) {
            val = array[key].value
          }
        }
        return val
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