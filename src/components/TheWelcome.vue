<script setup lang="ts">

import { computed } from 'vue';

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
function requestNotificationPermission() {
  console.log('request notification permission');

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


}



</script>

<template>
  <div class="greetings">
    Hello!
    <h3>
      <button @click="requestNotificationPermission">Keep me up-to-date</button>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
