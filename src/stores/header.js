import {defineStore} from "pinia";
import {computed, reactive} from "vue";

export const useHeaderStore = defineStore('headerStore', () => {
    const state = reactive({
        isOpenProfile: false,
        isOpenServices: false,
    })

    const toggleProfile = () => {
        if (state.isOpenServices) {
            state.isOpenServices = false
            setTimeout(() => state.isOpenProfile = !state.isOpenProfile, 350)
        } else {
            state.isOpenProfile = !state.isOpenProfile
        }
    }
    const toggleServices = () => {
        if (state.isOpenProfile) {
            state.isOpenProfile = false
            setTimeout(() => state.isOpenServices = !state.isOpenServices, 350)

        } else {
            state.isOpenServices = !state.isOpenServices
        }

    }

    return {
        toggleProfile,
        toggleServices,
        isOpenServices: computed(() => state.isOpenServices),
        isOpenProfile: computed(() => state.isOpenProfile),
    }
})