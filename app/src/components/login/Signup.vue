<template>
	<form id="signUp" @submit.prevent="onSubmit">
		<div class="form-group">
			<label for="signupEmail">Email</label>
			<input 
				id="signupEmail" 
				type="email" 
				name="email"
				v-model="user.email">
		</div>
		<fieldset class="form-group form-group-inline">
			<legend>Genre</legend>
			<div class="form-group">
				<label for="signupMr">Mr</label>
				<input 
					id="signupMr" 
					type="radio" 
					name="gender"
					v-model="user.gender">
			</div>
			<div class="form-group">
				<label for="signupMme">Mme</label>
				<input 
					id="signupMme" 
					type="radio" 
					name="gender"
					v-model="user.gender">
			</div>
		</fieldset>
		<div class="form-group">
			<label for="signupName">Nom</label>
			<input 
				id="signupName" 
				type="text" 
				name="name"
				v-model="user.name">
		</div>
		<div class="form-group">
			<label for="signupPassword">Mot de passe</label>
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
			<button class="btn" type="submit">Valider</button>
		</div>
	</form>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					email: '',
					name: '',
					password: '',
					confirmPassword: '',
					gender: ''
				}
			}
		},
		methods: {
			onSubmit() {
				const signupData = this.user
				console.log(signupData)
			}
		}
	}
</script>