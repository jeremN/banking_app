<template>
    <nav id="boardNav" class="navbar">
        <ul>
            <li>
                <router-link to="/Home" class="navbar-link">
                    <i class="fas fa-chart-bar"></i><span>Dashboard</span>
                </router-link>
                <!--a class="navbar-link" href="#"><i class="fas fa-chart-bar"></i><span>Dashboard</span></a-->
            </li>
            <li>
                <router-link to="/LastYear" class="navbar-link">
                    <i class="fas fa-list-ul"></i><span>Annuel</span>
                </router-link>
                <!--a class="navbar-link" href="#"><i class="fas fa-list-ul"></i><span>Annuel</span></a-->
            </li>
            <li>
                <router-link to="/Profile" class="navbar-link">
                    <i class="fas fa-user"></i><span>Profil</span>
                </router-link>
                <!--a class="navbar-link" href="#"><i class="fas fa-user"></i><span>Profil</span></a-->
            </li>
            <li>
                <a class="navbar-link" href="#"><i class="fas fa-sign-out-alt"></i><span>Déconnexion</span></a>
            </li>
                    <router-link 
            to="/">
            Retour à l'accueil
        </router-link>

        </ul>
    </nav>
</template>

<script>
	
</script>
