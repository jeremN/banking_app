<template>
	<div class="panel profil col-12">
		<div class="profil-row">
			<div class="col-2">
				<slot name="firstRowIcon"></slot>
			</div>
			<div class="col-10">			
				<slot name="firstRow"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	
</script>

<style lang="scss" scoped>
	.profil {
		margin: 0.5em auto;
		display: flex;
		position: relative;

		&-row {
			display: flex;
			flex-flow: row nowrap;
			flex-grow: 1;
			align-items: center;
			justify-content: center;
			padding: 1.5em 1em;
			font-size: 0.875rem;

			& > *:first-child { 
				border-right: 1px solid rgb(238,238,242);
				margin-right: 1em; 
				display: flex;
			}
			& > *:last-child {
				margin-right: 1em;
			}
		}
	}
</style>