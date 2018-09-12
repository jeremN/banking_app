<template>
    <div class="popin" v-if="popin.isActiv">
        <h2>Avertissement</h2>
        <p>{{ popin.message }}</p>
        <div>
	        <button
	            @click.prevent="confirmAction(popin.type)"
	            type="button">
	            Ok        
	        </button>
	        <button
	        	@click="closePopin"
	        	type="button">
	        	Fermer
	        </button>
        </div>
    </div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'

	export default {
		computed: {
			...mapGetters({
				popin: 'Return_Popin'
			})
		},
		methods: {
			...mapActions({
              monthExpenses: 'Prepare_MonthExpenses',
              yearExpenses: 'Post_AnnualExpenses',
              closePopin: 'Close_Popin'
            }),
            confirmAction(type) {
            	if( type === 'year' ) {
        				this.monthExpenses(true)
            	}
            	else if(  type === 'month' ){
        				this.monthExpenses()
            	}
            	else if( type === 'email' 
            		|| type === 'verif' 
            		|| type === 'password'
            		|| type === 'account' ) {
            		this.closePopin()
            	}
            }
		}
	}
</script>

<style lang="scss" scoped>
	.popin {
		position: fixed;
		background-color: #fff;
		height: auto;
		width: 320px;
		padding: 15px;
		top: calc(50% - 60px);
		left: calc(50% - 160px);
		display: flex;
		flex-flow: column wrap;
		align-items: center;
		justify-content: center;
		h2 {
			margin: 1em auto;
		}

		> div {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		button {
			margin: 1em 1em 0;
		}
	}
</style>
