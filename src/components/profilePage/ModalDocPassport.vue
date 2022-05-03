<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-nav-link router-direction="back">
            <ion-icon :icon="chevronBack"></ion-icon>
          </ion-nav-link>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-grid>
        <ion-row>
          <ion-col><h4 class="ion-text-center">Важное сообщение</h4></ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <p class="ion-text-center opacity-5">
              Указывайте достоверную информацию, заказчик будет видеть что вы прошли
              проверку паспорта
            </p>
            <p class="ion-text-center opacity-5">Для проверки потребуется:</p>
            <ion-list>
              <ion-item
                lines="full"
                detail
                button
                disabled="true"
                fill="solid"
                @click="takePassport"
              >
                <template> </template>
                <template> </template>
                <ion-icon slot="start" :icon="documentText"></ion-icon>
                <ion-icon slot="start" :icon="checkmark"></ion-icon>
                <ion-label>Документ</ion-label>
              </ion-item>
              <ion-item lines="full" detail button>
                <ion-icon slot="start" :icon="personCircle"></ion-icon>
                <ion-label>Селфи с паспортом</ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
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
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonButton,
  IonNavLink,
  IonIcon,
  IonGrid,
  IonRow,
  IonFooter,
  IonCol,
  IonItem,
  IonList,
  IonLabel,
} from "@ionic/vue";
import {
  documentText,
  personCircle,
  chevronBack,
  cloudDone,
  checkmark,
} from "ionicons/icons";
import { Camera, CameraResultType } from "@capacitor/camera";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import jwtInterceptor from "@/components/shared/jwtInterceptor";

export default {
  name: "ModalDocPassport",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonButtons,
    IonButton,
    IonNavLink,
    IonIcon,
    IonItem,
    IonList,
    IonFooter,

    IonLabel,
  },
  setup() {
    const store = useStore();
    const disabledSaveButton = ref(false);
    const isPassportUploaded = ref(false);
    const saveButton = async () => {
      disabledSaveButton.value = true;
    };

    const takePassport = async () => {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });
      const userObj = computed(() => store.getters["us/getUserObject"]);
      async function base64FromPath(path) {
        const response = await fetch(path);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result);
            } else {
              reject("method did not return a string");
            }
          };
          reader.readAsDataURL(blob);
        });
      }
      function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
      }
      const base64 = await base64FromPath(image.webPath);
      const fileImg = dataURLtoFile(base64, `passport_${userObj.value.id}.jpeg`);

      if (image.webPath) {
        let formData = new FormData();
        formData.append("user_id", userObj.value.id);
        formData.append("imgSrc", fileImg);

        const uploadPassport = await jwtInterceptor.post(
          "/service/uploadPassport",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (uploadPassport.data.status == "success") {
          isPassportUploaded.value = true;
        } else {
          isPassportUploaded.value = false;
        }
      }
    };
    return {
      documentText,
      personCircle,
      chevronBack,

      disabledSaveButton,
      cloudDone,
      checkmark,
      saveButton,
      takePassport,
    };
  },
};
</script>

<style></style>
