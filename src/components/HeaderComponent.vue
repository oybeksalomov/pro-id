<template>
    <header class="base-container py-[25px]">
        <div class="flex items-center">
            <router-link to="/">
                <BaseLogo class="w-[155px] h-[50px] mr-2.5"/>
            </router-link>
            <button class="ml-auto">
                <HeaderIconCard>
                    <MenuIcon class="fill-white size-7"/>
                </HeaderIconCard>
            </button>
            <button @click="headerStore.toggleProfile" class="ml-2.5">
                <HeaderIconCard :class="{'bg-opacity-60': !headerStore.isOpenProfile}">
                    <AccauntIcon class="fill-white size-7"/>
                </HeaderIconCard>
            </button>
        </div>
    </header>
</template>

<script setup>

import BaseLogo from "@/components/BaseLogo.vue";
import HeaderIconCard from "@/components/HeaderIconCard.vue";
import MenuIcon from "@/icons/MenuIcon.vue";
import AccauntIcon from "@/icons/AccauntIcon.vue";
import {useHeaderStore} from "@/stores/header.js";

const headerStore = useHeaderStore()
</script>

<style scoped>

</style>