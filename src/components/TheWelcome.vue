<script setup lang="ts">

import { computed } from 'vue';

function requestNotificationPermission() {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else {
    Notification.requestPermission();
  }
}

const notificationPermission = computed(() => {
  return Notification.permission === 'granted'
});


</script>

<template>
  <div class="greetings">
    Hello!
    <h3>
      <button v-if="!notificationPermission" @click="requestNotificationPermission">Keep me up-to-date</button>
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
