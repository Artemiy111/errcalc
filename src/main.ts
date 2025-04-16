import { library } from '@fortawesome/fontawesome-svg-core'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createApp } from 'vue'

import App from './App.vue'
import '@/assets/styles/index.css'

library.add(faSun, faMoon, faGithub)

createApp(App).component('Icon', FontAwesomeIcon).mount('#app')
