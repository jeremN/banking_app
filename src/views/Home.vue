<template>
	<header class="header">
		<div class="header-brand brand">
			<img class="brand-logo" src="https://via.placeholder.com/50x50" alt="">
		</div>
		<ul class="header-list">
			<li class="header-item">
				<router-link 
				class="header-link header-register" 
				to="Signin">
				Se connecter
			</router-link>
			</li>
			<li class="header-item">
				<router-link 
				class="header-link header-register" 
				to="Register">
				Créer un compte
			</router-link>
			</li>
		</ul>
	</header>
</template>

<script>
	import Header from '@/components/Header.vue'
	import Sidebar from '@/components/Sidebar.vue'
	import Footer from '@/components/Footer.vue'

	export default {
	  components: {
	    appHeader: Header,
	    appSidebar: Sidebar,
	    appFooter: Footer
	  }
	}
</script>
