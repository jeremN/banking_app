<template>
    <tr :id=id :data-type="expense.type">
        <td>
            <span v-if="!editMode">{{ expense.name }}</span>
            <input 
                id="expenseName" 
                type="text" 
                name="name"
                v-model="expense.name"
                v-if="editMode">
        </td>
        <td>
            <span v-if="!editMode">{{ expense.category }}</span>
            <input 
                id="expenseCat" 
                type="text" 
                name="category"
                required
                v-model="expense.category"
                v-if="editMode">
        </td>
        <td>
            <span v-if="!editMode">{{ expense.date | formatDate }}</span>
            <input 
                id="expenseDate" 
                type="date" 
                name="date"
                v-model="expense.date"
                v-on:blur="dateFormat"
                v-if="editMode">
        </td>
        <td>
            <span v-if="!editMode">{{ expense.value | devise}}</span>
            <input 
                id="expenseAmount" 
                type="text"
                name="amount"
                required
                v-model="expense.value"
                v-if="editMode">
        </td>
        <td>
            <span v-if="!editMode">{{ expense.type | translateType }}</span>
            <select 
                required
                v-model="expense.type"
                v-if="editMode">
                <option disabled value="">Choisir un type</option>
                <option value="outcome">Dépense</option>
                <option value="income">Revenu</option>
            </select>
        </td>
        <td style="display: flex;">
            <button 
            	class="list-item btn btn-delete"
            	@click.prevent="deleteItem(this)">
                <i class="far fa-trash-alt"></i>
            </button>
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
    import moment       from 'moment'

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
		props: ['expense', 'id'],
        filters: {
        },
        methods: {
            ...mapActions({
                deleteExpense: 'Delete_Expenses',
                editExpense: 'Edit_Expenses'
            }),
            dateFormat() {
                return moment(this.expense.category, 'YYYY-MM-DD').format('DD/MM/YYYY')
            },
            deleteItem() { this.deleteExpense(this.id) },
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