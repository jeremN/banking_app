<template>
	<div class="card card-chart">
		<div class="card-heading">
			<h2 v-if="this.datas">
				<span class="color-blue"></span> Dépenses de l'année 2018
			</h2>
			<h2 v-else>No data to show</h2>
		</div>
		<div class="card-body">
			<svg 
				id="barChart" 
				:style="{ width: settings.width + margin.left + margin.right, height: settings.height +margin.top + margin.bottom}">
				<g 
					class="chart-y-axis"
					:style="{transform: `translate(${margin.left}px, ${margin.top}px)`}"
					>
					<template v-for="(d, i) in arrayY">
						<g
							class="chart-y-ticks"
							:style="{transform: `translate(0, ${settings.height / 10 * i}px)`}"
							>
							<line x1="0" :x2="settings.width"></line>
							<text x="-36" dy="0.32em">{{ d * 10 }}%</text>
						</g>
					</template>
				</g>
				<transition-group 
					v-if="datas != null"
					appear
					name="list"
					mode="out-in"
					tag="g" 
					:style="{transform: `translate(${margin.left}px ,${margin.top}px)`}">
					<rect 
						class="bar"
						v-for="(d, i) in chartData"
						:x="scales.x(d.month)"
						:y="scales.y(d.value)"
						:width="scales.x.bandwidth()"
						:height="settings.height - scales.y(d.value)"
						:fill="fillColor(d.month)"
						:key="d.month"
						@mouseover="showTooltip(d.month, d.value)"
						@mouseleave="tooltip.isVisible = false"
					>
					</rect>
				</transition-group>
				<g class="chart-x-axis" :style="{transform: `translate(0 ,${settings.height}px)`}">
					<g 
						class="chart-x-label" 
						v-for="(d, i) in chartData" 
						:style="{transform: `translate(${(settings.width - margin.left - margin.right)}px, ${-settings.height + (i * 20)}px)`}"
						>
						<rect x="-5" y="6" width="10" height="10" :fill="fillColor(d.month)"></rect>
						<text x="10" y="6" dy="0.71em">{{ d.month }}</text>
					</g>
				</g>
			</svg>
		</div>
		<div class="tooltip" v-if="tooltip.isVisible" :style="{ transform: `translate(${tooltip.x - 10}px, ${tooltip.y - 10}px)` }">
			<p>{{ tooltip.title }}: {{ tooltip.value }}%</p>
		</div>
	</div>
</template>

<script>
	import * as d3 from 'd3';

	export default {
		props: {
			datas: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				settings: {
					width: 590,
					height: 320,
				},
				margin: {
					top: 10,
					right: 20,
					bottom: 30,
					left: 40
				},
				tooltip: {
					isVisible: false,
					title: '',
					value: '',
					x: '',
					y: ''
				},
				sum: null,
				chartData: null,
				scales: null,
			}
		},
		watch: {
			datas() {
				this.calculatePath(this.datas)
			}
		},
		methods: {
			fillColor(month) {
				return this.colors[month];
			},
			convertInPercent(data) {
				this.sum = data.reduce( (a, b) => a + b.value, 0)
				return data.map( x => {
					return { month: x.month, value: parseFloat(x.value / this.sum * 100).toFixed(2) } 
				})
			},
			getScales(data) {
				const x = d3.scaleBand().range([0, this.settings.width]).padding(0.1)
				const y = d3.scaleLinear().range([this.settings.height, 0])

				x.domain(data.map( d => d.month ))
				y.domain([0, 100])

				return {x, y}
			},
			calculatePath(data) {
				if( !data ) {
					return
				}
				this.chartData = this.convertInPercent(data)
				this.scales = this.getScales(this.chartData)
			},
			showTooltip(name, value) {
				this.tooltip.isVisible = true
				this.tooltip.title = name
				this.tooltip.value = value
				this.tooltip.x = event.layerX
				this.tooltip.y = event.layerY
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
	.card-chart .card-body {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tooltip {
		background-color: #fff;
		position: absolute;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0 4px 24px -1px rgba(0,0,0,0.1);
		padding: 1em;
		font-size: 14px;
	}
   .list-enter-active, .list-leave-active {
      transition: all 1s;
      transform: scale(1,1)
    }
    .list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
      opacity: 0;
      transform: scale(1,0);
    }
</style>