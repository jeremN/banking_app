<template>
    <div class="panel card">
        <div class="card-row col-6">
        	<slot name="cardLeft"></slot>
        </div>
        <div class="card-row col-6">
        	<slot name="cardRight"></slot>
        </div>
        <div v-if="hasSlotBottom" class="card-row col-12">
        	<slot name="cardBottom"></slot>
        </div>
    </div>
</template>

<script>
	export default {
		computed: {
			hasSlotBottom() {
				return this.$slots.cardBottom
			}
		}
	}
</script>

<style lang="scss">
	.panel {
		background-color: rgb(255,255,255);
		border: 1px solid #eeeef2;
		box-shadow: 0 0 16px 4px #eeeef2;
	}

	.card {
		margin-top: 1.5rem;
		display: flex;
		flex-flow: row wrap;

		h2 {
			font-size: 0.875rem;
			font-weight: 700;
			color: rgb(207,213,221);
		}
		p {
			color: rgb(92,88,121);
			font-size: 1.125rem;
			font-weight: 700;
		}

		&-row {
			padding: 1.5rem 2rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			&:nth-child(2) {
				border-left: 1px solid rgb(238,238,242);
			}
			&:last-child {
				align-items: center;
				border-top: 1px solid rgb(238,238,242);
			}
		}
	}
</style>