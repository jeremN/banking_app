<template>
	<form 
		id="registerForm" 
		class="form panel" 
		@submit.prevent="onSubmit">

	    <h1>Créer un compte</h1>
	    <div class="form-group">
	        <label for="email" class="form-label">Email <small>(requis)</small></label>
	        <input 
	        	id="email" 
	        	class="form-field" 
	        	type="email" 
	        	name="userEmail" 
	        	v-model="user.email"
	        	required>
	    </div>
	    <div class="form-group">
	        <label for="name" class="form-label">Nom <small>(requis)</small></label>
	        <input 
	        	id="name" 
	        	class="form-field" 
	        	type="text" 
	        	name="userName" 
	        	v-model="user.name"
	        	required>
	    </div>
	    <div class="form-group">
	        <label for="password" class="form-label">Mot de passe <small>(requis)</small></label>
	        <div class="form-field--withIcon">                    
	            <input 
	            	id="password" 
	            	class="form-field form-value--isVisible" 
	            	type="password" 
	            	name="userPassword" 
	            	v-model="user.password"
	            	required>
	            <button type="button" class="btn form-icon icon-isHidden">
	                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="15" height="13" viewBox="0 0 25 22.2" enable-background="new 0 0 25 22.2" xml:space="preserve">
	                    <defs>
	                    </defs>
	                    <path fill="#cfd5dd" d="M11.8,15.6c-3.5-0.4-5.9-3.8-5.1-7.3L11.8,15.6z M12.5,17C8,17,4.2,14.6,2.1,11.1c0.9-1.6,2.3-3,3.8-4L4.7,5.4c-1.8,1.2-3.3,2.8-4.4,4.6c-0.4,0.7-0.4,1.5,0,2.1c2.4,4.2,7,6.9,12.2,6.9c0.6,0,1.1,0,1.7-0.1l-1.4-2C12.7,17,12.6,17,12.5,17zM24.7,12.2c-1.4,2.4-3.6,4.4-6.2,5.6l2.1,3c0.2,0.2,0.1,0.6-0.1,0.7l-0.9,0.6c-0.2,0.2-0.6,0.1-0.7-0.1L4.4,1.4C4.3,1.2,4.3,0.9,4.6,0.7l0.9-0.6C5.7-0.1,6,0,6.2,0.2l2.4,3.4c1.2-0.4,2.6-0.5,3.9-0.5c5.2,0,9.8,2.8,12.2,6.9C25.1,10.7,25.1,11.5,24.7,12.2L24.7,12.2z M22.9,11.1c-1.9-3.3-5.4-5.5-9.4-5.9c-0.4,0.4-0.7,1-0.7,1.7c0,1.3,1.1,2.4,2.4,2.4s2.4-1.1,2.4-2.4l0,0c1.3,2.5,0.7,5.7-1.6,7.5l1.2,1.7C19.6,15,21.6,13.3,22.9,11.1z"/>
	                </svg>
	            </button>
	            <button type="button" class="btn form-icon icon-isVisible">
	                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="15px" height="9.6px" viewBox="0 0 15 9.6" enable-background="new 0 0 15 9.6" xml:space="preserve">
	                    <defs>
	                    </defs>
	                    <path fill="#cfd5dd" d="M14.8,4.2C13.4,1.7,10.6,0,7.5,0C4.4,0,1.6,1.7,0.2,4.2c-0.2,0.4-0.2,0.9,0,1.3c1.5,2.5,4.2,4.2,7.3,4.2c3.1,0,5.9-1.7,7.3-4.2C15.1,5,15.1,4.5,14.8,4.2L14.8,4.2z M7.5,8.3c-2.7,0-5-1.4-6.2-3.5c1.1-2,3.2-3.3,5.6-3.5c0.3,0.3,0.4,0.6,0.4,1c0,0.8-0.7,1.5-1.5,1.5S4.4,3.1,4.4,2.3l0,0C4.1,2.8,4,3.4,4,4c0,2,1.6,3.5,3.5,3.5S11,5.9,11,4c0-0.8-0.3-1.6-0.7-2.1c1.4,0.6,2.7,1.7,3.4,3C12.5,6.9,10.2,8.3,7.5,8.3z"/>
	                </svg>
	            </button>
	        </div>
	    </div>
	    <div class="form-group">
	        <button class="btn btn-blue" type="submit">Créer</button>
	    </div>
	    <div class="form-group form-other">
	        Vous avez déjà un compte ? 
	        <router-link 
	        	class="link link-blue" 
	        	to="signin">
		        Connectez-vous !
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

<style lang="scss">
	
</style>
