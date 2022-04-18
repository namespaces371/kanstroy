<template>
    <ion-content :fullscreen="true" class="ion-padding" scroll-y="false">
        <swiper :options="swiperOpt">
          <swiper-slide>
            <div class="slide">
              <img src="https://cdn2.vectorstock.com/i/1000x1000/45/76/worker-and-construction-background-frame-vector-9954576.jpg" />
            </div>
          </swiper-slide>
          <swiper-slide>
            <img src="https://ionicframework.com/docs/demos/api/slides/slide-4.png" />
            <h2>Готовы получать бабки??</h2>
            <span>тыкай на кнопку ниже и вперед!!!</span> <br />

                <ion-button fill="clear" href="/mainTabs">
                        Продолжить <ion-icon :icon="arrowForwardOutline" slot="end"></ion-icon>
                </ion-button>
          </swiper-slide>
        </swiper>
      </ion-content>
</template>
<script setup>
import { IonContent, IonIcon, IonButton} from '@ionic/vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { arrowForwardOutline } from "ionicons/icons";

import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';

const swiperOpt = {
  autoHeight: true
}


</script>

 <style scoped>
      .swiper-slide {
        display: block;
      }

      .swiper-slide h2 {
        margin-top: 2.8rem;
      }

      .swiper-slide img {
        max-height: 50%;
        max-width: 80%;
        margin: 60px 0 40px;
        pointer-events: none;
      }

      b {
        font-weight: 500;
      }

      p {
        padding: 0 40px;
        font-size: 14px;
        line-height: 1.5;
        color: var(--ion-color-step-600, #60646b);
      }

      p b {
        color: var(--ion-text-color, #000000);
      }
    </style>
