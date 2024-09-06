<template>
    <AuthContainer>
        <div class="mt-[30px] w-full">
                        <div class="title">Введите данные</div>
            <form @submit.prevent class="flex flex-col gap-5 mt-5">
                <TextInput placeholder="Ism"/>
                <TextInput placeholder="Familiya"/>
                <BaseButton class="black-bg w-full">Продолжить</BaseButton>
            </form>
        </div>
    </AuthContainer>
</template>

<script setup>

import PhoneInput from "@/components/PhoneInput.vue";
import AuthContainer from "@/components/AuthContainer.vue";
import BaseButton from "@/components/BaseButton.vue";
import TextInput from "@/components/TextInput.vue";
</script>

<style scoped>

</style>