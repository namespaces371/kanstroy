import { createStore } from 'vuex';
import catalogStore from './catalogStore';
import authStore from './authStore';
import userStore from './userStore'

const store = createStore({
    modules:{
        cs:catalogStore,
        as:authStore,
        us:userStore
    }
})
export default store