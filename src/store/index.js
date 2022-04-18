import { createStore } from 'vuex';
import catalogStore from './catalogStore';

const store = createStore({
    modules:{
        cs:catalogStore
    }
})
export default store