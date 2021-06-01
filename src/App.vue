<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
  <ion-menu-controller></ion-menu-controller>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>