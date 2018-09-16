<template>
	<div class="card card-chart">
		<div class="card-heading">
			<h2 v-if="expenses.length">
				<span class="color-blue"></span> Dépenses de l'année 2018
				<br>
				<span style="color: #3498db;">Gain : {{ sum.earn | parsedDevise }}</span>
				<br>
				<span style="color:#e74c3c;">Dépense : {{ sum.spend | parsedDevise }}</span>
			</h2>
			<h2 v-else>No data to show</h2>
		</div>
		<div class="card-body">
			<svg id="barChart" 
				:style="{ width: settings.width + margin.left + margin.right, height: settings.height +margin.top + margin.bottom, marginTop: margin.top}">
				<g class="chart-y-axis"
					:height="settings.height + margin.top + margin.bottom"
					:width="settings.width + margin.left + margin.right"
					>
					<g v-for="(d, i) in calculatePath"
						:style="{transform: `translate(0, ${settings.height - ((settings.height / calculatePath.length) * i)}px)`}">
						<line x1="0" 
							:x2="settings.width + margin.left">
						</line>
						<text 
							x="0"
							y="-5" 
							dy="0.32em">
							{{ max / calculatePath.length * i | parsedDevise }}
						</text>
					</g>
				</g>
				<g>
					<transition-group 
						v-if="expenses"
						appear
						name="list"
						mode="out-in"
						tag="g">
							<g :key="d.month"
								v-for="(d, i) in calculatePath"
								:style="{transform: `translate(${margin.left + margin.top + 5}px , 0)`}">
								<rect 
									class="bar"
									:x="scales.x0(d.month)"
									:y="scales.y(d.earn)"
									:width="scales.x1.bandwidth()"
									:height="settings.height - scales.y(d.earn)"
									fill="#3498db"
									:key="d.month + d.earn"
									@mouseover="showTooltip(d.month, d.earn)"
									@mouseleave="tooltip.isVisible = false"
								>
								</rect>
								<rect 
									class="bar2"
									:x="scales.x0(d.month) + 25"
									:y="scales.y(d.spend)"
									:width="scales.x1.bandwidth()"
									:height="settings.height - scales.y(d.spend)"
									fill="#e74c3c"
									:key="d.month + d.spend"
									@mouseover="showTooltip(d.month, d.spend)"
									@mouseleave="tooltip.isVisible = false"
								>
								</rect>
							</g>
					</transition-group>
				</g>	
				<g class="chart-x-axis" :style="{transform: `translate(0 ,${settings.height}px)`}">
					<g 
						class="chart-x-label" 
						v-for="(d, i) in calculatePath" 
						:style="{transform: `translate(${15 + margin.right + margin.left + scales.x0(d.month)}px, 0)`}"
						:width="scales.x0.bandwidth()"
						>
						<rect x="-5" y="6" width="2" height="10" fill="#000"></rect>
						<text x="-5" y="20" text-anchor="middle" dy="0.71em">{{ d.month | monthFr }}</text>
					</g>
				</g>
			</svg>
		</div>
		<div 
			class="tooltip" 
			v-if="tooltip.isVisible" 
			:style="{ transform: `translate(${tooltip.x}px, ${tooltip.y}px)` }">
			<p>
				{{ tooltip.title | monthFr }} 
				<br> 
				{{ tooltip.value | devise}} 
			</p>
		</div>
	</div>
</template>

<script>
	import * as d3 		from 'd3';
	import {mapGetters} from 'vuex'

	export default {
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
				sum: {
					earn: '',
					spend: ''
				},
				defaultData: [
					{month: 'Janvier', earn: 0},
					{month: 'Février', earn: 0},
					{month: 'Mars', earn: 0},
					{month: 'Avril', earn: 0},
					{month: 'Mai', earn: 0},
					{month: 'Juin', earn: 0},
					{month: 'Juillet', earn: 0},
					{month: 'Août', earn: 0},
					{month: 'Septembre', earn: 0},
					{month: 'Octobre', earn: 0},
					{month: 'Novembre', earn: 0},
					{month: 'Décembre', earn: 0}
				],
				scales: null,
				max: ''
			}
		},
		computed: {
			...mapGetters({
				expenses: 'Return_allExpenses',
				currentYear: 'Return_CurrentYear'
			}),
			calculatePath() {
				if( !this.expenses ) return;
				let data = this.filteredDatas()
				if(data) {
					this.sum.earn = data.reduce( (a, b) => a + b.earn, 0)
					this.sum.spend = data.reduce( (a, b) => a + b.spend, 0)			
				}
				this.scales = this.getScales(data)
				return data
			},
		},
		methods: {
			filteredDatas() {
				if(!this.expenses.length) return;

				const primaryDatas = this.returnCurrentYear()

				if( primaryDatas.length) {
					let datas = primaryDatas[0].months.map( item => {
						return item = {
							earn: item.income,
							month: item.month,
							spend: item.outcome
						}
					})
					return datas
				}
			},	
			getScales(data) {
				if( !data ) {
					data = this.defaultData
				}
				const x0 = d3.scaleBand().range([0, this.settings.width]).padding(0.1)
				const x1 = d3.scaleBand().padding(0.05)
				const y = d3.scaleLinear().range([this.settings.height, 0])

				this.max = d3.max(data.map( d => d3.max([d.earn, d.spend]) ))
				x0.domain(data.map( d => d.month ))
				x1.domain(data.map( d => d.month)).rangeRound([0, x0.bandwidth()])
				y.domain([0, this.max])

				return {x0, x1, y}
			},
			showTooltip(name, value) {
				this.tooltip.isVisible = true
				this.tooltip.title = name
				this.tooltip.value = value
				this.tooltip.x = event.layerX + 70
				this.tooltip.y = event.layerY + 20
			},
			returnCurrentYear() {
				if(!this.expenses.length) return;
				return this.expenses.filter( expense => expense.year === this.currentYear ? expense : [])
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
	.card-body {
		margin-top: 2em;
	}
	.chart-y-ticks {
		display: flex;
		flex-direction: column-reversed;

		& > text {
			fill: #c9d4d7;
		}
	}
	.chart-x-axis {
		text-align: center;
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
		top: 0;
		left: 0;
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