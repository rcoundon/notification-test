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

  navigator.serviceWorker.ready
    .then((registration) => {
      registration.showNotification("Vibration Sample", {
        body: "Buzz! Buzz!",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: "vibration-sample",
      })
    .catch((error) => {
        console.log(error);
      })
  });

  const notification = new Notification("Hello!", { body:  "Buzz! Buzz!" });
}

let interval;

Notification.requestPermission().then((result) => {
  if (result === "granted") {
    randomNotification();
    interval = setInterval(randomNotification, 10000);
  }
});

if(!interval){
    interval = setInterval(randomNotification, 10000);
}
