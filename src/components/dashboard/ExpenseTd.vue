<template>
	<tr :key=id :id=id :data-type="item.type">
		<td>
			<span v-if="!editMode">{{ item.name }}</span>
			<input 
				id="expenseName" 
				type="text" 
				name="name"
				v-model="item.name"
				v-if="editMode">
		</td>
		<td>
			<span v-if="!editMode">{{ item.category }}</span>
			<input 
				id="expenseName" 
				type="text" 
				name="name"
				v-model="item.category"
				v-if="editMode">
		</td>
		<td>
			<span v-if="!editMode">{{ item.date | formatDate }}</span>
			<input 
				id="expenseDate" 
				type="date" 
				name="date"
				v-model="item.date"
				v-on:blur="dateFormat"
				v-if="editMode">
		</td>
		<td>
			<span v-if="!editMode">{{ item.value | devise }}</span>
			<input 
				id="expenseAmout" 
				type="text" 
				name="amout"
				v-model="item.value"
				v-if="editMode">
		</td>
		<td>
			<span v-if="!editMode">{{ item.type | translateType }}</span>
			<select 
				v-if="editMode"
				v-model="item.type">
	            <option disabled value="">Choisir un type</option>
	            <option value="outcome">Dépense</option>
	            <option value="income">Revenu</option>
			</select>
		</td>
        <td>
            <button 
            	type="button" 
            	class="btn btn-transparent"
            	@click.prevent="editItem"
            	v-if="!editMode">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="20" height="20" viewBox="0 0 25 25" enable-background="new 0 0 25 25" xml:space="preserve">
                    <defs>
                    </defs>
                    <path d="M14.2,4.6l6.3,6.3L6.9,24.4L1.3,25c-0.7,0.1-1.4-0.5-1.3-1.3l0.6-5.6L14.2,4.6L14.2,4.6z M24.3,3.6l-2.9-2.9c-0.9-0.9-2.4-0.9-3.3,0l-2.8,2.8l6.3,6.3l2.8-2.8C25.2,6,25.2,4.5,24.3,3.6L24.3,3.6z"/>
                </svg>

            </button>
            <button 
            	type="button" 
            	class="btn btn-transparent"
            	@click.prevent="deleteItem(this)"
            	v-if="!editMode">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="20" height="23" viewBox="0 0 25 28.6" enable-background="new 0 0 25 28.6" xml:space="preserve">
                        <defs>
                        </defs>
                        <path d="M10.7,10.5v12.1c0,0.4-0.3,0.7-0.7,0.7H8.7c-0.4,0-0.7-0.3-0.7-0.7V10.5c0-0.4,0.3-0.7,0.7-0.7H10C10.4,9.8,10.7,10.1,10.7,10.5z M16.3,9.8H15c-0.4,0-0.7,0.3-0.7,0.7v12.1c0,0.4,0.3,0.7,0.7,0.7h1.3c0.4,0,0.7-0.3,0.7-0.7V10.5C17,10.1,16.7,9.8,16.3,9.8z M23.7,4.5c0.7,0,1.3,0.6,1.3,1.3v0.7c0,0.4-0.3,0.7-0.7,0.7h-1.1v18.8c0,1.5-1.2,2.7-2.7,2.7H4.5c-1.5,0-2.7-1.2-2.7-2.7V7.1H0.7C0.3,7.1,0,6.8,0,6.5V5.8c0-0.7,0.6-1.3,1.3-1.3h4.2l1.9-3.2C7.9,0.5,8.7,0,9.7,0h5.6c0.9,0,1.8,0.5,2.3,1.3l1.9,3.2H23.7z M8.6,4.5h7.8l-1-1.6c-0.1-0.1-0.2-0.2-0.3-0.2H9.9c-0.1,0-0.2,0.1-0.3,0.2L8.6,4.5z M20.5,7.1H4.5v18.4c0,0.2,0.1,0.3,0.3,0.3h15.4c0.2,0,0.3-0.1,0.3-0.3V7.1z"/>
                    </svg>
            </button>
            <button 
            	type="button" 
            	class="btn btn-transparent"
            	@click.prevent="saveItem"
            	v-if="editMode">
				<svg version="1.1"
					 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
					 x="0px" y="0px" width="25px" height="25px" viewBox="0 0 25 25" enable-background="new 0 0 25 25" xml:space="preserve">
					<defs>
					</defs>
					<path d="M24.2,5.5l-4.7-4.7C19,0.3,18.4,0,17.6,0h-15C1.2,0,0,1.2,0,2.7v19.6C0,23.8,1.2,25,2.7,25h19.6c1.5,0,2.7-1.2,2.7-2.7v-15C25,6.6,24.7,6,24.2,5.5L24.2,5.5z M15.2,2.7v4.5H8V2.7H15.2z M22,22.3H3c-0.2,0-0.3-0.1-0.3-0.3V3c0-0.2,0.1-0.3,0.3-0.3h2.3v5.8c0,0.7,0.6,1.3,1.3,1.3h9.8c0.7,0,1.3-0.6,1.3-1.3V2.9l4.4,4.4c0.1,0.1,0.1,0.1,0.1,0.2V22C22.3,22.2,22.2,22.3,22,22.3L22,22.3zM12.5,11.2c-2.7,0-4.9,2.2-4.9,4.9S9.8,21,12.5,21s4.9-2.2,4.9-4.9S15.2,11.2,12.5,11.2z M12.5,18.3c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S13.7,18.3,12.5,18.3z"/>
				</svg>
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
		props: ['item', 'id'],
        filters: {
        },
        methods: {
            ...mapActions({
                deleteExpense: 'Delete_Expenses',
                editExpense: 'Edit_Expenses'
            }),
            dateFormat() {
                return moment(this.item.category, 'YYYY-MM-DD').format('DD/MM/YYYY')
            },
            deleteItem() { this.deleteExpense(this.id) },
            editItem() {
                this.edit = {
                    name: this.item.name,
                    category: this.item.category,
                    date: this.item.date,
                    value: this.item.value,
                    type: this.item.type
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