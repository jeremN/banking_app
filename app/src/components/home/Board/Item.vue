<template>
    <tr>
        <td>{{ expense.name }}</td>
        <td>{{ expense.category }}</td>
        <td>{{ expense.date }}</td>
        <td>{{ expense.value }}€</td>
        <td>{{ itemType(expense.type) }}</td>
        <td style="display: flex;">
            <button 
            	class="list-item btn btn-delete"
            	@click.prevent="deleteItem">
                <i class="far fa-trash-alt"></i>
            </button>
            <button 
            	class="list-item btn btn-edit"
            	@click.prevent="editItem">
                <i class="fas fa-edit"></i>
            </button>
        </td>
    </tr>
</template>

<script>
	export default {
		props: ['expense'],
		methods: {
			deleteItem() {
				console.log(this.expense)
			},
			editItem() {

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
</style>