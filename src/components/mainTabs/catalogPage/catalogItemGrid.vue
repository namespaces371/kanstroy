<template>

                    <ion-card>
                        <img :src="item.thumb" />
                        <ion-card-header translucent="true">
                            <ion-card-title style="font-size:20px">
                                {{item.title}}
                            </ion-card-title>
                            <ion-card-subtitle>{{item.address}}</ion-card-subtitle>
                        </ion-card-header>

                    </ion-card> 

</template>
<script setup>
import {defineProps} from 'vue'
defineProps(['item'])
import {
  IonCard,
  IonCardHeader,

  IonCardSubtitle,
  IonCardTitle,

} from '@ionic/vue';


</script>
