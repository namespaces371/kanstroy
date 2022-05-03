<template>
  <ion-page>
    <ion-header> </ion-header>
    <ion-content class="ion-padding" fullscreen="true">   
      <ion-text color="primary">
         <ion-thumbnail>
          <ion-img
            src="assets/icon/android-chrome-192x192.png"
          ></ion-img>
        </ion-thumbnail>             
        <h3 class="ion-padding-bottom">Укажите номер телефона</h3>
      </ion-text>        

      <ion-list class="app-border-radius">
        <ion-item lines="none">
          <ion-label position="stacked">Номер телефона</ion-label>
          <ion-input
            class="phone-input"
             placeholder="(000) 000 00-00"
            :class="classObjectPhone"
            autocorrect="on"
            inputmode="tel"
            maxlength="20"
            autocomplete="tel"
            pattern="tel"
            type="tel"
            size="tel"
            v-model="phoneNumberModel"
            @ionChange="onInputPhone"
          ></ion-input>
        </ion-item>
      </ion-list>

      <ion-modal
        @didDismiss="openModal(false)"
        :is-open="isOpenRef"
        canDismiss="true"

      >
        <ion-content>
          <signinConfirmComponent @didDismiss="openModal(false)" :phoneNumber="phoneNumberModel" />
        </ion-content>
      </ion-modal>
    </ion-content>
    <ion-footer>
      <ion-button
        class="button-continue"
        expand="block"
        shape="round"
        color="primary"
        :disabled="!buttonActive"
        @click="openModal(true)"
        >Продолжить
        <ion-icon slot="end" :icon="arrowForwardOutline"></ion-icon>
      </ion-button>
    </ion-footer>
  </ion-page>
</template>
<script setup>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonButton,
  IonFooter,
  IonIcon,
  IonModal,
  IonThumbnail,
  IonImg,
} from "@ionic/vue";
import signinConfirmComponent from "./signinConfirmComponent.vue";
import { arrowForwardOutline } from "ionicons/icons";

import { ref, computed } from "vue";
import parsePhoneNumber from "libphonenumber-js";

const phoneNumberModel = ref("");
const phoneValid = ref(false);
const buttonActive = ref(false);
const isOpenRef = ref(false);

const openModal = (flag) => {
  isOpenRef.value = flag;
};
const classObjectPhone = computed(() => ({
  success: phoneValid.value,
  wrong: !phoneValid.value,
}));

const onInputPhone = () => {
  const phoneNumber = parsePhoneNumber(phoneNumberModel.value, "RU");
  if (phoneNumber) {
    if (phoneNumber.isValid()) {
      //   const phoneData = {
      //     country: phoneNumber.country,
      //     number: phoneNumber.number,
      //     nationalNumber: phoneNumber.nationalNumber,
      //   };
      phoneNumberModel.value = phoneNumber.formatInternational();
      phoneValid.value = true;
      buttonActive.value = true;
    } else {
      phoneValid.value = false;
      buttonActive.value = false;
    }
  }
};
</script>
<style scoped>

ion-input.phone-input {
  font-size: 25px;
  font-weight: bold;
}
ion-input.phone-input.wrong {
  --color: #9d9d9d5c;
}
ion-input.phone-input.success {
  --color: var(--ion-color-primary);
}
</style>
