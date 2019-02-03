<template>
	<header class="header">
		<ul class="header__list" v-if="isAuth">
			<li class="header__item">
				{{ user.name }}
			</li>
			<li class="header-item">
				<a class="header__link header__link--logout" href="#" title="Se déconnecter" @click.prevent="logOut">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="20" height="20" viewBox="0 0 100 101.6" enable-background="new 0 0 100 101.6" xml:space="preserve">
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

	&__list {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-left: auto;
		flex-grow: 1;
		max-width: 30%;
	}

	&__item,
	&__link {
		color: rgb(207,213,221);
		margin-right: 3rem;
	}

	&__link:hover { 
		color: rgb(76,132,255); 
		
		path { fill: rgb(76,132,255); }
	}
}

.burger { display: none; }
</style>
