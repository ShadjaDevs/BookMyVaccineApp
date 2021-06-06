<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="about" href="/tabs/about">
          <ion-icon :icon="information" />
          <ion-label>About</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="subscribe" href="/tabs/subscribe">
          <ion-icon :icon="notifications" />
          <ion-label>Subscribe</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="subscriptions" href="/tabs/subscriptions">
          <ion-icon :icon="megaphone"/>
          <ion-label>Edit subscription</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { information, notifications, megaphone } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      information,
      notifications,
      megaphone
    }
  }
}
</script>