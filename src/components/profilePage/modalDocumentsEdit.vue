<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Закрыть</ion-button>
        </ion-buttons>
        <ion-title>Ваши документы</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <h3>Подтверждение данных</h3>
      </ion-item>
      <ion-item detail button @click="goToPassport">
        <ion-label
          >Паспорт
          <p>
            Пройдите проверку паспорта,<br />
            понадобиться фото паспорта
          </p>
        </ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
/* eslint-disable */
import { defineComponent, onMounted, ref, computed } from "vue";
import { cloudDone } from "ionicons/icons";
import { useStore } from "vuex";

import ModalDocPassport from "./ModalDocPassport.vue";

import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonIcon,
  IonThumbnail,
  IonImg,
  IonModal,
  modalController,
  alertController,
} from "@ionic/vue";

export default defineComponent({
  name: "modalDocumentsEdit",
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
    IonLabel,
    IonIcon,

    IonThumbnail,

    IonImg,
    IonModal,
    ModalDocPassport,
  },
  setup() {
    const modalNav = ref(null);

    const goToPassport = () => {
      modalNav.value.push(ModalDocPassport, {
        modalNav,
      });
    };
    onMounted(async () => {
      modalNav.value = document.getElementById("modal-nav");
    });

    const closeModal = async () => {
      await modalController.dismiss();
    };

    return {
      closeModal,
      cloudDone,
      goToPassport,
    };
  },
});
</script>

<style scoped>
ion-thumbnail {
  --border-radius: 50%;
  width: 80px;
  height: 80px;
  margin: auto;
}
</style>
