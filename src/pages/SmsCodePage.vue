<template>
    <AuthContainer>
        <div class="mt-[30px] w-full">
            <div class="title">Введите код из смс.</div>
            <div class="title">Мы отправили его на номер +998 90 *** ** 43</div>
<!--            <div class="flex items-center justify-center">-->
<!--                <SuccessCheckIcon />-->
<!--                <div class="text-[17px] ml-[10px] text-base-color font-gt-walsheim-medium">Код введен верно</div>-->
<!--            </div>-->
<!--            <div class="flex items-center justify-center">-->
<!--                <ErrorCheckIcon />-->
<!--                <div class="text-[17px] ml-[10px] text-text-red font-gt-walsheim-medium">Код не совпадает</div>-->
<!--            </div>-->
            <form @submit.prevent class="flex flex-col gap-5 mt-5">
                <CodeInput />
                <BaseButton class="black-bg w-full">Продолжить</BaseButton>
                <BaseButton class="outline-bg w-full">Отправить код еще раз</BaseButton>
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
</script>

<style scoped>

</style>