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
                    v-for="(item, index) in expenses.items" 
                    :expense="item" 
                    :key="index"
                    :id="index">
                </app-item>
            </tbody>
            <tfoot>
                <tr>
                    <td>{{ expenses.items.length }} éléments enregistrés</td>
                    <td></td>
                    <td></td>
                    <td></td>
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
                sort: {
                    date: 'asc',
                    value: '',
                    type: '' 
                }
            }
        },
        computed: {
            ...mapGetters({
                expenses: 'Return_State',
            }),
        },
        components: {
            appItem: Item
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
</style>
