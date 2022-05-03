<template>
  <ion-page>
    <ion-header></ion-header>
    <ion-content>
      <ion-text color="primary">
        <h2
          class="ion-padding"
          style="
            display: flex;
            align-items: center;
            justify-content: flex-start;
          "
        >
          <ion-button fill="clear" @click="$emit('didDismiss')">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
          </ion-button>
          <ion-icon :icon="chatbox"></ion-icon> Подтвердите номер
        </h2>
      </ion-text>
      <ion-text color="primary">
        <p class="ion-padding">
          Код был отправлен на номер <br />
          {{ phoneNumber }}
        </p>
      </ion-text>
      <ion-grid>
        <ion-row>
          <ion-col size="3" v-for="(l, i) in pinlength" :key="`codefield_${i}`">
            <ion-input
              class="ion-text-center app-border-radius"
              ref="pinItems"
              :autofocus="i == 0"
              :id="`codefield_${i}`"
              v-model="pinValues[i]"
              value=""
              maxlength="1"
              max="9"
              min="0"
              inputmode="decimal"
              @ionChange="stepForward(i)"
              @keydown.backspace="stepBack(i)"
              @ionFocus="resetValue(i)"
            ></ion-input>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <template v-if="!requestReady">
              <ion-text color="primary">
                <p class="ion-padding">
                  Отправить новый код через
                  {{ requestDelay }} секунд
                </p>
              </ion-text>
            </template>
            <template v-else>
              <ion-button fill="clear" @click="sendOTP"
                >Отправить снова</ion-button
              >
            </template>
          </ion-col>
        </ion-row>
      </ion-grid>

      <toastComponent
        :message="toastMessage"
        color="primary"
        duration="1000"
        :open="toastOpen"
        @dismiss="toastOpen = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { defineProps, ref, computed, onMounted } from "vue";
const props = defineProps(["phoneNumber"]);
import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
} from "@ionic/vue";
import { chatbox, arrowBackOutline } from "ionicons/icons";
import toastComponent from "@/components/utils/toastComponent.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const pinlength = ref(4);
const pinValues = ref([]);
const pinItems = ref([]);

const toastOpen = ref(false);
const toastMessage = ref("");

const requestDelay = ref(200);
const interval = ref(null);
onMounted(() => {
  sendOTP();
  enableTimer();
});

const enableTimer = () => {
  clearInterval(interval.value);
  interval.value = setInterval(() => {
    if (requestDelay.value === 0) {
      clearInterval(interval.value);
    } else {
      requestDelay.value--;
    }
  }, 1000);
};
const requestReady = computed(() => {
  return !!requestDelay.value == 0;
});

const stepForward = (i) => {
  if (pinValues.value[i] && i !== pinlength.value - 1) {
    pinItems.value[i + 1].$el.setFocus();
    pinValues.value[i + 1] = "";
  }
  checkPin();
};
const stepBack = (i) => {
  if (pinValues.value[i - 1] && i !== 0) {
    pinItems.value[i - 1].$el.setFocus();
    pinValues.value[i - 1] = "";
  }
};
const resetValue = (i) => {
  for (let x = 0; x < pinlength.value; x++) {
    if (x >= i) pinValues.value[x] = "";
  }
};
const sendOTP = async () => {
  const res = await store.dispatch("as/sendOTP", props.phoneNumber);
  if (res == "sended") {
    requestDelay.value = 200;
    enableTimer();
  }
};
const checkPin = () => {
  const code = ref("");
  for (let i = 0; i < pinlength.value; i++) {
    code.value = code.value + pinValues.value[i];
  }
  if (code.value.length == pinlength.value) {
    validatePin(code.value);
  }
};
const validatePin = async (code) => {
  await store.dispatch("as/loginUser", [props.phoneNumber, code]);
  const loginStatus = computed(() => store.getters["as/getOTPStatus"]);
  if (loginStatus.value == "success") {
    toastMessage.value = "Успешный вход";
    toastOpen.value = true;
    setTimeout(() => {
      router.go();
    }, 1000);
  } else if (loginStatus.value == "wrong") {
    toastMessage.value = "Неверный код, попробуйте снова";
    toastOpen.value = true;
  }
};
</script>

<style scoped>
ion-input {
  border-radius: 20px;
  font-size: 30px;
  background: var(--ion-color-primary);
  color: var(--ion-color-primary-contrast);
}
</style>
