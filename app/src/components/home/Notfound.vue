<template>
	<div>
		<h1>Erreur 404 - La page n'existe pas</h1>
        <router-link 
            to="/">
            Retour à l'accueil
        </router-link>
	</div>
</template>

<script>
	export default {
		methods: {
			backToHome() {
				this.$router.push('/')
			}
		}
	}
</script>