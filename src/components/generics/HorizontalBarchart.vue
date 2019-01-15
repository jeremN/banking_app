<template>
	<div class="bar-chart">
		<div class="card-body">
			<svg id="barChart" 
				:style="{ width: settings.width + margin.left + margin.right, height: settings.height + margin.top + margin.bottom, marginTop: margin.top}"
				v-if="scales">
				<g class="chart-y-axis"
					:height="settings.height + margin.top + margin.bottom"
					:width="settings.width + margin.left + margin.right"
					>
					<g v-for="(d, i) in datas"
						:style="{transform: `translate(0, ${settings.height - ((settings.height / datas.length) * i)}px)`}">
						<line :x="settings.width + margin.left">
						</line>
						<text 
							x="0"
							y="-5" 
							dy="0.32em">
							{{ d }}
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
							<g :key="d.name"
								v-for="(d, i) in datas"
								:style="{transform: `translate(${margin.left + margin.top + 5}px , 0)`}">
								<rect 
									class="bar"
									:y="scales.y(d.name)"
									:x="0"
									:data-test="test(d)"
									:width="scales.x()"
									:height="scales.y.bandwidth()"
									fill="#3498db"
									:key="d.value + d.name + i"
									@mouseover="showTooltip(d.name, d.value)"
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
						:style="{transform: `translate(${15 + margin.right + margin.left + scales.x(d.value)}px, 0)`}"
						:width="scales.x(d.value)"
						>
						<rect x="-5" y="6" width="2" height="10" fill="#000"></rect>
						<text x="-5" y="20" text-anchor="middle" dy="0.71em">{{ d.name }}</text>
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
			test(data) {
				data.filter(d => {
					console.log(d.value)
				})
			},
			getScales(data) {
				if( !data || typeof data === undefined ) {
					return
				}
				const y = d3.scaleBand().range([this.settings.height, 0]).padding(0.1)
				const x = d3.scaleLinear().range([0, this.settings.width])

				this.max = d3.max(data.map(d => d3.max(d.map(j => j.value))))

				y.domain(data.map( d => d.month ))
				x.domain([0, this.max])

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