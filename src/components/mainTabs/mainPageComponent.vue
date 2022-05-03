<template>
  <ion-page>
    <ion-header> </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-item color="primary">
          <ion-label>
            <ion-text color="light">
              <h2>Заполните документы</h2>
              <p class="ion-padding-bottom">
                Добавьте все необходимые документы <br />
                чтобы скорее начать зарабатывать <br />
                бабосики
              </p>
            </ion-text>
            <ion-button
              size="large"
              color="secondary"
              expand="block"
              @click="invatePerson"
            >
              Заполнить данные
            </ion-button>
          </ion-label>
        </ion-item>
      </ion-card>

      <ion-card>
        <ion-item color="primary">
          <ion-label>
            <ion-text color="light">
              <h2>Заполните профиль</h2>
              <p class="ion-padding-bottom">
                Это повысит шансы получения заказа
              </p>
            </ion-text>
            <ion-button
              size="large"
              color="secondary"
              expand="block"
              @click="invatePerson"
            >
              Заполнить
            </ion-button>
          </ion-label>
        </ion-item>
      </ion-card>

      <ion-card>
        <ion-item class="ion-text-center">
          <ion-label>
            <ion-text>
              <h4 class="ion-padding-bottom">Пригласите знакомых</h4>
            </ion-text>
            <ion-button size="small" expand="block" @click="invatePerson">
              <ion-icon :icon="personAddOutline" slot="start"></ion-icon>
              Пригласить
            </ion-button>
          </ion-label>
        </ion-item>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script setup>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonLabel,
  IonItem,
  IonIcon,
  IonButton,
  IonText,
} from "@ionic/vue";
import { personAddOutline } from "ionicons/icons";
import { alertController } from "@ionic/vue";
const invatePerson = async () => {
  const alert = await alertController.create({
    header: "Ошибка",
    message: "Пока не доступно.",
    buttons: ["OK"],
  });
  await alert.present();
};
</script>
