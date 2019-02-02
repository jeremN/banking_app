<template>
  <nav id="boardNav" class="navbar">
      <ul class="navbar__list">
          <li>
              <router-link 
                class="navbar__link"
                to="/dashboard">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="25" height="19" viewBox="0 0 50 38.9" enable-background="new 0 0 50 38.9" xml:space="preserve">
                      <defs>
                      </defs>
                      <path fill="#cfd5dd" d="M42.4,24.3v12.4c0,1.2-0.9,2.1-2.1,2.1H30.2c-0.6,0-1-0.5-1-1v-9.7c0-0.6-0.5-1-1-1h-6.3c-0.6,0-1,0.5-1,1v9.7c0,0.6-0.5,1-1,1H9.7c-1.2,0-2.1-0.9-2.1-2.1V24.3c0-0.3,0.1-0.6,0.4-0.8l16.3-13.4c0.4-0.3,0.9-0.3,1.3,0L42,23.5C42.2,23.7,42.4,24,42.4,24.3L42.4,24.3z M49.6,19.1l-7.3-6V1c0-0.6-0.5-1-1-1h-4.9c-0.6,0-1,0.5-1,1v6.3L27.6,1c-1.5-1.3-3.8-1.3-5.3,0l-22,18.1c-0.4,0.4-0.5,1-0.1,1.5l2.2,2.7c0.4,0.4,1,0.5,1.5,0.1L24.3,6.5c0.4-0.3,0.9-0.3,1.3,0l20.4,16.8c0.4,0.4,1.1,0.3,1.5-0.1l2.2-2.7C50.1,20.1,50.1,19.4,49.6,19.1z"/>
                  </svg>
              </router-link>
          </li>
          <li>
              <router-link
                class="navbar__link"
                to="/stats">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="25" height="19" viewBox="0 0 50 37.5" enable-background="new 0 0 50 37.5" xml:space="preserve">
                      <defs>
                      </defs>
                      <path fill="#cfd5dd" d="M38.8,28.1h2.2c0.6,0,1.2-0.6,1.2-1.2V4.4c0-0.6-0.6-1.3-1.2-1.3h-2.2c-0.6,0-1.3,0.6-1.3,1.3v22.5C37.5,27.5,38.1,28.1,38.8,28.1z M20,28.1h2.2c0.6,0,1.3-0.6,1.3-1.2V7.5c0-0.6-0.6-1.3-1.3-1.3H20c-0.6,0-1.3,0.6-1.3,1.3v19.4C18.7,27.5,19.4,28.1,20,28.1z M29.4,28.1h2.2c0.6,0,1.2-0.6,1.2-1.2V13.8c0-0.6-0.6-1.3-1.2-1.3h-2.2c-0.6,0-1.2,0.6-1.2,1.3v13.1C28.1,27.5,28.8,28.1,29.4,28.1z M48.4,32.8H4.7V1.6C4.7,0.7,4,0,3.1,0H1.6C0.7,0,0,0.7,0,1.6v32.8c0,1.7,1.4,3.1,3.1,3.1h45.3c0.9,0,1.6-0.7,1.6-1.6v-1.6C50,33.5,49.3,32.8,48.4,32.8z M10.6,28.1h2.2c0.6,0,1.3-0.6,1.3-1.2V20c0-0.6-0.6-1.2-1.3-1.2h-2.2
                      c-0.6,0-1.3,0.6-1.3,1.2v6.9C9.4,27.5,10,28.1,10.6,28.1L10.6,28.1z"/>
                  </svg>
              </router-link>
          </li>
          <li>
              <router-link
                class="navbar__link"
                to="/profil">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                      <defs>
                      </defs>
                      <path fill="#cfd5dd" d="M25,28.1c7.8,0,14.1-6.3,14.1-14.1S32.8,0,25,0S10.9,6.3,10.9,14.1S17.2,28.1,25,28.1z M37.5,31.3h-5.4c-2.2,1-4.6,1.6-7.1,1.6s-4.9-0.6-7.1-1.6h-5.4C5.6,31.3,0,36.8,0,43.8v1.6C0,47.9,2.1,50,4.7,50h40.6c2.6,0,4.7-2.1,4.7-4.7v-1.6C50,36.8,44.4,31.3,37.5,31.3z"/>
                  </svg>
              </router-link>
          </li>
          <li>
              <button class="burger">
                  <span class="burger-line"></span>
                  <span class="burger-line"></span>
                  <span class="burger-line"></span>
                  <span class="sr-only">Toggle menu</span>
              </button>
          </li>
      </ul>
  </nav>
</template>

<script>
  
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0 1rem;
  background-color: rgb(255,255,255);
  display: flex;
  flex-direction: column;
  grid-column-start: 1;
  grid-row-start: 2;
  grid-row-end: 4;
  border-top: 1px solid rgb(238,238,242);
  box-shadow: 2px 0 12px -1px rgba(238,238,242,1);
  
  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 6em;
  }

  li { 
    margin: 2em auto; 
    
    &:last-child { display: none; }
  }

  &__link {
    padding: 0.5em;
    position: relative;

    &:hover,
    &--active {
      path {
        fill: rgb(76,132,255);
      }
    }

    &--active::after {
      position: absolute;
      top: 0;
      right: calc(-1.5rem + 3px);
      content: '';
      background-color: rgb(76,132,255);
      height: 100%;
      width: 3px;
    }
  } 
} 
</style>