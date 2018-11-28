<template>
  <div id="app">
    <router-view></router-view>
    <app-modal></app-modal>
  </div>
</template>

<script>
  import Modal from './components/generics/Modal.vue'

  export default {
    components: {
      appModal: Modal
    }
  }
</script>

<style lang="scss">

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a { text-decoration: none; }

/*Styles*/
:root{
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 16px;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  color: #5c5879;
  width: 100vw;
  height: 100vh;
}
main { position: relative; }

#app { 
  width: 100%;
  height: 100%; 
}

.btn {
  background: none;
  border: none;
  cursor: pointer;

  &.btn-round {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  &-blue {
    border: 1px solid rgb(76,132,255);
    background-color: rgb(76,132,255);
    color: rgb(255,255,255);
    width: 100%;
    text-align: center;
    padding: 1em;
    border-radius: 3em;
    text-transform: uppercase;

    &:hover {
      background-color: rgb(45,105,235);
      border-color: rgb(45,105,235);
    }
  }

  &-brown {
    color: rgb(255,255,255);
    background-color: rgb(90,90,90);
    border: 1px solid rgb(90,90,90);
    width: 100%;
    border-radius: 3em;
    text-transform: uppercase;
    padding: 1em;
    text-align: center;

    &:hover {
      background-color: rgb(255,255,255);
      color: rgb(90,90,90);
    }
  }

  &-grey {
    color: rgb(255,255,255);
    background-color: rgb(220,220,220);
    border: 1px solid rgb(220,220,220);
    border-radius: 3em;
    padding: 1em;
    text-align: center;
    width: 100%;
    text-transform: uppercase;

    &:hover {
      background-color: rgb(255,255,255);
      color: rgb(220,220,220);
    }
  }

  &-transparent:hover path {
    fill: rgb(45,105,235);
  }

  &-close:hover path {
    fill: rgb(76,132,255);
  }
}
.row { 
  display: flex; 
  justify-content: space-between;
  margin-bottom: 1rem;
}

.col {

  &-1 { width: 8.333%; }
  &-2 { width: 16.667%; }
  &-3 { width: 25%; }
  &-4 { width: 33.334%; }
  &-5 { width: 41.667%; }
  &-6 { width: 50%; }
  &-7 { width: 58.333%; }
  &-8 { width: 66.667%; }
  &-9 { width: 75%; }
  &-10 { width: 83.333%; }
  &-11 { width: 91.667%; }
  &-12 { width: 100%; }
  &-offset-1 { margin-left: 1rem; }
}


.red { color: rgb(254,85,96); }
.green { color: rgb(39,204,150); }

.content {
  grid-column-start: 2;
  grid-row-start: 2;
  grid-row-end: 3;
  padding: 1rem;
}

.panel {
  background-color: rgb(255,255,255);
  border: 1px solid rgb(238,238,242);
  box-shadow: 0 0 16px 4px rgba(238,238,242,1);
}

.form {
  max-width: 300px;
  margin: 1em auto;
  padding: 1rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;

  &-group {

    &:not(.form-other){
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex-grow: 1;
      margin: 0.5em 0;
      width: 100%;
    }

    > .btn {
      margin-top: 3em;
    }
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    line-height: 2.5;
  }
}



  label { 
    line-height: 1.8; 
    color: rgb(93,100,118);
    font-size: 0.875rem;
    font-weight: 700;
  }

  input,
  select, 
  textarea {
    width: 100%;
    border: 1px solid rgb(234,235,240);
    padding: 0.5em;

    &:hover, 
    &:focus {
      border-color: rgb(76,132,255);
    }
  }

  textarea { max-width: 100%; }

  label > small { font-size: 0.75rem; }

  .form-field--withIcon {
    position: relative;
    width: 100%;

    .btn {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75em;
      cursor: pointer;
    }

    input { padding-right: 2em; }
  }

  .form-other {
    font-size: 0.75rem;
    display: flex;
    margin-top: 2.5em;

    a {
      margin-left: 0.5em;
      text-decoration: underline;
      color: rgb(76,132,255);

      &:hover { font-weight: 700; }
    }
  }

.table {
  margin-top: 1.5em;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;

  .btn { margin: 0 0.5em; }
}

.chart {
  margin-top: 1.5rem;
}

table { table-layout: fixed; }
thead th { 
  border-bottom: 1px solid rgb(238,238,242); 
  font-weight: 700;
}
tfoot tr {
  border-top: 1px solid rgb(238,238,242); 
  font-weight: 700;
}

td, th {
  padding: 1rem 0.5rem;
  text-align: center;

  &:not(:first-child),
  &:not(:last-child) {
    border-left: 1px solid rgb(238,238,242);
    border-right: 1px solid rgb(238,238,242);
  }
}
tbody tr:nth-child(even) td { background-color: rgb(245,246,250); }

@media screen and (max-width: 768px) {
  .mobile-only { display: flex; }

  .row { flex-direction: column; }

  .panel-mobile {
    max-width: 300px;
    margin: 1em auto;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgb(93,100,118);
    font-weight: 700;
  }

  .dashboard {
    display: flex;
    flex-flow: column nowrap;
  }

  .burger {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    padding: 0.5em 0;
  }
    .burger-line {
      width: 25px;
      height: 3px;
      display: flex;
      background-color: rgb(207,213,221);
    }
    .burger-line:first-child {
      transform: translateY(-5px);
    }
    .burger-line:nth-child(3) {
      transform: translateY(5px);
    }

  .header {
    padding: 0;
  }
    .header-list {
      max-width: 100%;
      position: fixed;
      height: calc(100vh - 93px);
      top: 0;
      left: 0;
      flex-direction: column;
      width: 100%;
      padding-top: 4em;
      padding-bottom: 4em;
      background-color: rgb(255,255,255);
      transform: translate3d(-100%,0,0);
    }
    .header-item { 
      width: 100%;
      text-align: center;
    }

  .brand { display: none; }

  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 990;
  }
    .navbar-list {
      margin-top: 0;
      flex-direction: row;
    }

    .navbar li:last-child { display: flex; }

    .navbar-link--active::after {
      position: absolute;
      top: 2rem;
      left: 0;
      content: '';
      background-color: rgb(76,132,255);
      height: 3px;
      width: 100%;
      width: 100%;
    }
  .modal {
    padding: 1rem;
  }
    .modal-panel {
      margin-top: 2em;
    }

  .col-1,
  .col-2,
  .col-3,
  .col-4,
  .col-5,
  .col-6,
  .col-7,
  .col-8,
  .col-9,
  .col-10,
  .col-11,
  .col-12 { width: 100%; }
}

@media screen and (min-width: 768px) {
  .form-inline {
    flex-flow: row wrap;
    max-width: initial;
  }
  .form-inline .form-group {
    margin: 0;
    width: calc(100% / 6);
  }
  .form-inline input,
  .form-inline select {
    width: 100%;
    height: 32px;
  }
  .form-inline .btn { 
    height: 32px;
    margin-top: 1.9em; 
    border-radius: 0;
    padding: 0;
  }
}</style>
