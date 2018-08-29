<template>
    <header class="dashboard-header header">
        <h1>Dashboard</h1>
        <ul v-if="isAuth">
            <li class="header-link header-link-user">
                <img src="#" alt="">
                <span class="link-username">{{ userInfos.name }}</span>
                <span class="link-date">Dernière connexion: {{ time }}</span>
                <button type="button" @click="logOut">Logout</button>
            </li>
        </ul>
        <ul v-else>
            <li>
                <router-link 
                    to="Signin">
                    Se connecter
                </router-link>
            </li>
            <li>
                <router-link 
                    to="Signup">
                    S'enregistrer
                </router-link>
            </li>

        </ul>
    </header>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

	export default {
		data() {
			return {
				username: 'Jerem',
                time: '24/06/2018'
			}
		},
        computed: {
            ...mapGetters({
                isAuth: 'isAuthenticated',
                userInfos: 'user'
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

<style lang="scss" scoped>
    .link-date {
        font-size: 0.875rem;
        font-weight: bold;
    }
</style>
