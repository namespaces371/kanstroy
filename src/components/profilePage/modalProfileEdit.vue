<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Закрыть</ion-button>
        </ion-buttons>
        <ion-title>Редактирование</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="ion-padding">
        <ion-item lines="none">
          <ion-thumbnail>
            <ion-img :src="avatarURL"></ion-img>
          </ion-thumbnail>
        </ion-item>
      </div>
      <ion-item button detail @click="goToCity">
        <ion-label>{{ userData.city ? userData.city : "Выберите город" }}</ion-label>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Имя</ion-label>
        <ion-input
          :value="userData.first_name"
          v-model="userInput.first_name"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Фамилия</ion-label>
        <ion-input
          :value="userData.second_name"
          v-model="userInput.second_name"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Отчество</ion-label>
        <ion-input
          :value="userData.patronymic_name"
          v-model="userInput.patronymic_name"
        ></ion-input>
      </ion-item>
    </ion-content>
    <ion-footer>
      <ion-button
        class="button-continue"
        expand="block"
        shape="round"
        color="primary"
        @click="saveButton"
        :disabled="disabledSaveButton"
        >Сохранить
        <ion-icon slot="end" :icon="cloudDone"></ion-icon>
      </ion-button>
    </ion-footer>
  </ion-page>
</template>

<script>
/* eslint-disable */
import { defineComponent, onMounted, ref, computed } from "vue";
import { cloudDone } from "ionicons/icons";
import { useStore } from "vuex";

import ModalCitySearch from "./ModalCitySearch.vue";

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
  IonFooter,
  IonThumbnail,
  IonImg,
  IonModal,
  modalController,
  alertController,
} from "@ionic/vue";

export default defineComponent({
  name: "modalProfileEdit",
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
    IonFooter,
    IonThumbnail,

    IonImg,
    IonModal,
    ModalCitySearch,
  },
  setup() {
    const store = useStore();

    const modalNav = ref(null);

    const userData = ref({});
    const avatarURL = ref("assets/avatarPlaceholder.png");

    const userInput = ref({
      first_name: "",
      second_name: "",
      patronymic_name: "",
      city: "",
    });

    const disabledSaveButton = ref(false);

    const goToCity = () => {
      modalNav.value.push(ModalCitySearch, {
        modalNav,
      });
    };
    onMounted(async () => {
      modalNav.value = document.getElementById("modal-nav");

      const user_id = computed(() => store.getters["as/getAuthData"]).value.userInfo.id;
      await store.dispatch("us/getUser", user_id);

      const userObj = computed(() => store.getters["us/getUserObject"]);

      userData.value = {
        phoneNumber: userObj.value.mobile,
        first_name: userObj.value.first_name,
        second_name: userObj.value.second_name,
        patronymic_name: userObj.value.patronymic_name,
        avatarThumb: userObj.value.avatar,
        city: userObj.value.city,
      };

      userInput.value = {
        first_name: userObj.value.first_name,
        second_name: userObj.value.second_name,
        patronymic_name: userObj.value.patronymic_name,
        city: userObj.value.city,
      };
      if (userData.value.avatarThumb !== "") {
        avatarURL.value = userData.value.avatarThumb;
      }
    });

    const saveButton = async () => {
      disabledSaveButton.value = true;
      const userObj = computed(() => store.getters["us/getUserObject"]);
      const resultDispatch = await store.dispatch("us/updateUser", {
        user_id: userObj.value.id,
        userData: userInput.value,
      });

      if (resultDispatch.status == "success") {
        disabledSaveButton.value = false;

        const alert = await alertController.create({
          header: "Сообщение",
          message: "Успешно обновлено",
          buttons: [
            {
              text: "OK",
              handler: async () => await modalController.dismiss(),
            },
          ],
        });
        await alert.present();
      } else {
        disabledSaveButton.value = false;
        const alert = await alertController.create({
          header: "Сообщение",
          message: "Попробуйте позже",
          buttons: ["OK"],
        });
        await alert.present();
      }
    };

    const closeModal = async () => {
      await modalController.dismiss();
    };

    return {
      closeModal,
      cloudDone,
      userData,
      avatarURL,
      userInput,
      saveButton,
      disabledSaveButton,
      goToCity,
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
