<template>
    <header class="dashboard-header header">
        <ul>
            <li>
                Dashboard
            </li>
            <li class="header-link header-link-user">
                <img src="#" alt="">
                <span class="link-username">{{ username }}</span>
                <span class="link-date">Dernière connexion: {{ time }}</span>
            </li>
        </ul>
    </header>
</template>

<script>

	export default {
		data() {
			return {
				username: 'Jerem',
                time: '24/06/2018'
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
