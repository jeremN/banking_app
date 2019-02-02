<template>
    <form 
    	id="loginForm" 
    	class="form panel" 
    	@submit.prevent="onSubmit">

        <h1>Se connecter</h1>
        <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input 
            	id="email" 
            	class="form-field" 
            	type="email" 
            	name="userEmail" 
            	v-model="user.email"
            	required>
        </div>
        <div class="form-group">
            <label for="password" class="form-label">Mot de passe</label>
            <input 
            	id="password" 
            	class="form-field" 
            	type="text" 
            	name="userPassword"
            	v-model="user.password" 
            	required>
        </div>
        <div class="form-group">
            <button class="btn btn-blue" type="submit">Se connecter</button>
        </div>
        <div class="form-group form-other">
        	<router-link 
        		class="link link-blue" 
        		to="register">
        		Créez-en un !
        	</router-link>
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
				signIn: 'user_SignIn'
			}),
			onSubmit() {
				const userData = this.user
				this.signIn(userData)
			}
		}
	}
</script>