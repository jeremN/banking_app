<template>
	<div class="dashboard-main">
		<app-popin></app-popin>
		<app-sidebar></app-sidebar>
		<form v-if="!isLoaded && userInfos !== null">
			<div class="form-group">
				<label for="username">Votre nom: {{ userInfos.name }}</label>
				<input 
					id="username"
					type="text" 
					name="Name"
					v-model="user.name">
					<button
						type="button"
						@click.prevent="changeUserName">
						Changer le nom
					</button>
			</div>
			<div class="form-group">
				Compte vérifié: {{ userInfos.verified }}
				<button
					v-if="!userInfos.verified"
					type="button"
					@click.prevent="sendEmailVerification"
					>
					Recevoir l'email de vérification		
				</button>
			</div>
			<div class="form-group">
				Date d'inscription: {{ userInfos.created }}
			</div>
			<div class="form-group">
				<label for="username">Votre email: {{ userInfos.email }}</label>
				<input 
					id="username"
					type="text" 
					name="Name"
					v-model="user.email">
				<button 
					type="button"
					@click.prevent="changeUserEmail">
					Changer l'email
				</button>
			</div>
			<div class="form-group" v-if="">
				<label for="username">Ancien mot de passe</label>
				<input 
					id="username"
					type="text" 
					name="Name"
					v-model="user.oldPassword">
			</div>
			<div class="form-group">
				<label for="username">Nouveau mot de passe</label>
				<input 
					id="username"
					type="text" 
					name="Name"
					v-model="user.newPassword">
					<button
						type="button"
						@click.prevent="changeUserPassword">
						Changer le MDP
					</button>
			</div>
			<div>
				Effacer mon compte
				<button
					type="button"
					@click.prevent="deleteAccount">
					Effacer ce compte
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	import Sidebar 									from '../home/Sidebar.vue'
	import Popin										from '../home/Popin.vue'

	export default {
		data() {
			return {
				user: {
					name: '',
					created: '',
					newPassword: '',
					oldPassword: '',
					email: ''
				}
			}
		},
		computed: {
			...mapGetters({
				userInfos: 'user',
				isLoaded: 'isLoading'
			})
		},
		methods: {
			...mapActions({
					changeName: 'update_UserName',
					changeEmail: 'update_UserEmail',
					changePassword: 'change_UserPassword',
					sendVerif: 'send_UserEmailVerification',
					deleteUser: 'delete_Account'
			}),
			resetFields() {
				this.user.name = ''
				this.user.created = ''
				this.user.newPassword = ''
				this.user.oldPassword = ''
				this.user.email = ''

			},
			changeUserName() {
				this.changeName(this.user.name)
				this.resetFields()
			},
			changeUserEmail() {
				this.changeEmail({
					oldPassword: this.user.oldPassword,
					email: this.user.email,
				})
				this.resetFields()
			},
			changeUserPassword() {
				this.changePassword({
					oldPassword: this.user.oldPassword,
					newPassword: this.user.newPassword
				})
				this.resetFields()
			},
			sendEmailVerification() {
				console.log('Sending email...')
			},
			deleteAccount() {
				this.deleteUser({
					oldPassword: this.user.oldPassword
				})
				this.resetFields()
			}
		},
		components: {
			appSidebar: Sidebar,
			appPopin: Popin
		}
	}
</script>

<style lang="scss" scoped>
	.form-group {
		margin: 1em 0;
	}
</style>