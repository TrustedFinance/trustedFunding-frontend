import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import './style.css';

// FontAwesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // All solid icons
import { fab } from '@fortawesome/free-brands-svg-icons'; // All brand icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add all icons to the library
library.add(fas, fab);

// Swiper imports
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const app = createApp(App);

// Register FontAwesome component globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Use plugins
app.use(router);
app.use(createPinia());

app.mount('#app');