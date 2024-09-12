import {defineStore} from "pinia";
import {computed, reactive} from "vue";

export const useHeaderStore = defineStore('headerStore', () => {
    const state = reactive({
        isOpenProfile: false
    })

    const toggleProfile = () => {
        state.isOpenProfile = !state.isOpenProfile
    }

    return {
        toggleProfile,
        isOpenProfile: computed(() => state.isOpenProfile),
    }
})