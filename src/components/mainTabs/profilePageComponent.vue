<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Профиль</ion-title>
        <ion-buttons slot="primary">
          <ion-button color="primary">
            <ion-icon :icon="notificationsCircle"></ion-icon>
          </ion-button>
          <ion-button color="primary">
            <ion-icon :icon="settings"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-item color="none" lines="none">
          <ion-avatar slot="end">
            <ion-img :src="avatarURL"></ion-img>
          </ion-avatar>
          <ion-label>
            <h2>{{ userData.first_name }}</h2>
            <p>Частное лицо</p>
          </ion-label>
        </ion-item>
      </ion-card>

      <ion-item color="none" lines="none">
        <ion-icon slot="start" :icon="call"></ion-icon>
        <ion-label>
          <h2>{{ userData.phoneNumber }}</h2>
        </ion-label>
      </ion-item>
      <ion-item color="none" lines="none">
        <ion-icon slot="start" :icon="location"></ion-icon>
        <ion-label>
          <h2>Москва</h2>
        </ion-label>
      </ion-item>

      <ion-card>
        <ion-item button lines="none" @click="setOpenModalProfile(true)">
          <ion-icon slot="start" :icon="person"></ion-icon>
          <ion-label class=""> Редактировать профиль</ion-label>
        </ion-item>

        <ion-item button lines="none" @click="setOpenModalDocuments(true)">
          <ion-icon slot="start" :icon="document"></ion-icon>
          <ion-label class=""> Редактировать документы</ion-label>
        </ion-item>
      </ion-card>

      <ion-modal :is-open="isOpenModalPorifle" @didDismiss="setOpenModalProfile(false)">
        <BaseModal :rootPage="modalProfileEdit" />
      </ion-modal>

      <ion-modal
        :is-open="isOpenModalDocuments"
        @didDismiss="setOpenModalDocuments(false)"
      >
        <BaseModal :rootPage="modalDocumentsEdit" />
      </ion-modal>
    </ion-content>
  </ion-page>
</template>
<script setup>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonLabel,
  IonItem,
  IonImg,
  IonAvatar,
  IonModal,
} from "@ionic/vue";
import { computed, onMounted, ref } from "vue";
import {
  settings,
  notificationsCircle,
  call,
  location,
  person,
  document,
} from "ionicons/icons";
import BaseModal from "@/components/modals/BaseModal.vue";
import modalProfileEdit from "@/components/profilePage/modalProfileEdit.vue";
import modalDocumentsEdit from "@/components/profilePage/modalDocumentsEdit.vue";
import { useStore } from "vuex";
const store = useStore();

const isOpenModalPorifle = ref(false);
const isOpenModalDocuments = ref(false);
const setOpenModalProfile = (state) => (isOpenModalPorifle.value = state);
const setOpenModalDocuments = (state) => (isOpenModalDocuments.value = state);

const avatarURL = ref("assets/avatarPlaceholder.png");

const userData = ref({});

onMounted(async () => {
  const user_id = computed(() => store.getters["as/getAuthData"]).value.userInfo.id;
  await store.dispatch("us/getUser", user_id);

  const userObj = computed(() => store.getters["us/getUserObject"]);

  userData.value = {
    phoneNumber: computed(() => userObj.value.mobile),
    first_name: computed(() => userObj.value.first_name),
    avatarThumb: computed(() => userObj.value.avatar),
  };

  if (userData.value.first_name == "") userData.value.first_name = "Заполните имя";

  if (userData.value.avatarThumb !== "") {
    avatarURL.value = userData.value.avatarThumb;
  }
});
</script>
