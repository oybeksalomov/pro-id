import {defineStore} from "pinia";
import {computed} from "vue";
import {unauthorizedClient} from "@/services/axios.js";

export const useUserStore = defineStore('userStore', () => {
    const state = {
        user: {
            name: '',
            surname: '',
        }
    }

    const fetchToken = async (data) => {
        await unauthorizedClient.post('/v2/login/', data)
            .then(res => {
                localStorage.setItem('accessToken', res.data["access_token"])
            })
    }

    const sendOTP = async (data) => {
        return await unauthorizedClient.post('/sendOTP', data)
    }

    const hasUser = async (data) => {
       return await unauthorizedClient.post('/v2/has-user/', data)
    }

    const clearToken = () => {
        localStorage.removeItem('accessToken')

        state.accessToken = localStorage.getItem('accessToken')
    }


    return {
        hasUser,
        fetchToken,
        sendOTP,
        clearToken,
        getAccessToken: computed(() => state.accessToken),
        getUser: computed(() => state.user),
    }
})