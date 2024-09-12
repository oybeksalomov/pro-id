import {defineStore} from "pinia";
import {computed} from "vue";
import {unauthorizedClient} from "@/services/axios.js";
import phoneMasks from '@/assets/phoneMasks.json'

export const useCountryStore = defineStore('countryStore', () => {
    const state = {
        countries: [],
        activeCountries: [],
    }

    const fetchCountries = () => {
        return unauthorizedClient.get('/v2/countries')
            .then(res => {
                state.countries = res.data.filter(country => country["is_active"])
                selectCountries()
            })
    }

    const selectCountries = () => {
        state.activeCountries = []
        if (state.countries.length > 0) {
            state.countries.forEach(country => {
                if(phoneMasks.hasOwnProperty(country["local_name"])) {
                    state.activeCountries.push({...country, mask: phoneMasks[country["local_name"]], code: phoneMasks[country["local_name"]].replace(/[\s()#-]/g, '')})
                }
            })
        }
    }

    return {
        fetchCountries,
        selectCountries,
        getActiveCountries: computed(() => state.activeCountries),
    }
})