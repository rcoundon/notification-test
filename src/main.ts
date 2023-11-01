import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')


function randomNotification() {
  const notifTitle = 'Title of the notification'
  const notifBody = `Body of the notification`;

  const options = {
    body: notifBody,
  };
  new Notification(notifTitle, options);
  setInterval(randomNotification, 20000);
}

Notification.requestPermission().then((result) => {
  if (result === "granted") {
    randomNotification();
  }
});
