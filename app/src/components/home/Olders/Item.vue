<template>
    <tr>
        <td>
            <span v-if="!editMode">{{ expense.month }}</span>
            {{ expense }}
        </td>
        <td>
            <span v-if="!editMode">{{ expense.outcome | addDevise }}</span>
            <input 
                id="expenseCat" 
                type="text" 
                name="category"
                required
                v-model="expense.category"
                v-if="editMode">
        </td>
        <td>
            <span v-if="!editMode">{{ expense.income | addDevise}}</span>
            <input 
                id="expenseAmount" 
                type="text"
                name="amount"
                required
                v-model="expense.value"
                v-if="editMode">
        </td>
        <td>
            <span>{{ expense.inbank | addDevise }}</span>
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
                edit: {
                    name: '',
                    category: '',
                    date: '',
                    value: '',
                    type: ''
                }
            }
        },
		props: ['expense'],
        filters: {
            addDevise(value) {
                return `${value}€`
            }
        },
        methods: {
            ...mapActions({
                editExpense: 'Edit_Expenses'
            }),
            editItem() {
                this.edit = {
                    name: this.expense.name,
                    category: this.expense.category,
                    date: this.expense.date,
                    value: this.expense.value,
                    type: this.expense.type
                }
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