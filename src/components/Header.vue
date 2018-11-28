<template>
	<header class="header">
		<div class="header-brand brand">
			<img class="brand-logo" src="https://via.placeholder.com/50x50" alt="">
		</div>
		<ul class="header-list">
			<li class="header-item" v-if="isAuth">
				{{ user.name }}
			</li>
			<li class="header-item" v-if="isAuth">
				<a class="header-link header-notif notif" href="#" title="">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="25" height="28" viewBox="0 0 100 114.3" enable-background="new 0 0 100 114.3" xml:space="preserve">
						<defs>
						</defs>
						<path fill="#cfd5dd" d="M98.1,80.9c-4.3-4.6-12.4-11.6-12.4-34.4c0-17.3-12.2-31.2-28.6-34.6V7.1C57.1,3.2,53.9,0,50,0s-7.1,3.2-7.1,7.1v4.7c-16.4,3.4-28.6,17.3-28.6,34.6c0,22.8-8.1,29.8-12.4,34.4C0.6,82.3,0,84,0,85.7c0,3.7,2.9,7.1,7.2,7.1h85.7c4.3,0,7.1-3.5,7.2-7.1C100,84,99.4,82.3,98.1,80.9L98.1,80.9z M15.1,82.1c4.7-6.2,9.9-16.6,9.9-35.6c0,0,0-0.1,0-0.1c0-13.8,11.2-25,25-25s25,11.2,25,25c0,0,0,0.1,0,0.1c0,19,5.2,29.3,9.9,35.6H15.1z M50,114.3c7.9,0,14.3-6.4,14.3-14.3H35.7C35.7,107.9,42.1,114.3,50,114.3z"/>
					</svg>
					<span class="notif-number">1</span>
				</a>
			</li>
			<li class="header-item" v-if="isAuth">
				<a class="header-link header-logout" href="#" title="Se déconnecter" @click.prevent="logOut">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="25" height="25" viewBox="0 0 100 101.6" enable-background="new 0 0 100 101.6" xml:space="preserve">
						<defs>
						</defs>
						<path fill="#cfd5dd" d="M79,10.9c12.7,9.1,21,23.9,21,40.7c0,27.6-22.3,49.9-49.9,50C22.6,101.7,0,79.2,0,51.7C0,34.9,8.2,20,20.9,10.9c2.4-1.7,5.6-1,7.1,1.6l3.2,5.7c1.2,2.1,0.6,4.8-1.3,6.2c-8.4,6.2-13.7,16-13.7,27.2c0,18.6,15,33.9,33.9,33.9c18.5,0,34-15,33.9-34.1c-0.1-10.4-5-20.5-13.7-27c-2-1.5-2.5-4.1-1.3-6.2l3.2-5.7C73.4,10,76.7,9.2,79,10.9L79,10.9z M58.1,53.2V4.8c0-2.7-2.2-4.8-4.8-4.8h-6.5c-2.7,0-4.8,2.2-4.8,4.8v48.4c0,2.7,2.2,4.8,4.8,4.8h6.5C55.9,58.1,58.1,55.9,58.1,53.2z"/>
					</svg>
				</a>                    
			</li>
		</ul>
	</header>
</template> 

<script>
	import { mapActions, mapGetters } from 'vuex'
	import moment from 'moment'

	export default {
		data() {
			return {
				currentTime: moment().format('DD/MM/YYYY')
			}
		},
		computed: {
			...mapGetters({
				isAuth: 'isAuthenticated',
				user: 'user'
			})
		},
		methods: {
			...mapActions({
				logout: 'user_SignOut'
			}),
			logOut() {
				this.logout()
			}
		}
	}

</script>

<style lang="scss">
.header {
	padding: 0.625rem 1rem;
	display: flex;
	align-items: center;
	background-color: rgb(255,255,255);
	grid-column-start: 1;
	grid-row-start: 1;
	grid-column-end: 3;
	box-shadow: 0 2px 12px -1px rgba(238,238,242,1);

	&-list {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		margin-left: auto;
		flex-grow: 1;
		max-width: 30%;
	}

	&-item,
	&-link {
		color: rgb(207,213,221);
	}

	&-link:hover { 
		color: rgb(76,132,255); 
		
		path { fill: rgb(76,132,255); }
	}
}

.burger { display: none; }
</style>
