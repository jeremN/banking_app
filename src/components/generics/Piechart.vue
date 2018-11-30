<template>
	<div class="card-chart">
		<div class="card-header">
			<h2>{{ title }}</h2>
		</div>
		<div class="card-body">
			<svg :id="chartId"
				v-if="draw"
				:style="{ width: settings.width + margin.left + margin.right, height: settings.height + margin.top + margin.bottom, marginTop: margin.top }">
				<g :style="{ transform: `translate( ${settings.width / 2}px, ${settings.height / 2}px)`}"></g>
			</svg>
		</div>
		<div 
			class="tooltip" 
			v-if="tooltip.isVisible" 
			:style="{ transform: `translate(${tooltip.x}px, ${tooltip.y}px)` }">
			<p>
				{{ tooltip.title | monthFr }} 
				<br> 
				{{ tooltip.value | devise }} 
			</p>
		</div>
	</div>
</template>

<script>
	import * as d3 from 'd3';

	export default {
		data() {
			return {
				settings: {
					width: 600,
					height: 600,
					color: d3.scaleOrdinal(d3.schemeSpectral[3])
				},
				margin: {
					top: 10,
					right: 20,
					bottom: 10,
					left: 20
				},
				tooltip: {
					isVisible: false,
					title: '',
					value: '',
					x: '',
					y: ''
				},
			}
		},
		props: { 
			datas: Array,
			title: String,
			chartId: String
	 	},
	 	mounted() {
	 		this.draw()
	 	},
		methods: {
			draw() {
				let radius = Math.min(this.settings.width, this.settings.height) / 2

				let arc = d3.arc()
					.innerRadius(radius - 100)
					.outerRadius(radius - 20)

				let pie = d3.pie()
					.value(d => d[1])
					.sort(null);

				let path = d3.select(`#${this.chartId} > g`).selectAll('path')
					.data(pie(this.datas))
					.enter()
					.append('g')
						.append('path')
							.attr('d', arc)
							.attr('fill', (d, i) => this.settings.color(i))
			}
		}
	}
</script>

<style lang='scss' scoped>
	line {
		stroke: #f4f7f9;
		stroke-width: 2px;
	}
	text {
		font-size: 12px;
		font-weight: bold;
	}
	rect {
		transform-origin: 0 320px; 
	}
	.chart-y-ticks {
		display: flex;
		flex-direction: column-reversed;

		& > text {
			fill: #c9d4d7;
		}
	}
	.card {
		&-x-axis {
			text-align: center;
		}
		&-header {
			padding: 1em;
		}
		&-chart {
			.card-body {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;				
			}
		}
	}
	.tooltip {
		background-color: #fff;
		position: absolute;
		top: 0;
		left: 0;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0 4px 24px -1px rgba(0,0,0,0.1);
		padding: 1em;
		font-size: 14px;
	}
  .list-enter-active, 
  .list-leave-active {
    transition: all 1s;
    transform: scale(1,1)
  }
  .list-enter, 
  .list-leave-to /* .list-leave-active for <2.1.8 */ {
    opacity: 0;
    transform: scale(1,0);
  }
</style>