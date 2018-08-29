<template>
	<form id="signUp" @submit.prevent="onSubmit">
		<div class="modal" v-if="hasError"></div>
		<div class="form-group">
			<label for="signupEmail">Email</label>
			<input 
				id="signupEmail" 
				type="email" 
				name="email"
				v-model="user.email">
		</div>
		<div class="form-group">
			<label for="signupName">Nom</label>
			<input 
				id="signupName" 
				type="text" 
				name="name"
				v-model="user.name">
		</div>
		<div class="form-group">
			<label for="signupPassword">Mot de passe<small>6 caractères minimum</small></label>
			<input 
				id="signupPassword" 
				type="password" 
				name="password"
				v-model="user.password">
		</div>
		<div class="form-group">
			<label for="signupConfirmPassword">Confirmer le mot de passe</label>
			<input 
				id="signupConfirmPassword" 
				type="password" 
				name="confirmPassword"
				v-model="user.confirmPassword">
		</div>
		<div class="form-group">
			<button 
				class="btn" 
				type="submit">
				Valider
			</button>
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
					name: '',
					password: '',
					confirmPassword: '',
				}
			}
		},
		computed: {
			...mapGetters({
				hasError: 'hasError'
			})
		},
		methods: {
			...mapActions({
				signUp: 'user_SignUp'
			}),
			onSubmit() {
				const userData = {
					email: this.user.email,
					name: this.user.name,
					password: this.user.password,
				}
				console.log(userData)
				this.signUp(userData)

			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-group.invalid {
		label {
			color: red;
		}
		input {
			border-color: red;
		}
	}
	small {
		font-size: 12px;
	}
</style>