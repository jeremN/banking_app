<template>
	<div class="modal" v-if="modal.isActiv">
		<div class="card modal__container col-3">
			<div class="modal__header row">
				<h2>Modal title</h2>
		        <button 
		        	class="btn btn--close" 
		        	type="button"
		        	@click.prevent="closeModal">
		            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
		                <defs>
		                </defs>
		                <path d="M25,0C11.2,0,0,11.2,0,25s11.2,25,25,25s25-11.2,25-25S38.8,0,25,0z M25,45.2c-11.1,0-20.2-9-20.2-20.2S13.9,4.8,25,4.8s20.2,9,20.2,20.2S36.1,45.2,25,45.2z M35.3,18.7L29,25l6.3,6.3c0.5,0.5,0.5,1.2,0,1.7L33,35.3c-0.5,0.5-1.2,0.5-1.7,0L25,29l-6.3,6.3c-0.5,0.5-1.2,0.5-1.7,0L14.7,33c-0.5-0.5-0.5-1.2,0-1.7L21,25l-6.3-6.3c-0.5-0.5-0.5-1.2,0-1.7l2.3-2.3c0.5-0.5,1.2-0.5,1.7,0L25,21l6.3-6.3c0.5-0.5,1.2-0.5,1.7,0l2.3,2.3C35.7,17.5,35.7,18.3,35.3,18.7L35.3,18.7z"/>
		            </svg>
		        </button>
			</div>
			<div class="modal__content row">
				<p>{{ modal.message }}</p>
			</div>
			<div class="modal__footer row">
		        <button 
		        	class="btn btn--blue" 
		        	type="button"
		        	@click.prevent="confirmAction(modal.type)">
		        	Valider
		        </button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		computed: {
			...mapGetters({
				modal: 'Return_Popin'
			})
		},
		methods: {
			...mapActions({
              monthExpenses: 'Prepare_MonthExpenses',
              yearExpenses: 'Post_AnnualExpenses',
              closeModal: 'Close_Popin'
            }),
            confirmAction(type) {
            	if( type === 'year' ) {
        				this.monthExpenses(true)
            	}
            	else if(  type === 'month' ) {
        				this.monthExpenses()
            	}
            	else {
            		this.closeModal()
            	}
            }
		}
	}
</script>

<style lang="scss" scoped>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0, 0.5);
		display: flex;

		&__container {
			margin: auto;
			padding: 1rem;
			position: relative;
			border-radius: 0.5rem;
			display: flex;
			flex-direction: column;

			h2 {
				font-size: 1.25rem;
				font-weight: 700;
				margin-bottom: 2em;
			}

			p {
				line-height: 1.8;
				margin-bottom: 4em;
			}
		}

		&__header {
			position: relative;
		}

		&__header,
		&__content,
		&__footer { padding: 1rem 0; }

		.row { margin-bottom: 0; }

		.btn {

			&--close {
				position: absolute;
				top: 0;
				right: 0;
				width: auto;
			}
			&--blue { 
				height: 40px;
				border-radius: 0;
			}
		}
	}
</style>