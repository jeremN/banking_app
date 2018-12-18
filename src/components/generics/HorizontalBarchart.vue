<template>
	<div class="bar-chart">
		<div>{{ datas }}</div>
		<div class="card-body">
			<svg id="barChart" 
				:style="{ width: settings.width + margin.left + margin.right, height: settings.height +margin.top + margin.bottom, marginTop: margin.top}"
				v-if="scales">
				<g class="chart-y-axis"
					:height="settings.height + margin.top + margin.bottom"
					:width="settings.width + margin.left + margin.right"
					>
					<g v-for="(d, i) in datas"
						:style="{transform: `translate(0, ${settings.height - ((settings.height / datas.length) * i)}px)`}">
						<line x1="0" 
							:x2="settings.width + margin.left">
						</line>
						<text 
							x="0"
							y="-5" 
							dy="0.32em">
							{{ max / datas.length * i | parsedDevise }}
						</text>
					</g>
				</g>
				<g>
					<transition-group 
						v-if="scales"
						appear
						name="list"
						mode="out-in"
						tag="g">
							<g :key="d[xVal]"
								v-for="(d, i) in datas"
								:style="{transform: `translate(${margin.left + margin.top + 5}px , 0)`}">
								<rect 
									class="bar"
									:y="scales.y(d[xVal])"
									:x="scales.x([yVal[0]])"
									:height="scales.y.bandwidth()"
									:width="settings.width - scales.x(d[yVal[0]])"
									fill="#3498db"
									:key="d[xVal] + d.earn"
									@mouseover="showTooltip(d[xVal], d[yVal[0]])"
									@mouseleave="tooltip.isVisible = false"
								>
								</rect>
								<rect 
									class="bar2"
									:y="scales.y(d[xVal]) + 25"
									:x="scales.x(d[yVal[1]])"
									:height="scales.y.bandwidth()"
									:width="settings.height - scales.x(d[yVal[1]])"
									fill="#e74c3c"
									:key="d[xVal] + d[yVal[1]]"
									@mouseover="showTooltip(d[xVal], d[yVal[1]])"
									@mouseleave="tooltip.isVisible = false"
								>
								</rect>
							</g>
					</transition-group>
				</g>	
				<g class="chart-x-axis" :style="{transform: `translate(0 ,${settings.height}px)`}">
					<g 
						class="chart-x-label" 
						v-for="(d, i) in datas" 
						:style="{transform: `translate(${15 + margin.right + margin.left + scales.x(d[xVal])}px, 0)`}"
						:width="scales.x0.bandwidth()"
						>
						<rect x="-5" y="6" width="2" height="10" fill="#000"></rect>
						<text x="-5" y="20" text-anchor="middle" dy="0.71em">{{ d[xVal] | monthFr }}</text>
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
	import * as d3 from 'd3'

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
					{month: 'Janvier', earn: 0, spend: 0},
					{month: 'Février', earn: 0, spend: 0},
					{month: 'Mars', earn: 0, spend: 0},
					{month: 'Avril', earn: 0, spend: 0},
					{month: 'Mai', earn: 0, spend: 0},
					{month: 'Juin', earn: 0, spend: 0},
					{month: 'Juillet', earn: 0, spend: 0},
					{month: 'Août', earn: 0, spend: 0},
					{month: 'Septembre', earn: 0, spend: 0},
					{month: 'Octobre', earn: 0, spend: 0},
					{month: 'Novembre', earn: 0, spend: 0},
					{month: 'Décembre', earn: 0, spend: 0}
				],
				max: ''
			}
		},
		props: {
			datas: Array,
			chartTitle: String,
		},
		mounted() {
			this.scales
		},
		computed: {
			scales() {
				return this.getScales(this.datas)
			}
		},
		methods: {
			getScales(data) {
				if( !data || typeof data === undefined ) {
					return
				}
				const y = d3.scaleBand().range([0, this.settings.width]).padding(0.1)
				const x = d3.scaleLinear().range([this.settings.height, 0])

				y.domain(data.map( d => d.month ))
				x.domain([0, d3.max([0, d[this.xVal[1]]])])

				return {x, y}
			},
			showTooltip(name, value) {
				this.tooltip.isVisible = true
				this.tooltip.title = name
				this.tooltip.value = value
				this.tooltip.x = event.layerX + 70
				this.tooltip.y = event.layerY + 20
			},
		}
	}
</script>