<template>
    <header class="dashboard-header header">
        <h1>Dashboard</h1>
        <ul v-if="isAuth">
            <li class="header-link header-link-user">
                <img src="#" alt="">
                <span class="link-username">{{ user.name }}</span>
                <span class="link-date">Dernière connexion: {{ currentTime }}</span>
                <button type="button" @click.prevent="logOut">Logout</button>
            </li>
        </ul>
        <ul v-if="!isAuth">
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
    import moment                   from 'moment'

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

<style lang="scss" scoped>
    .link-date {
        font-size: 0.875rem;
        font-weight: bold;
    }
</style>
