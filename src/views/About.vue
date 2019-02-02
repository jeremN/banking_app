<template>
	<div class="dashboard">
		<app-header></app-header>
		<app-sidebar></app-sidebar>
		<main class="content">
			<div class="row">
				<h1 class="content__title">Profil</h1>
			</div>
			<div class="row">
				<form 
					id="profilCard" 
					class="col-6 card" 
					v-if="userInfos !== null && !isLoaded">
					<div class="row">
						<h2>Informations</h2>
					</div>
					<div class="row">
						<div class="col-6 form__group">
							<label for="username">Pseudo</label>
							<input 
								id="username" 
								type="text" 
								:placeholder="userName" 
								name="username"
								:class="{is__disabled : !isEdited.profil}"
								:disabled="!isEdited.profil"
								required
								v-model="user.name">
						</div>
						<div class="col-6 form__group">
							<button 
								class="btn btn--transparent" 
								type="button"
								@click.prevent="showFields('profil')">Changer le pseudo</button>
						</div>
					</div>
					<div class="row">
						<div class="col-6 form__group">
							<label for="useremail">Email</label>
							<input 
								id="useremail" 
								type="email" 
								name="useremail"
								:class="{is__disabled : !isEdited.email}"
								:disabled="!isEdited.email"
								:placeholder="userInfos.email"
								required
								v-model="user.email">
						</div>
						<div class="col-6 form__group">
							<button 
								class="btn btn--transparent blue" 
								type="button"
								@click.prevent="changeUserEmail">
								Changer l'email
							</button>
						</div>
					</div>
					<div class="row">
						<div class="col-6 form__group">
							<label for="userpassword">Mot de passe</label>
							<input 
								id="userpassword" 
								type="password" 
								name="credential"
								:class="{is__disabled : !isEdited.password}"
								:disabled="!isEdited.password"
								required
								placeholder="*********" 
								v-model="user.credential">
						</div>
						<div class="col-6 form__group">
							<button 
								class="btn btn--transparent blue" 
								type="button"
								@click.prevent="showFields('passwords')">
								Changer de mot de passe
							</button>
						</div>
					</div>
					<div class="row">
						<div class="col-6 form__group">
							<label for="devise">Devise</label>
							<select id="devise">
								<option value="euro">€</option>
								<option value="dollar">$</option>
							</select>
						</div>
						<div v-if="!userInfos.verified" class="col-6 form__group">
							<button class="btn btn--transparent" type="button">Renvoyer l'email de vérification</button>
						</div>
					</div>
					<hr v-if="isEdited.passwords">
					<div class="row" v-if="isEdited.passwords">
						<h2>Changer mon mot de passe</h2>
					</div>
					<div class="row" v-if="isEdited.passwords">
						<div class="col-4 form__group">
							<label for="oldPassword">Ancien mot de passe</label>
							<input 
								id="oldPassword" 
								type="password" 
								name="oldpassword"
	                        	required
	                        	v-model="user.oldPassword">
						</div>
						<div class="col-4 form__group">
							<label for="newPassword">Nouveau mot de passe</label>
							<input 
								id="newPassword" 
								type="password" 
								name="newpassword"
								required
								v-model="user.newPassword">
						</div>
						<div class="col-4 form__group">
							<label for="confirmPassword">Confirmer le mot de passe</label>
							<input id="confirmPassword" type="password" name="confirmpassword">
						</div>
					</div>
					<div class="row" v-if="isEdited.profil || isEdited.passwords || isEdited.email">
						<div class="col-6 form__group">
							<button class="btn btn--blue" type="submit">Mettre à jour</button>
						</div>
						<div class="col-6 form__group">
							<button class="btn btn--white" type="button">Annuler</button>
						</div>
					</div>
				</form>
			</div>
		</main>
	</div>

</template>

<script>
	import Header from '@/components/partials/Header.vue'
	import Sidebar from '@/components/partials/Sidebar.vue'

	import { mapGetters, mapActions } from 'vuex'

	export default {
		data() {
			return {
				user: {
					name: '',
					created: '',
					credential: '',
					newPassword: '',
					oldPassword: '',
					email: ''
				},
				isEdited: {
					email: false,
					profil: false,
					passwords: false,
					all: false
				}
			}
		},
		computed: {
			...mapGetters({
				userInfos: 'user',
				isLoaded: 'isLoading'
			}),
			userName() {
				this.user.name = this.userInfos.name
				return this.userInfos.name
			}
		},
		methods: {
			...mapActions({
				changeName: 'update_UserName',
				changeEmail: 'update_UserEmail',
				changePassword: 'change_UserPassword',
				sendVerif: 'send_UserEmailVerification',
				deleteUser: 'delete_Account'
			}),
			showFields(field) {
				this.isEdited = {
					email: false,
					profil: false,
					passwords: false,
				}
				this.isEdited[field] = true;
			},
			resetFields() {
				this.user.name = ''
				this.user.created = ''
				this.user.newPassword = ''
				this.user.oldPassword = ''
				this.user.email = ''
				this.isEdited = {
					email: false,
					profil: false,
					passwords: false,
				}
			},
			changeUserName() {
				this.changeName(this.user.name)
				this.resetFields()
			},
			changeUserEmail() {
				this.changeEmail({
					password: this.user.credential,
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
			updateProfil() {
				if( this.edit.editAll ) {}
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
			appHeader: Header,
			appSidebar: Sidebar,
		}
	}
</script>

<style lang="scss" scoped>
	.content > .row {
		&:first-child { margin-top: 2rem; }
	}
	#profilCard {
		margin: auto;
		flex-direction: column;
		padding: 1rem;

		> .row {
			flex-grow: 1;
			width: 100%;
		}
		.btn {
			&--transparent  {
				font-size: 0.75rem;
				font-weight: 700;
				color: rgb(212, 216, 223);
				text-transform: inherit;

				&:hover {
					color: rgb(76, 132, 255);
				}
			}
			&--blue,
			&--white {
				min-height: 40px;
				margin-top: 3rem;
			}

			&--white {
				border: 1px solid rgb(220,220,220);
				color: rgb(220,220,220);
			}
		}
		.col-4 {
			&:nth-child(2) { 
				margin-left: 0.5rem;
				margin-right: 0.5rem;
			}
		}

		.col-6.form__group {
			max-width: 50%;
		}

		hr {
			border-color: rgba(212, 216, 223, 0.25);
			height: 1px;
			width: 95%;
			margin-top: 2rem;
			margin-bottom: 2rem;
		}

		h2 {
			color: rgb(212, 216, 223);
		}
	}

	input, select, textarea {
		&.is__disabled {
			border: none;
			cursor: unset;
			background: none;
		}
	}

</style>