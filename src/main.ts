import { createApp } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import App from './App.vue'
import '@/assets/styles/index.css'

library.add(faSun, faMoon, faGithub)

createApp(App).component('Icon', FontAwesomeIcon).mount('#app')
