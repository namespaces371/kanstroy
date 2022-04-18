<template>
  <ion-page>
    <ion-header>
      <catalogSearchComponent />
    </ion-header>
    
    <ion-content ref="content"
     :scroll-events="true"
     @ionScroll="onScroll"
     >
        <ion-grid>
          <ion-row>
            <ion-col size="12">
                <swiper :slides-per-view="3">
                  <swiper-slide> 
                      <div class="suggest-cat">
                        <div class="suggest-cat--thumb">
                          <ion-thumbnail>
                          <ion-img src="https://www.awicons.com/free-icons/download/toolbar-icons/vista-stock-icons-by-lokas-software/png/256/office-building.png"></ion-img>
                          </ion-thumbnail>
                        </div>
                        <ion-label position="stacked"><small>Комм. недвижимость</small></ion-label>
                      </div>
                  </swiper-slide>

                  <swiper-slide>
                      <div class="suggest-cat">
                        <div class="suggest-cat--thumb">
                          <ion-thumbnail>
                          <ion-img src="https://cdn.iconscout.com/icon/free/png-256/apartment-448-1128730.png"></ion-img>
                          </ion-thumbnail>
                        </div>
                        <ion-label position="stacked"><small>Жилые помещения</small></ion-label>
                      </div>
                  </swiper-slide>

                  <swiper-slide>
                      <div class="suggest-cat">
                        <div class="suggest-cat--thumb">
                          <ion-thumbnail>
                          <ion-img src="https://cdn.iconscout.com/icon/free/png-256/modern-house-17-1147665.png"></ion-img>
                          </ion-thumbnail>
                        </div>
                        <ion-label position="stacked"><small>Дачные участки</small></ion-label>
                      </div>
                  </swiper-slide>

                  <swiper-slide>
                      <div class="suggest-cat">
                        <div class="suggest-cat--thumb">
                          <ion-thumbnail>
                          <ion-img src="https://images.squarespace-cdn.com/content/v1/5cd9cfe9f4b3c90001d2eb25/1557790014779-1V8T9NFRB4XPVYFN9DM6/parking+%281%29.png"></ion-img>
                          </ion-thumbnail>
                        </div>
                        <ion-label position="stacked"><small>Паркинги</small></ion-label>
                      </div>
                  </swiper-slide>

                  <swiper-slide>
                      <div class="suggest-cat">
                        <div class="suggest-cat--thumb">
                          <ion-thumbnail>
                          <ion-img src="https://icons-for-free.com/download-icon-fast+flash+good+light+speed+icon-1320195378845312678_512.png"></ion-img>
                          </ion-thumbnail>
                        </div>
                        <ion-label position="stacked"><small>Быстрый ремонт</small></ion-label>
                      </div>
                  </swiper-slide>
                </swiper>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-list>
              <catalogItemList v-for="(item,idx) in catalogList" :key="idx" :item="item" @click="presentLoading"/>
 
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
} from '@ionic/vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';


import {arrowUpCircleOutline} from "ionicons/icons";
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
import catalogSearchComponent from './catalogPage/catalogSearchComponent.vue'
import catalogItemList from '@/components/mainTabs/catalogPage/catalogItemList.vue'

const store = useStore()
const catalogList = computed(() => store.getters['cs/getCatalogList'])

const presentLoading = async () => {
      const loading = await loadingController
        .create({
          cssClass: 'my-custom-class',
          message: 'Загрузка...',
          duration: 1000,
        });
        
      await loading.present();
      
      setTimeout(function() {
        loading.dismiss()
      }, 1000);
}
const content = ref();
const showtoScroll = ref(false);
const onScroll = () => {
    if (content.value.$el.detail.scrollTop > 300) {
        showtoScroll.value = true
        } else {
        showtoScroll.value = false
        }
    };
const scrollToUp = () => {
    content.value.$el.scrollToTop(200);
}

</script>
<style scoped>
.suggest-cat{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.suggest-cat--thumb{
    padding: 10px;
    background: #4c8dff21;
    border-radius: 15px;
}
</style>