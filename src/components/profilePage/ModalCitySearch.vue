<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-nav-link router-direction="back">
            <ion-icon :icon="chevronBack"></ion-icon>
          </ion-nav-link>
        </ion-buttons>

        <ion-title>Выбрать город</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          v-model="searchText"
          @ionChange="searchCity"
          placeholder="Москва"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <template v-if="cityItems.length > 0">
        <ion-list>
          <ion-item
            v-for="city in cityItems"
            :key="city.id"
            @click="selectCity(city.value)"
          >
            {{ city.value }}
          </ion-item>
        </ion-list>
      </template>
      <template v-else>
        <p class="ion-text-center ion-padding" style="opacity: 0.5">
          Введите запрос в строку..
        </p>
      </template>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  IonContent,
  IonList,
  IonItem,
  IonButtons,
  IonNavLink,
  IonIcon,
  modalController,
} from "@ionic/vue";
import { chevronBack } from "ionicons/icons";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import jwtInterceptor from "@/components/shared/jwtInterceptor";

export default {
  name: "ModalCitySearch",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSearchbar,
    IonContent,
    IonList,
    IonItem,
    IonButtons,
    IonNavLink,
    IonIcon,
  },
  setup() {
    const store = useStore();
    const searchText = ref("");

    const cityItems = ref([]);
    const searchCity = async () => {
      cityItems.value = [];
      if (searchText.value.length >= 2) {
        const cityQuery = await jwtInterceptor.post("/service/getCity", {
          query: searchText.value,
        });
        if (!cityQuery.error) {
          cityItems.value.push(cityQuery.data[0]);
        }
      }
    };

    const selectCity = async (city) => {
      const userObj = computed(() => store.getters["us/getUserObject"]);
      const resultDispatch = await store.dispatch("us/updateUser", {
        user_id: userObj.value.id,
        userData: { city: city },
      });
      if (resultDispatch.status == "success") {
        await modalController.dismiss();
      }
    };

    return {
      chevronBack,
      searchCity,
      searchText,
      cityItems,
      selectCity,
    };
  },
};
</script>

<style></style>
