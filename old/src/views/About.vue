<template>
	<div class="dashboard">
		<app-header></app-header>
		<app-sidebar></app-sidebar>
		<main class="content">
			<form class="col-6" v-if="userInfos !== null && !isLoaded">
				<app-card>
					<template slot="firstRowIcon">
						<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="user-circle" class="svg-inline--fa fa-user-circle fa-w-16" role="img" viewBox="0 0 496 512" width="40">
							<path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"/>
						</svg>					
					</template>
					<template slot="firstRow" class="profil-row">
						<div v-if="!isEdited.profil" class="leftBtn">
							<button 
								class="btn"
								type="button"
								title="Editer mes informations"
								@click.prevent="showFields('profil')">
								<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" viewBox="0 0 512 512" width="15">
									<path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"/>
								</svg>							
							</button>
						</div>
						<div class="form-group">
	                        <label for="name" class="form-label">Nom: <strong>{{ userName }}</strong></label>
	                        <input 
	                        	v-if="isEdited.profil"
	                        	id="name" 
	                        	class="form-field" 
	                        	type="text" 
	                        	name="userName" 
	                        	required
	                        	v-model="user.name">
						</div>						
						<div class="form-group">
		                    <label class="form-label">
								Compte créer le <time v-if="userInfos.create">{{ userInfos.create | formatDateBis }}</time>
		                    </label>
			            </div>
						<div v-if="isEdited.profil" class="form-group">
	                        <button 
	                        	id="editProfil" 
	                        	class="btn btn-blue" 
	                        	type="button"
	                        	@click.prevent="changeUserName">
	                        	Editer mon profil
	                        </button>
						</div>			            
					</template>
				</app-card>

				<app-card>
					<template slot="firstRowIcon">
						<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="envelope" class="svg-inline--fa fa-envelope fa-w-16" role="img" viewBox="0 0 512 512" width="40">
							<path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/>
						</svg>					
					</template>
					<template slot="firstRow" class="profil-row">
						<div v-if="!isEdited.email" class="leftBtn">
							<button 
								class="btn"
								type="button"
								title="Editer mon email"
								@click.prevent="showFields('email')">
								<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" viewBox="0 0 512 512" width="15">
									<path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"/>
								</svg>							
							</button>
						</div>
						<div class="form-group">
		                    <label for="email" class="form-label">
								Email: <span>{{ userInfos.email }}</span>
		                    </label>
		                    <input 
		                    	v-if="isEdited.email"
		                    	id="email" 
		                    	class="form-field" 
		                    	type="text" 
		                    	name="userEmail" 
		                    	required
		                    	v-model="user.email">
			            </div>
			            <div class="form-group" v-if="isEdited.email">
			            	<label for="credential-password" class="form-label">
			            		Votre mot de passe: 
			            	</label>
	                        <input 
	                        	id="credential-password" 
	                        	class="form-field" 
	                        	type="password" 
	                        	name="userCredential" 
	                        	required
	                        	v-model="user.credential">
			            </div>
	                    <div v-if="isEdited.email" class="form-group">
	                        <button 
	                        	id="changeEmail" 
	                        	class="btn btn-brown" 
	                        	type="button"
	                        	@click.prevent="changeUserEmail">
	                        	Changer mon email
	                        </button>
	                    </div>
					</template>
				</app-card>

				<app-card>
					<template slot="firstRowIcon">
						<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="key" class="svg-inline--fa fa-key fa-w-16" role="img" viewBox="0 0 512 512" width="40">
							<path fill="currentColor" d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"/>
						</svg>				
					</template>
					<template slot="firstRow" class="profil-row">
						<div v-if="!isEdited.passwords" class="leftBtn">
							<button 
								class="btn"
								type="button"
								title="Changer mon mot de passe"
								@click.prevent="showFields('passwords')">
								<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" viewBox="0 0 512 512" width="15">
									<path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"/>
								</svg>							
							</button>
						</div>
	                    <div class="form-group">
	                        <label for="oldPassword" class="form-label">Ancien mot de passe: <span v-if="!isEdited.passwords">&nbsp;********</span></label>
	                        <input 
	                        	v-if="isEdited.passwords"
	                        	id="oldPassword" 
	                        	class="form-field" 
	                        	type="password" 
	                        	name="userOldPassword" 
	                        	required
	                        	v-model="user.oldPassword">
	                    </div>
	                    <div v-if="isEdited.passwords" class="form-group">
	                        <label for="newPassword" class="form-label">Nouveau mot de passe</label>
	                        <input 
	                        	id="newPassword" 
	                        	class="form-field" 
	                        	type="password" 
	                        	name="userNewPassword" 
	                        	required
	                        	v-model="user.newPassword">
	                    </div>
	                    <div v-if="isEdited.passwords" class="form-group">
	                        <button 
	                        	id="changePassword" 
	                        	class="btn btn-brown" 
	                        	type="button"
	                        	@click.prevent="changeUserPassword">
	                        	Changer mon mot de passe
	                        </button>
	                    </div>
					</template>
				</app-card>

				<app-card>
					<template slot="firstRowIcon">
						<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="shield-alt" class="svg-inline--fa fa-shield-alt fa-w-16" role="img" viewBox="0 0 512 512" width="40">
							<path fill="currentColor" d="M496 128c0 221.282-135.934 344.645-221.539 380.308a48 48 0 0 1-36.923 0C130.495 463.713 16 326.487 16 128a48 48 0 0 1 29.539-44.308l192-80a48 48 0 0 1 36.923 0l192 80A48 48 0 0 1 496 128zM256 446.313l.066.034c93.735-46.689 172.497-156.308 175.817-307.729L256 65.333v380.98z"/>
						</svg>			
					</template>
					<template slot="firstRow" class="profil-row">
						<div class="leftBtn">
						</div>
	                    <div class="form-group">
	                        <p class="form-label">Compte vérifié: 
	                            <span>
	                                <svg v-if="userInfos.verified" id="isVerified" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
	                                    <path fill="#29cc97" d="M25,0C11.2,0,0,11.2,0,25s11.2,25,25,25s25-11.2,25-25S38.8,0,25,0z M25,4.8c11.1,0,20.2,9,20.2,20.2c0,11.1-9,20.2-20.2,20.2c-11.1,0-20.2-9-20.2-20.2C4.8,13.9,13.9,4.8,25,4.8 M39.1,18l-2.3-2.3c-0.5-0.5-1.2-0.5-1.7,0L20.9,29.8l-6-6.1c-0.5-0.5-1.2-0.5-1.7,0L10.9,26c-0.5,0.5-0.5,1.2,0,1.7l9.2,9.2c0.5,0.5,1.2,0.5,1.7,0l17.4-17.3C39.6,19.2,39.6,18.4,39.1,18L39.1,18z"/>
	                                </svg>
	                                <svg v-else id="notVerified" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
	                                    <defs>
	                                    </defs>
	                                    <path fill="#fe5560" d="M25,0C11.2,0,0,11.2,0,25s11.2,25,25,25s25-11.2,25-25S38.8,0,25,0z M25,45.2c-11.1,0-20.2-9-20.2-20.2S13.9,4.8,25,4.8s20.2,9,20.2,20.2S36.1,45.2,25,45.2z M35.3,18.7L29,25l6.3,6.3c0.5,0.5,0.5,1.2,0,1.7L33,35.3c-0.5,0.5-1.2,0.5-1.7,0L25,29l-6.3,6.3c-0.5,0.5-1.2,0.5-1.7,0L14.7,33c-0.5-0.5-0.5-1.2,0-1.7L21,25l-6.3-6.3c-0.5-0.5-0.5-1.2,0-1.7l2.3-2.3c0.5-0.5,1.2-0.5,1.7,0L25,21l6.3-6.3c0.5-0.5,1.2-0.5,1.7,0l2.3,2.3C35.7,17.5,35.7,18.3,35.3,18.7L35.3,18.7z"/>
	                                </svg>
	                            </span>
	                        </p>
                            <button 
                            	v-if="!userInfos.verified"
                            	class="btn btn-blue" 
                            	type="button">
                            	Envoyer l'email
                            </button>
	                    </div>
	                    <div v-if="!userInfos.verified" class="form-group">
	                    </div>
					</template>
				</app-card>
			</form>
		</main>
	</div>

</template>

<script>
	import Header from '@/components/Header.vue'
	import Sidebar from '@/components/Sidebar.vue'
	import Card from '@/components/generics/minCard.vue'

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
			appCard: Card
		}
	}
</script>

<style lang="scss" scoped>
	.col-6 { margin: auto; }
	.col-2 {
		display: flex;
	}
	.panel {

		.btn { 
			margin-top: 0; 
			margin-left: 1em;
		}
	}
	svg { 
		margin: auto; 

		path { fill: rgb(76, 132, 255); }
	}

	#isVerified { 
		path { fill: #29cc97; }
	}

	#notVerified {
		path { fill: #fe5560; }
	}

	.leftBtn {
		position: absolute;
		top: 1em;
		right: 1em;

		> .btn {
			width: 30px;
			height: 30px;

			&:hover {
				path { fill: rgb(0,0,0); }
			}
		}
	}

	.form {

		&-group {
			flex-flow: row nowrap;

			label { flex-grow: 1; }
			input { 
				flex-grow: 2;
				width: auto;
			}

			p { 
				display: flex;
				align-items: center;
				justify-content: center;

				svg { margin-left: 0.5em; }
			}
		}

		&-label {
			 font-weight: 700;

			 &[for="name"] strong {
			 	font-size: 1.25rem;
			 }
		}

	}
</style>