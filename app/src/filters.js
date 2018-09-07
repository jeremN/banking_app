import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', value => moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') )
Vue.filter('monthFr', value => moment(value, 'MMMM').locale('fr').format('MMMM') )
Vue.filter('devise', value => `${value}€` )
Vue.filter('translateType', string => string === 'outcome' ? 'Dépense' : 'Revenu' )
Vue.filter('parsedDevise', value => parseFloat(value).toFixed(2)+'€' )
Vue.filter('translateVerified', string => string === false ? 'Non' : 'Oui' )
