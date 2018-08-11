<template>
	<form id="signIn" @submit.prevent="onSubmit"> 
		<div class="form-group">
			<label for="signinEmail">Email</label>
			<input 
				id="signinEmail" 
				type="email" 
				name="email"
				v-model="user.email">
		</div>
		<div class="form-group">
			<label for="signinPassword">Mot de passe</label>
			<input 
				id="signinPassword" 
				type="password" 
				name="password"
				v-model="user.password">
		</div>
		<div class="form-group">
			<button class="btn" type="submit">Valider</button>
		</div>
	</form>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

	export default {
		data() {
			return {
				user: {
					email: '',
					password: ''
				}
			}
		},
		methods: {
			...mapActions({
				signIn: 'userSignIn'
			}),
			onSubmit() {
				const userData = this.user
				this.signIn(userData)
			}
		}
	}
</script>