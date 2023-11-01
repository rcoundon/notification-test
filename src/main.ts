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
  console.log('Show random notification');
  navigator.serviceWorker.ready
    .then((registration) => {
      console.log('show sw notification');
      registration.showNotification("Vibration Sample", {
        body: "Buzz! Buzz!",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: "vibration-sample",
      })
    .catch((error) => {
        console.log(error);
      })
  });
  console.log('show regular notification');
  const notification = new Notification("Hello!", { body:  "Buzz! Buzz!" });
}

let interval;

Notification.requestPermission().then((result) => {
  if (result === "granted") {
    console.log('permission granted');
    randomNotification();
    interval = setInterval(randomNotification, 10000);
  }
});

if(!interval){
  console.log('no interval');
  interval = setInterval(randomNotification, 10000);
}
