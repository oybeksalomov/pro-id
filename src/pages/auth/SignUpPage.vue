<template>
    <AuthContainer>
        <div class="mt-[30px] w-full">
            <div class="title">Введите данные</div>
            <form @submit.prevent class="flex flex-col gap-5 mt-5">
                <TextInput
                    v-model="name"
                    placeholder="Ism"
                    :error-msg="errors.name"
                />
                <TextInput
                    v-model="surname"
                    placeholder="Familiya"
                    :error-msg="errors.surname"
                />
                <BaseButton
                    @click="check"
                    :disabled="isDisabled"
                    type="button"
                    class="black-bg w-full"
                >
                    <span v-if="!isLoading">Продолжить</span>
                    <LoaderSpinner v-else/>
                </BaseButton>
            </form>
        </div>
    </AuthContainer>
</template>

<script setup>

import AuthContainer from "@/components/AuthContainer.vue";
import BaseButton from "@/components/BaseButton.vue";
import TextInput from "@/components/TextInput.vue";
import {useField, useForm} from "vee-validate";
import {object, string} from "yup"
import {ref, watch} from "vue";
import LoaderSpinner from "@/components/LoaderSpinner.vue";
import {useUserStore} from "@/stores/modules/user.js";
import {useRouter} from "vue-router";

const userStore = useUserStore()
const isDisabled = ref(true)
const isLoading = ref(false)
const router = useRouter()

const validationSchema = object({
    name: string().required("Name is required"),
    surname: string().required("Surname is required"),
})

const {handleSubmit, errors, meta} = useForm({
    validationSchema,
    initialValues: {
        name: "",
        surname: "",
    }
})

const check = handleSubmit(async (form) => {
    form.phone_number = userStore.getUser.phone_number;
    await userStore.sendOTP(userStore.getUser)
        .then((res) => {
            console.log(res.data.code) // todo vaqtincha
        })
    await userStore.setUserData(form)
    await router.push({name: 'send-code'})
})
watch(() => meta.value.valid, (newValue) => {
    isDisabled.value = !newValue
})

const {value: name} = useField('name')
const {value: surname} = useField('surname')
</script>

<style scoped>

</style>