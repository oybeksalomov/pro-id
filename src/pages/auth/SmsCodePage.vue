<template>
    <AuthContainer>
        <div class="mt-[30px] w-full">
            <div class="flex flex-col items-center justify-center h-[54px]">
                <div v-if="!isSend && userStore.getUser.phone_number" class="title">
                    Введите код из смс. <br>
                    Мы отправили его на номер
                    <span v-if="userStore.getUser.phone_number">
                        +{{userStore.getUser.phone_number.slice(0, 3)}} ***** {{userStore.getUser.phone_number.slice(-2)}}
                    </span>
                </div>
                <div v-if="!isSend && !userStore.getUser.phone_number" class="title">
                    Xatolik yuz berdi
                </div>
                <div v-if="isMatched && isSend" class="flex items-center justify-center">
                    <SuccessCheckIcon />
                    <div class="text-[17px] ml-[10px] text-base-color font-gt-walsheim-medium">Код введен верно</div>
                </div>
                <div v-if="!isMatched && isSend" class="flex items-center justify-center">
                    <ErrorCheckIcon />
                    <div class="text-[17px] ml-[10px] text-text-red font-gt-walsheim-medium">Код не совпадает</div>
                </div>
        
            </div>

            <form @submit.prevent class="flex flex-col gap-5 mt-5">
                <CodeInput
                    @input-value="inputValue"
                    :code-status="codeStyle"
                />

                <div key="1" v-if="attempts > 0" class="title">
                    Qolgan urinishlar <span>{{ attempts }}</span>
                </div>
            
                <RouterLink
                    v-if="attempts < 0 || !userStore.getUser.phone_number"
                    key="2"
                    :to="{name: 'sign-in'}" 
                    class="w-fit text-base-color hover:underline text-[17px] mx-auto"
                >
                    Telefon raqam qayta kiriting
                </RouterLink>
        
                <!--Sign in-->
                <BaseButton
                    v-if="hasUser"
                    @click="signIn"
                    class="black-bg w-full"
                    :disabled="(isDisable && !isMatched) || isLoading"
                >
                    <LoaderSpinner v-if="isLoading" class="border-white"/>
                    <span v-else>Tasdiqlash</span>
                </BaseButton>

                <!--Sign up-->
                <BaseButton
                    v-else
                    @click="signUp"
                    class="black-bg w-full"
                    :disabled="(isDisable && !isMatched) || isLoading"
                >
                    <LoaderSpinner v-if="isLoading" class="border-white"/>
                    <span v-else>Tasdiqlash</span>
                </BaseButton>
                <BaseButton
                    @click="sendCodeAgain"
                    class="outline-bg w-full"
                    :disabled="!userStore.getUser.phone_number"
                >
                    Отправить код еще раз
                </BaseButton>
            </form>
        </div>
    </AuthContainer>
</template>

<script setup>

import AuthContainer from "@/components/AuthContainer.vue";
import BaseButton from "@/components/BaseButton.vue";
import CodeInput from "@/components/CodeInput.vue";
import SuccessCheckIcon from "@/icons/SuccessCheckIcon.vue";
import ErrorCheckIcon from "@/icons/ErrorCheckIcon.vue";
import {useUserStore} from "@/stores/modules/user.js";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import { string } from "yup";

const userStore = useUserStore()
const isMatched = ref(false)
const isSend = ref(false)
const codeStyle = ref('')
const isDisable = ref(true)
const isLoading = ref(false)
const hasUser = ref(false)
const router = useRouter()
const route = useRoute()
const attempts = ref(0)

const inputValue = (code) => {
    const form = {
        code: code,
        phone_number: userStore.getUser.phone_number,
        hashed_code: userStore.getHashedCode
    }
    if (String(code).length === 6) {
        console.log(form)
        userStore.checkCode(form)
            .then(res => {
                if (res.data.status) {
                    isMatched.value = true
                    codeStyle.value = 'successStyle'
                    isDisable.value = false
                }
            })
            .catch(err => {
                if (!err.response.data.status) {
                    isMatched.value = false
                    codeStyle.value = 'errorStyle'
                    isDisable.value = true
                    attempts.value = err.response.data.attempts ?? -1
                }
            })
            .finally(() => {
                isSend.value = true
            })
    }
}

const signIn = () => {
    if (isMatched.value) {
        const form = {
            phone_number: userStore.getUser.phone_number,
        }
        isLoading.value = true
        userStore.fetchToken(form)
            .then(() => {
                const redirect = route.query.redirect || '/';
                console.log(redirect)
                router.push(redirect);
            })
            .catch(err => err)
            .finally(() => {
                isLoading.value = false
            })
    }
}

const signUp = () => {
    if (isMatched.value) {

        const form = userStore.getUser
        isLoading.value = true
        userStore.register(form)
            .then(() => {
                const redirect = route.query.redirect || '/';
                router.push(redirect);
            })
            .catch(err => err)
            .finally(() => {
                isLoading.value = false
            })
    }
}

const sendCodeAgain = () => {
    const form = {
        phone_number: userStore.getUser.phone_number,
    }
    userStore.sendOTP(form)
    .then((res) => {
        console.log(res.data.code)
    })
}
onMounted(() => {
    if (userStore.getUser.phone_number) {
        const form = {phone_number: userStore.getUser.phone_number}
        userStore.hasUser(form)
            .then((res) => {
                hasUser.value = res.status === 200
            })
            .catch(err => err)
    }
})
</script>

<style scoped>
</style>