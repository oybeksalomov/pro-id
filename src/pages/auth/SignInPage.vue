<template>
    <AuthContainer>
        <div class="mt-[30px] w-full">
            <div class="flex flex-col items-center justify-center h-[54px]">
                <div v-if="!isFullNumber" class="title">
                    <b>
                        PRO ID
                    </b>—<br>
                    ключ от всех сервисов.
                </div>
                <LoaderSpinner v-if="isLoading" class="border-base-color"/>
                <div v-if="isFullNumber && userFullName && !isLoading" class="text-[17px] text-center text-base-color">{{userFullName}}</div>
                <div v-if="isFullNumber && !userFullName && !isLoading" class="title">Нет аккаунта под таким номером</div>
            </div>

            <form class="flex flex-col gap-5 mt-5">
                <PhoneInput v-model="phone_number" @selected-country="selectCountry"/>
                <BaseButton
                    v-if="!userFullName && isFullNumber && !isLoading"
                    @click="signUp"
                    type="button"
                    class="black-bg w-full"
                >Ro'yhatdan o'tish</BaseButton>
                <BaseButton
                    v-else
                    type="button"
                    @click="check"
                    class="black-bg w-full"
                    :disabled="isDisabled || isLoadingSignIn"
                >
                    <LoaderSpinner v-if="isLoadingSignIn" class="border-base-color"/>
                    <span v-else>SMS kod olish</span>
                </BaseButton>
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
import {useField, useForm} from "vee-validate";
import {object, string} from "yup";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import {useRouter} from "vue-router";

const userStore = useUserStore()
const isDisabled = ref(true)
const selectedCountry = ref(null)
const isFullNumber = ref(false)
const isLoading = ref(false)
const isLoadingSignIn = ref(false)
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
    isLoadingSignIn.value = true
    await userStore.sendOTP(form)
        .then((res) => {
            console.log(res.data.code) //todo vaqtincha
            router.push({name: 'send-code'})
        })

    isLoadingSignIn.value = false
})

const {value: phone_number} = useField('phone_number')

const selectCountry = (value) => {
    selectedCountry.value = value
}

const signUp = handleSubmit(async (form) => {
    form.phone_number = form.phone_number.replace(/[\s()+-]/g, '')
    await userStore.setUserData(form)
    await router.push({name: 'sign-up'})
})

watch(() => phone_number.value, async () => {
    if (selectedCountry.value?.mask.length === phone_number.value.length) {
        isFullNumber.value = true
        isLoading.value = true
        const form = {"phone_number": phone_number.value.replace(/[\s()+-]/g, '')}
        await userStore.hasUser(form)
            .then(res => {
                userFullName.value = `${res.data.name.charAt(0)}.` + ' ' + res.data.surname
            })
            .catch(() => {
                userFullName.value = ''
            })
            .finally(() => {
                isLoading.value = false
            })
    } else {
        isFullNumber.value = false
    }
})
</script>

<style scoped>

</style>