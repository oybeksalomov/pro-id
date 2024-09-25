import { defineStore } from "pinia";
import {authorizedClient, unauthorizedClient} from '@/services/axios.js'
import { computed, reactive } from "vue";

export const useOauthStore = defineStore('oauthStore', () => {

    const state = reactive({
        client: {
            id: null,
            name: '',
            redirect: ''
        },
        
    })
    
    const fetchClients = (id) => {

        return authorizedClient.get('/v2/getClient', {
            params: {
                client_id: id
            }
        })
        .then(res => {
            state.client = res.data
            return res
        })
    }

    const authorizeClient = (params) => {
        return authorizedClient.get('/v2/oauth/authorize', {
            params: {
                client_id: params.client_id,
                redirect_uri: params.redirect_uri,
                scope: params.scope,
                state: params.state,
                user_id: params.user_id
            }
        })
    }

    return {
        authorizeClient,
        fetchClients,
        getClient: computed(() => state.client)
    }
})