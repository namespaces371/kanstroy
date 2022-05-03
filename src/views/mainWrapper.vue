<template>
  <ion-page>
    <ion-tabs
      @ionTabsWillChange="beforeTabChange"
      @ionTabsDidChange="afterTabChange"
    >
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="mainPage" href="/mainTabs/mainPage">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Главная</ion-label>
          <ion-badge>2</ion-badge>
        </ion-tab-button>

        <ion-tab-button tab="inWorksPage" href="/mainTabs/inWorksPage">
          <ion-icon :icon="businessOutline"></ion-icon>
          <ion-label>В работе</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="catalogPage" href="/mainTabs/catalogPage">
          <ion-icon :icon="eyeOutline"></ion-icon>
          <ion-label>Поиск</ion-label>
        </ion-tab-button>

        <ion-tab-button disabled tab="help" href="/mainTabs/help">
          <ion-icon :icon="helpOutline"></ion-icon>
          <ion-label>Помощь</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profilePage" href="/mainTabs/profilePage">
          <ion-icon :icon="personCircle"></ion-icon>
          <ion-label>Профиль</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonRouterOutlet,
  IonBadge,
} from "@ionic/vue";

import {
  personCircle,
  homeOutline,
  businessOutline,
  helpOutline,
  eyeOutline,
} from "ionicons/icons";

const beforeTabChange = () => {
  // do something before tab change
  //console.log('BeforeTabChange')
};
const afterTabChange = () => {
  // do something after tab change
  //console.log('AfterTabChange')
};
</script>

<style scoped></style>
