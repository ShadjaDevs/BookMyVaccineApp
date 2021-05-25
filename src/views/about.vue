<template>
  <ion-page>
      <ion-header>
        <ion-toolbar>
            <ion-row>
            <ion-col size = "1">
            <ion-button @click="openStart">
                <ion-icon :icon="menuOutline"></ion-icon>
            </ion-button>
            </ion-col>
            <ion-col>
            <ion-title class ="mainTitle"> About </ion-title>
            </ion-col>
            </ion-row>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-card>
            <ion-card-content>
            <ion-title class = 'ionTitle'> What is this? </ion-title>
            <p> A subscription platform to get alerts when vaccine appointments become available for your elected settings. </p>
            </ion-card-content>
        </ion-card>
        <ion-card>
            <ion-card-content>
            <ion-title class = 'ionTitle'> How are we different? </ion-title>
            <p> Our biggest difference and the biggest advantage we provide is our 'Pincode + Radius' search, an easy way to compile all the pincodes within your reach. </p>
            </ion-card-content>
        </ion-card>
        <ion-card>
            <ion-card-content>
            <ion-title class = 'ionTitle'> What features do we provide? </ion-title>
            <p> We provide the following features </p>
            <ul>
                <li> Pincode + Radius search: It is hard to manually compile all the pincodes near us. Our tool makes it easy for you to specify your picode and how far you are willing to travel. We use that input to compute all the pincodes that lie within the search radius.</li>
                <li> Custom filters: You can filter your notification settings based on age, brand, free/paid vaccine and receive only relevant notifications. </li>
                <li> Edit filters: Once you subscribe, we provide a UUID key. You can use that key to edit your filters as many times as you like, including adding more pincodes. </li>
            </ul>
            </ion-card-content>
        </ion-card>
        <ion-card class>
            <ion-card-content>
            <ion-title class = 'ionTitle'> Summary? </ion-title>
            <p> High relevance. We only send a notification when there is a slot matching your requirements within 'N' kilometers from you. </p>
            </ion-card-content>
        </ion-card>
        <ion-card class = "details">
            <ion-card-content>
            <p> In case of anything or if you want to report a bug, please write us a mail at 'shadjadevs@gmail.com'. </p>
            </ion-card-content>
        </ion-card>
      </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonCard, IonButton,  IonIcon } from '@ionic/vue';
import { menuController } from "@ionic/vue";
import { menuOutline } from 'ionicons/icons';
export default {
  name: 'About',
  components: { IonPage, IonCard, IonButton, IonIcon },
  setup() {
      return {
          menuOutline
      };
  },
  methods: {
    openStart() {
      menuController.open("mainMenu");
    },
  }
}
</script>

<style scoped>
.mainTitle {
  margin-left: 5px;
  padding-top: 10px;
}
.ionTitle {
    margin-left: -20px !important;
}
.details {
  margin-bottom: 80px;
}
</style>