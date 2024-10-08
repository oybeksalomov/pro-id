import {defineStore} from "pinia";
import {computed, reactive} from "vue";
import {authorizedClient, unauthorizedClient} from "@/services/axios.js";

export const useUserStore = defineStore('userStore', () => {
    const state = reactive({
        accessToken: localStorage.getItem("accessToken"),
        user: {
            name: '',
            surname: '',
            phone_number: '',
            avatar: ''
        },
        hashed_code: ''
    })

    const fetchUser = () => {
        return authorizedClient.get('/v2/user')
            .then(res => {
                state.user = res.data
                return res
            })
    }

    const setUserData = (data) => {
        state.user = data;
    }

    const fetchToken = (data) => {
        return unauthorizedClient.post('/v2/login/', data)
            .then(res => {
                state.accessToken = res.data["access_token"]
                localStorage.setItem('accessToken', res.data["access_token"])
                state.user = res.data.user
                return res;
            })
    }

    const register = (data) => {
        return unauthorizedClient.post('/v2/register/', data)
            .then(res => {
                state.accessToken = res.data["access_token"]
                localStorage.setItem('accessToken', res.data["access_token"])
                state.user = res.data.user
                return res;
            })
    }

    const sendOTP = (data) => {
        return unauthorizedClient.post('/sendOTP', data)
            .then(res => {
                state.hashed_code = res.data.hashed_code
                return res
            })
    }

    const hasUser = (data) => {
       return unauthorizedClient.post('/v2/has-user/', data)
           .then(res => {
               state.user = res.data
               return res;
           })
    }

    const checkCode = (data) => {
        return unauthorizedClient.post('/v2/checkCode', data)
    }

    const clearToken = () => {
        localStorage.removeItem('accessToken')
        state.accessToken = null
    }

    const removeToken = () => {
        return authorizedClient.get('/v2/logout')
    }

    return {
        hasUser,
        fetchToken,
        sendOTP,
        checkCode,
        clearToken,
        setUserData,
        register,
        removeToken,
        fetchUser,
        getAccessToken: computed(() => state.accessToken),
        getUser: computed(() => state.user),
        getHashedCode: computed(() => state.hashed_code)
    }
})