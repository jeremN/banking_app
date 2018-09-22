<template>
	<div class="card card-chart">
		<div class="card-heading">
			<h2>Dépenses par catégories</h2>
		</div>
		<div id="donutBody" class="card-body">
			<svg id="donut" class="donut" 
				:style="{ width: settings.width, height: settings.height }">
				<g :style="{transform: `translate(${settings.width / 2}px, ${settings.height / 2}px)`}">
				</g>
			</svg>
		</div>
	</div>
</template>

<script>

	import * as d3 from 'd3';
	import {mapGetters} from 'vuex'

	export default {
		data() {
			return {
				settings: {
					width: 500,
					height: 500,
					radius: null,
					color: null,
					pie: null,
					arc: null
				},
				datas: [
					{ month: 'January', value: 300 },
					{ month: 'February', value: 320 },
					{ month: 'March', value: 250 },
					{ month: 'April', value: 470 },
					{ month: 'May', value: 120 }
				]
			}
		},
		mounted() {
			this.drawChart()
		},
		methods: {
			initChart() {
				this.settings.radius = Math.min(this.settings.width, this.settings.height) / 2
				this.settings.pie = d3.pie().value( d => d.value ).sort(null)
				this.settings.color = d3.scaleOrdinal(d3.schemeCategory10);

				this.settings.arc = d3.arc()
					.innerRadius(this.settings.radius - 100)
					.outerRadius(this.settings.radius - 50)
			},
			drawChart() {
				this.initChart()

				let path = d3.select('#donut > g').selectAll('path')
					.data(this.settings.pie(this.datas))
					.enter().append('path')
						.attr('fill', (d,i) => this.settings.color(i))
						.attr('d', this.settings.arc)
						//.each( function(d) { this._current = d })
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	
</style>