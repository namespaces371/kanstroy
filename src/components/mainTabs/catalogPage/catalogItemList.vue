<template>
        <ion-card>
            <img :src="item.thumb" />
            <ion-card-header>
                <ion-card-title>{{item.title}}</ion-card-title>
                <ion-card-subtitle>{{item.address}}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
                <ion-item>
                    <ion-label>Застройщик</ion-label>
                    <ion-badge color="light">{{item.developer}}</ion-badge>
                </ion-item>  
            <ion-item>
                    <ion-label>Кол-во работ</ion-label>
                    <ion-badge color="light">{{item.workCount}}</ion-badge>
                </ion-item>                    
                <ion-item>
                    <ion-label>Площадь</ion-label>
                    <ion-badge color="light">{{item.workSquare}}</ion-badge>
                </ion-item>
                <ion-item>
                    <ion-label>Рейтинг</ion-label>
                    <ion-badge :color="raitingColor(item.raiting)">{{item.raiting}}</ion-badge>
                </ion-item>            
            </ion-card-content>
        </ion-card>    
</template>
<script setup>
import {defineProps} from 'vue'
defineProps(['item'])
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonBadge,
  IonItem,
  IonLabel,
} from '@ionic/vue';

const raitingColor = (raiting) => {
    if(raiting >= 7){
        return 'success'
    }else if(raiting < 7 && raiting >= 4){
        return 'warning'
    }else if(raiting < 4){
        return 'danger'
    }
    return 'dark'
}
</script>
