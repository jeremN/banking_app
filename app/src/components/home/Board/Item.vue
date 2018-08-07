<template>
    <div class="list-group-item list-body">
        <span class="list-item">{{ expense.name }}</span>
        <span class="list-item">{{ expense.category }}</span>
        <span class="list-item">{{ expense.date }}</span>
        <span class="list-item">{{ expense.amount }}</span>
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
    </div>
</template>

<script>
	export default {
		props: ['expense'],
		methods: {
			deleteItem() {
				console.log(this.expense)
			},
			editItem() {

			}
		}

	}
	
</script>