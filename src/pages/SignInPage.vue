<template>
    <AuthContainer>
        <div class="mt-[30px] w-full">
            <div class="flex flex-col items-center justify-center h-[54px]">
                <div v-if="!hasUser" class="title">
                    <b>
                        PRO ID
                    </b>—<br>
                    ключ от всех сервисов.
                </div>
                <LoaderSpinner v-if="isLoading" class="border-base-color"/>
                <div v-if="hasUser && userFullName && !isLoading" class="text-[17px] text-center text-base-color">{{userFullName}}</div>
                <div v-if="hasUser && !userFullName && !isLoading" class="title">Нет аккаунта под таким номером</div>
            </div>

            <form class="flex flex-col gap-5 mt-5">
                <PhoneInput v-model="phone_number" @selected-country="selectCountry"/>
                <BaseButton
                    type="button"
                    @click="check"
                    class="black-bg w-full"
                    :disabled="isDisabled"
                >Kirish</BaseButton>
                <BaseButton type="button" class="outline-bg w-full">Восстановить PRO ID</BaseButton>
            </form>
        </div>
    </AuthContainer>
</template>

<script setup>
import AuthContainer from "@/components/AuthContainer.vue";
import BaseButton from "@/components/BaseButton.vue";
import PhoneInput from "@/components/PhoneInput.vue";
import {ref, watch} from "vue";
import {useUserStore} from "@/stores/modules/user.js";
import {useCountryStore} from "@/stores/modules/country.js";
import {useField, useForm} from "vee-validate";
import {object, string} from "yup";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import {useRouter} from "vue-router";

const userStore = useUserStore()
const countryStore = useCountryStore()
const isDisabled = ref(true)
const selectedCountry = ref(null)
const hasUser = ref(false)
const isLoading = ref(false)
const userFullName = ref('')
const router = useRouter()

const validationSchema = object({
    phone_number:  string()
        .required()
        .test('is-complete', function(value) {
            if (selectedCountry.value?.mask.length === value.length) {
                isDisabled.value = false
                return true
            } else {
                isDisabled.value = true
            }
        }),

})

const {handleSubmit} = useForm({
    validationSchema,
})

const check = handleSubmit(async (form) => {
    form.phone_number = form.phone_number.replace(/[\s()+-]/g, '')

    // await userStore.fetchToken(form)
    await userStore.sendOTP(form)
        .then((res) => {
            console.log(res.data.code)
            router.push('/send-code')
        })

})

const {value: phone_number} = useField('phone_number')

const selectCountry = (value) => {
    selectedCountry.value = value
}

watch(() => phone_number.value, async () => {
    if (selectedCountry.value?.mask.length === phone_number.value.length) {
        hasUser.value = true
        isLoading.value = true
        const form = {"phone_number": phone_number.value.replace(/[\s()+-]/g, '')}
        await userStore.hasUser(form)
            .then(res => {
                userFullName.value = res.data.name + ' ' + res.data.surname
            })
            .catch(() => {
                userFullName.value = ''
            })
            .finally(() => {
                isLoading.value = false
            })
    } else {
        hasUser.value = false
    }
})
</script>

<style scoped>

</style>