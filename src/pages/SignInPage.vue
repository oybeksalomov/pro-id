<template>
    <AuthContainer>
        <div class="mt-[30px] w-full">
            <div class="text-[17px] text-center opacity-40">
                <b>
                    PRO ID
                </b>—<br>
                ключ от всех сервисов.
            </div>
            <form @submit.prevent class="flex flex-col gap-5 mt-5">
                <PhoneInput />
                <BaseButton class="black-bg w-full">Kirish</BaseButton>
                <BaseButton class="outline-bg w-full">Восстановить PRO ID</BaseButton>
            </form>
        </div>
    </AuthContainer>
</template>

<script setup>

import BaseLogo from "@/components/BaseLogo.vue";
import QuestionMarkIcon from "@/icons/QuestionMarkIcon.vue";
import AuthContainer from "@/components/AuthContainer.vue";
import BaseButton from "@/components/BaseButton.vue";
import PhoneInput from "@/components/PhoneInput.vue";
</script>

<style scoped>

</style>