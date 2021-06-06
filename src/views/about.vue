<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-row>
          <ion-col>
            <ion-title class ="mainTitle">
              <div class="titleicon">
                <img alt="logo" height="40" src="../../public/assets/icon/android-chrome-192x192.png"> &ensp;BookMyVaccine | About
              </div>
            </ion-title>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid fixed>
        <ion-card>
          <ion-card-content>
            <div>
              <div class="ion-text-center">
                <ion-button @click="$router.replace('/tabs/subscribe')">Subscribe now</ion-button>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
        <ion-card>
          <ion-card-content>
            <ion-card-title> What is BookMyVaccine? </ion-card-title>
            <p> BookMyVaccine sends you a notification whenever a vaccine appointment is available near you. Subscribe today to get notified as soon as slots open up. </p>
          </ion-card-content>
        </ion-card>
        <ion-card>
          <ion-card-content>
            <ion-card-title> Why BookMyVaccine? </ion-card-title>
            <p> Unlike other tools, BookMyVaccine sends you a notification only when there is an appointment avaialable MATCHING your requirements NEAR you.
                We do this by periodically looking for slots in all pincodes within <b>N km</b> radius from your location, and filter them based on your preferences. </p>
          </ion-card-content>
        </ion-card>
        <ion-card>
          <ion-card-content>
            <ion-card-title> Features </ion-card-title>
            <ul>
                <li> <b>Pincode search:</b> Don't know all the pincodes near you? Simply specify your pincode and how far you are willing to travel for your vaccine. BookMyVaccine will figure out all the pincodes that lie within the search radius. Want to customize? You can always modify the suggested picodes. </li>
                <li> <b>Custom filters:</b> Specify your preference for dates, brand, free/paid vaccine and receive only relevant notifications. </li>
                <li> <b>Edit filters:</b> Once you subscribe, we provide a UUID key. You can use that key to edit your filters as many times as you like, including adding more pincodes. </li>
                <li> <b>Easy unsubscribe:</b> Got your vaccine and/or don't wish to be notified any more? Simply click on <i>Unsubscribe from this notification</i> in the email and you will be unsubscribed. </li>
            </ul>
          </ion-card-content>
        </ion-card>
        <ion-card class>
          <ion-card-content>
            <ion-card-title> Summary </ion-card-title> 
            <p> Cut the clutter and get notified of appointments RELEVANT to you, quickly.
                Subscribe today! Here is a sample notification </p>
            <div class="ion-text-center"> <img src="../assets/SampleNotification.png"> </div>
          </ion-card-content>
        </ion-card>
        <ion-card>
          <ion-card-content>
            <div>
              <div class="ion-text-center">
                <ion-button @click="$router.replace('/tabs/subscribe')">Subscribe now</ion-button>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
        <ion-card class = "details">
          <ion-card-content>
              <div class="ion-text-center">
                <p> Have a question or a bug report? Email <a href="mailto:hello@bookmyvaccine.app">hello@bookmyvaccine.app</a></p>
              </div>
          </ion-card-content>
        </ion-card>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonCard, IonButton } from '@ionic/vue';
export default {
  name: 'About',
  components: { IonPage, IonCard, IonButton }
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
.buttonDisplay {
  bottom:5px;
  left:5px;
  position: absolute;
}
.titleicon {
  display: flex;
  align-items: center;
}
</style>
