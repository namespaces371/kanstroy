<template>
  <ion-page>
    <ion-header>
      <catalogSearchComponent />
    </ion-header>

    <ion-content ref="content" :scroll-events="true" @ionScroll="onScroll">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <swiper :slides-per-view="3">
              <swiper-slide>
                <div class="suggest-cat">
                  <div class="suggest-cat--thumb">
                    <ion-thumbnail>
                      <ion-img
                        src="assets/icon/tool-bar-icon/commercial.png"
                      ></ion-img>
                    </ion-thumbnail>
                  </div>
                  <ion-label position="stacked"
                    ><small>Комм. недвижимость</small></ion-label
                  >
                </div>
              </swiper-slide>

              <swiper-slide>
                <div class="suggest-cat">
                  <div class="suggest-cat--thumb">
                    <ion-thumbnail>
                      <ion-img
                        src="assets/icon/tool-bar-icon/apartment.webp"
                      ></ion-img>
                    </ion-thumbnail>
                  </div>
                  <ion-label position="stacked"
                    ><small>Жилые помещения</small></ion-label
                  >
                </div>
              </swiper-slide>

              <swiper-slide>
                <div class="suggest-cat">
                  <div class="suggest-cat--thumb">
                    <ion-thumbnail>
                      <ion-img
                        src="assets/icon/tool-bar-icon/house.webp"
                      ></ion-img>
                    </ion-thumbnail>
                  </div>
                  <ion-label position="stacked"
                    ><small>Дачные участки</small></ion-label
                  >
                </div>
              </swiper-slide>

              <swiper-slide>
                <div class="suggest-cat">
                  <div class="suggest-cat--thumb">
                    <ion-thumbnail>
                      <ion-img
                        src="assets/icon/tool-bar-icon/parking.png"
                      ></ion-img>
                    </ion-thumbnail>
                  </div>
                  <ion-label position="stacked"
                    ><small>Паркинги</small></ion-label
                  >
                </div>
              </swiper-slide>

              <swiper-slide>
                <div class="suggest-cat">
                  <div class="suggest-cat--thumb">
                    <ion-thumbnail>
                      <ion-img
                        src="assets/icon/tool-bar-icon/fast.png"
                      ></ion-img>
                    </ion-thumbnail>
                  </div>
                  <ion-label position="stacked"
                    ><small>Быстрый ремонт</small></ion-label
                  >
                </div>
              </swiper-slide>
            </swiper>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-list>
        <catalogItemList
          v-for="(item, idx) in catalogList"
          :key="idx"
          :item="item"
          @click="presentLoading"
        />
      </ion-list>

      <ion-fab
        vertical="bottom"
        horizontal="end"
        slot="fixed"
        @click="scrollToUp"
        v-show="showtoScroll"
      >
        <ion-fab-button>
          <ion-icon :icon="arrowUpCircleOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>
<script setup>
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonThumbnail,
  IonHeader,
  IonPage,
  IonLabel,
  IonList,
  IonIcon,
  IonFab,
  IonFabButton,
  loadingController,
} from "@ionic/vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "@ionic/vue/css/ionic-swiper.css";

import { arrowUpCircleOutline } from "ionicons/icons";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import catalogSearchComponent from "./catalogPage/catalogSearchComponent.vue";
import catalogItemList from "@/components/mainTabs/catalogPage/catalogItemList.vue";

const store = useStore();
const catalogList = computed(() => store.getters["cs/getCatalogList"]);

const presentLoading = async () => {
  const loading = await loadingController.create({
    cssClass: "my-custom-class",
    message: "Загрузка...",
    duration: 1000,
  });

  await loading.present();

  setTimeout(function () {
    loading.dismiss();
  }, 1000);
};
const content = ref();
const showtoScroll = ref(false);
const onScroll = () => {
  if (content.value.$el.detail.scrollTop > 300) {
    showtoScroll.value = true;
  } else {
    showtoScroll.value = false;
  }
};
const scrollToUp = () => {
  content.value.$el.scrollToTop(200);
};
</script>
<style scoped>
.suggest-cat {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.suggest-cat--thumb {
  padding: 10px;
  background: #4c8dff21;
  border-radius: 15px;
}
</style>
