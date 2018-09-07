<template>
    <tr :id="id">
        <td><span>{{ expense.month | monthFr }}</span></td>
        <td><span>{{ expense.outcome | devise }}</span></td>
        <td><span>{{ expense.income | devise }}</span></td>
        <td>
            <span>{{ expense.inbank | devise }}</span>
            <input 
                id="expenseAmount" 
                type="text"
                name="amount"
                required
                v-model="expense.value"
                v-if="editMode">
        </td>
        <td style="display: flex;">
            <button 
                class="list-item btn btn-edit"
                @click.prevent="editItem"
                v-if="!editMode">
                Edit
                <i class="fas fa-edit"></i>
            </button>
            <button 
            	class="list-item btn btn-edit"
            	@click.prevent="saveItem"
                v-if="editMode">
                Save
                <i class="fas fa-edit"></i>
            </button>
        </td>
    </tr>
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
		props: ['expense', 'id'],
        methods: {
            ...mapActions({
                editExpense: 'Edit_Expenses'
            }),
            editItem() {
                this.inbank = expense.inbank
                this.editMode = true
            },
            saveItem() {
                const item = this.edit
                const id = this.id
                this.editExpense({id, item})
                this.editMode = false
                this.edit = {
                    name: '',
                    category: '',
                    date: '',
                    value: '',
                    type: ''
                }
            },
            itemType(type) {
                return type === 'outcome' ? 'Dépense' : 'Revenu'
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