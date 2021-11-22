import { createApp } from 'vue'
import Carousel from './components/Carousel.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import './index.css'

loadFonts()


createApp(Carousel)
  .use(vuetify)
  .mount('#app')


