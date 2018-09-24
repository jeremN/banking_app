<template>
	<div id="app" class="dashboard">
		
    	<router-view></router-view>
	</div>
</template>

<script>
	import Header from './components/home/Header.vue'

	export default {
	  name: 'app',
	  components: {
		appHeader: Header,
	  },
	}
</script>

<style>
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	a {
		text-decoration: none;
	}

	/*Styles*/
	:root{
		font-family: 'Roboto', Arial, Helvetica, sans-serif;
		font-size: 16px;
	}
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	body {
		background-color: #f0eff7;
		color: #5c5879;
		width: 100vw;
		height: 100vh;
	}
</style>