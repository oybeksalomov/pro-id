<template>
    <div class="auth-card flex flex-col items-center w-full max-w-[530px] p-10">
        <BaseLogo class="w-[177px] h-[50px]"/>
        <hr class="mt-10 w-full">

        <!--Content start-->
        <slot></slot>
        <!--Content end-->

        <div class="text-[15px] mt-5 max-w-[240px]">
            Продолжая использовать PRO ID, я принимаю
            <span class="text-base-color font-semibold">
                <router-link to="#">
                    условия оферты.
                </router-link>
            </span>
        </div>

        <div class="mt-10 opacity-40 flex items-center">
            <div class="text-[15px]">
                Что такое
                <b>PRO ID</b>
            </div>
            <QuestionMarkIcon class="fill-bg-black ml-[5px]"/>
        </div>
    </div>
</template>

<script setup>

import QuestionMarkIcon from "@/icons/QuestionMarkIcon.vue";
import BaseLogo from "@/components/BaseLogo.vue";
</script>

<style scoped>

</style>