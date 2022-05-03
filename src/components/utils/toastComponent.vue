<template>
  <ion-toast
    :is-open="open"
    :color="color"
    :message="message"
    :duration="duration"
    keyboardClose="true"
    
    @didDismiss="$emit('dismiss')"
  >
  </ion-toast>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
defineProps(["message",'duration','color','open']);
defineEmits(['dismiss'])

import {
  IonToast,
} from "@ionic/vue";
</script>

