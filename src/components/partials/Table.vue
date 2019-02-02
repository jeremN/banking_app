<template>
	<table>
		<slot name="theader"></slot>
		<slot name="tbody"></slot>
		<slot name="tfooter"></slot>
	</table>
</template>
<style lang="scss">
	table {
		width: 100%;
		table-layout: fixed;
	}
	thead th > div {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>