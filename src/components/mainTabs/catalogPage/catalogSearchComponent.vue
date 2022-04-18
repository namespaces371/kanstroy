<template>
     <ion-searchbar 
     show-cancel-button="never"
     placeholder="Поиск.."
     autocomplete="on"
     enterkeyhint="search"
     v-model="searchText"
     @ionChange="searchItems"
     
     @ionClear="searchItemAvalible = false"

     ></ion-searchbar>  

     <ion-list v-if="searchItemAvalible">
       <ion-item v-for="item in searchResult" :key="item">
              <ion-label>
                {{item.result}}
                <p>{{item.relation}}</p>
              </ion-label>  
       </ion-item>    
     </ion-list>
</template>
<script setup>
import {
  IonLabel,
  IonList,
  IonItem,
  IonSearchbar,
} from '@ionic/vue';
import {computed, ref} from 'vue'
import {useStore} from 'vuex'

const searchText = ref('')
const searchItemAvalible = ref(false)
const store = useStore()

const searchItems = () => {
  if(searchText.value.length > 0){

    store.dispatch('cs/fetchSearch', searchText.value)
    
    searchItemAvalible.value = true
  }else{
    searchItemAvalible.value = false
  }
}
const searchResult = computed(() => store.getters['cs/getSearchResult'])

</script>
