<template>
	<div class="autocomplete">
		<ul 
			class="autocomplete-results" 
			v-show="open && results.length">
			<li 
				class="autocomplete-result"
				v-for="(result, i) in results"
				:key="i"
				@click="setResult(result)">
				{{ result }}
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'

	export default {
		data() {
			return {
				search: '',
				results: [],
				open: false,
				arrowCounter: -1
			}
		},
		props: ['isOpen', 'searched'],
		watch: {
			searched() {
				if(this.searched) {
					this.open = true
					this.filterResults()
				}
			}
		},
		computed: {
			...mapGetters({
				suggestions: 'Return_Suggestions'
			})
		},
		methods: {
			...mapActions({
				setTerm: 'Get_Term'
			}),
			filterResults() {
				const key = this.searched.type

				this.results = this.suggestions[key].filter(item => item.toLowerCase().indexOf(this.searched.term.toLowerCase()) > -1)
			},
			setResult(result) {
				const payload = {
					type: this.searched.type,
					term: result
				}
				console.log(payload)
				this.setTerm(payload)
				this.open = false;
			},
			onArrowDown() {
				if( this.arrowCounter < this.results.length ) {
					this.arrowCounter = this.arrowCounter + 1
				}
			},
			onArrowUp() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.autocomplete {
		width: 100%;
		position: absolute;
		left: 0;
		top: 2.5em;
		&-results {
			padding: 0;
			margin: 0;
			background-color: white;
			min-height: 60px;
			overflow: auto;
		}
		&-result {
			list-style: none;
			text-align: left;
			padding: 0.25em;
			cursor: pointer;

			&:hover {
				background-color: grey;
				color: white;
			}
		}
	}
</style>