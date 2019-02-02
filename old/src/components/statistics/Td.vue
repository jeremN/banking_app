<template>
	<tr>
        <td><span>{{ expense.month | monthFr }}</span></td>
        <td><span>{{ expense.outcome | devise }}</span></td>
        <td><span>{{ expense.income | devise }}</span></td>
        <td>
            <span>{{ expense.inbank | devise }}</span>
            <button 
                class="list-item btn btn-edit"
                @click.prevent="editItem"
                v-if="!edit">
                Edit
                <i class="fas fa-edit"></i>
            </button>
            <button 
                class="list-item btn btn-edit"
                @click.prevent="saveItem"
                v-if="edit">
                Save
                <i class="fas fa-edit"></i>
            </button>
            <button 
            	class="list-item btn btn-edit"
            	@click.prevent="editItem"
                v-if="edit">
                Close
                <i class="fas fa-times"></i>
            </button>
            <input 
                id="expenseAmount" 
                type="text"
                name="amount"
                required
                v-model="inbank"
                v-if="edit">
        </td>
    </tr>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		props: {
			expense: {
				type: Object,
				required: true
			},
			id: {
				type: Number,
				required: true
			},
			year: {
				type: String || Number,
				required: true
			}
		},
		data() {
			return {
				edit: false,
				inbank: !this.expense.inbank ? '' : this.expense.inbank
			}
		},
		methods: {
            ...mapActions({
                editInBank: 'Edit_Inbank'
            }),
            editItem() {
                this.edit = !this.edit ? true : false
            },
            saveItem() {
                const selectedYear = this.year
                const month = this.expense.month
                const val = this.inbank
                this.editInBank({month, selectedYear, val})
                this.editItem()
                this.inbank = ''
            },
            itemType(type) {
                return type === 'outcome' ? 'Dépense' : 'Revenu'
            }
		}
	}
</script>

<style lang="scss" scoped>
	tr > td:last-child { 
		display: flex; 
		align-items: center;
		justify-content: space-evenly;
	}
</style>