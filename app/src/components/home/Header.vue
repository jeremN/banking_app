<template>
    <header class="dashboard-header header">
        <h1>Dashboard</h1>
        <ul>
            <li>
                <router-link 
                    to="Signin"
                    v-if="!isAuth">
                    Se connecter
                </router-link>
            </li>
            <li>
                <router-link 
                    to="Signup"
                    v-if="!isAuth">
                    S'enregistrer
                </router-link>
            </li>
            <li class="header-link header-link-user" v-if="isAuth">
                <img src="#" alt="">
                <span class="link-username">{{ username }}</span>
                <span class="link-date">Dernière connexion: {{ time }}</span>
            </li>
        </ul>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex'

	export default {
		data() {
			return {
				username: 'Jerem',
                time: '24/06/2018'
			}
		},
        computed: {
            ...mapGetters({
                isAuth: 'isAuthenticated'
            })
        }
	}
</script>

<style lang="scss" scoped>
    .link-date {
        font-size: 0.875rem;
        font-weight: bold;
    }
</style>
