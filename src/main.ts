import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
let notification: Notification | undefined;

function randomNotification() {
  console.log('Show random notification');
  navigator.serviceWorker.ready
    .then(async (registration) => {
      console.log('show sw notification');
      const notifications = await registration.getNotifications();
      notifications.forEach(notification => {
        notification.close();
      })
      await registration.showNotification("Vibration Sample", {
        body: "Buzz! Buzz!",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: "vibration-sample",
      })
    .catch((error) => {
        console.log(error);
      })
  });
  console.log('show regular notification');
  if(notification) notification.close();
  notification = new Notification("Hello!", { body:  "Buzz! Buzz!" });
}

let interval;

Notification.requestPermission().then((result) => {
  if (result === "granted") {
    console.log('permission granted');
    randomNotification();
    interval = setTimeout(randomNotification, 10000);
  }
});

if(!interval){
  console.log('no interval');
  interval = setTimeout(randomNotification, 10000);
}
