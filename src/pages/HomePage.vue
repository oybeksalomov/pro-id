<template>
    <HeaderComponent />
    <main class="base-container pb-10 grid grid-cols-5 gap-5">

        <!--Birinchi ustun-->
        <div class="col-span-1 max-2xl:col-span-3 max-2xl:order-1 max-sm:col-span-5 max-sm:order-2 main-card">
            <ul>
                <li
                    v-for="(item, index) in menuItems"
                    :key="index"
                >
                    <button
                        :class="[{'bg-base-color text-white': index === 0}, {'hover:bg-base-color hover:bg-opacity-40 hover:text-white': index !== 0},'p-5 rounded-[10px] w-full text-start text-lg whitespace-nowrap overflow-hidden transition-all']"
                    >
                        {{item.name}}
                    </button>
                </li>
            </ul>
        </div> 

        <!--Ikkinchi ustun-->
        <div class="col-span-3 max-2xl:col-span-5 max-2xl:order-3 max-sm:col-span-5 flex flex-col gap-5">
            <div class="main-card">
                <div class="text-2xl">Ma'lumotlar</div>
                <div class="grid grid-cols-2 gap-5 mt-5">
                    <div class="data-container">
                        Men haqimda
                    </div>
                    <div class="data-container">
                        Manzil
                    </div>
                </div>
            </div>

            <div class="main-card">
                <div class="text-2xl">Pro Pay</div>
                <div class="grid grid-cols-3 gap-5 mt-5">
                    <div class="data-container">
                        Kartalar
                    </div>
                    <div class="data-container">
                        To'lovlar tarixi
                    </div>
                    <div class="data-container">
                        Keshbek
                    </div>
                </div>
            </div>

            <div class="main-card">
                <div class="text-2xl">Xavfsizlik</div>
                <div class="grid grid-cols-2 gap-5 mt-5">
                    <div class="data-container">
                        Akkaunt aktivligi
                    </div>
                    <div class="data-container">
                        Ruxsatlar
                    </div>
                    <div class="data-container">
                        Способы входа
                    </div>
                    <div class="data-container">
                        Средства восстановления
                    </div>
                </div>
            </div>

            <div class="main-card">
                <div class="text-2xl">Pro Business</div>
                <div class="grid grid-cols-1 gap-5 mt-5">
                    <div class="data-container">
                        Mening biznesim
                    </div>
                </div>
            </div>

            <div class="main-card">
                <div class="text-2xl">Obunalar</div>
                <div class="grid grid-cols-1 gap-5 mt-5">
                    <div class="data-container">
                        Mening obunalarim
                    </div>
                </div>
            </div>

        </div>

        <!--Uchinchi ustun-->
        <div class="rounded-[20px] overflow-y-hidden col-span-1 max-2xl:col-span-2 max-2xl:col-start-4 max-sm:col-span-5 max-2xl:order-2 max-sm:order-1">
            <!--Profil-->
            <transition name="row">
                <div v-if="isOpenProfile" class="main-card">
                    <div class="flex flex-col items-center ">
                        <div class="size-[80px] rounded-full flex items-center justify-center bg-base-color">
                            <AccauntIcon class="fill-white size-[30px]"/>
                        </div>
                        <div class="text-2xl mt-5">{{userStore.getUser.name}} {{userStore.getUser.surname}}</div>
                    </div>
                    <hr class="my-10">
                    <BaseButton class="black-bg mb-10 w-full">Добавить аккаунт</BaseButton>
                    <div>
                        <ul class="flex flex-col">
                            <li
                                v-for="(item, index) in accauntMenuItems"
                                :key="index"
                                class="listItem"
                            >
                                <router-link to="#" class="flex items-center">
                                    <component :is="item.icon" class="fill-bg-black size-6"/>
                                    <div class="text-lg ml-[15px]">{{item.name}}</div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <hr class="my-5">
                    <div>
                        <ul class="flex flex-col">
                            <li
                                v-for="(item, index) in accauntMenuItems"
                                :key="index"
                                class="listItem"
                            >
                                <router-link to="#" class="flex items-center">
                                    <component :is="item.icon" class="fill-bg-black size-6"/>
                                    <div class="text-lg ml-[15px]">{{item.name}}</div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <hr class="my-5">
                    <button @click="logoutAction" class="text-text-red flex items-center w-full hover:bg-red-50 py-[5px] -mx-3 px-3 rounded-lg transition-all active:bg-red-100">
                        <ExitIcon class="fill-text-red"/>
                        <span class="text-lg ml-[15px]">Chiqish</span>
                    </button>

                    <div class="text-[12px] text-border-gray mt-[100px]">
                        Пользовательское соглашение Политика конфиденциальности
                    </div>
                </div>
            </transition>

            <!--Servislar-->
            <transition name="row">
                <div v-if="isOpenServices" class="main-card">
                    <div class="text-2xl mt-5 flex justify-center">
                        <b class="mr-2">Pro </b> Сервисы
                    </div>
                    <hr class="my-10">

                    <div>
                        <button >
                            <img src="">
                        </button>
                    </div>
                </div>
            </transition>
        </div>
    </main>
</template>

<script setup>
import AccauntIcon from "@/icons/AccauntIcon.vue";
import MailIcon from "@/icons/MailIcon.vue";
import CloudIcon from "@/icons/CloudIcon.vue";
import SettingIcon from "@/icons/SettingIcon.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import BaseButton from "@/components/BaseButton.vue";
import ExitIcon from "@/icons/ExitIcon.vue";
import {useHeaderStore} from "@/stores/header.js";
import {nextTick, onMounted, toRefs} from "vue";
import { useUserStore } from "@/stores/modules/user";
import {useRouter} from "vue-router";

const {isOpenProfile, isOpenServices} = toRefs(useHeaderStore())
const userStore = useUserStore()
const router = useRouter()

const menuItems = [
    {name: "Asosiy"},
    {name: "Ma'lumotlar"},
    {name: "Pro Pay"},
    {name: "Pro Business"},
    {name: "Xavfsizlik"},
    {name: "Obunalar"},
    {name: "Qo'llab quvvatlash"},
    {name: "Spravka"},
]

const accauntMenuItems = [
    {name: "Pochta", icon: MailIcon},
    {name: "Disk", icon: CloudIcon},
    {name: "Akkaunt boshqaruvi", icon: SettingIcon},

]



const logoutAction = async () => {
    // await userStore.removeToken()
    await userStore.clearToken()
    await router.push({name: 'sign-in'});
}

onMounted(() => {
    userStore.fetchUser()
})
</script>

<style scoped>
.listItem {
    @apply py-[5px] hover:bg-base-bg -mx-3 px-3 rounded-lg transition-all active:bg-gray-200
}
.row-enter-active, .row-leave-active {
    transition: all 0.3s ease;
}

.row-enter-from {
    transform: translateY(-100%);
}

.row-enter-to {
    transform: translateY(0);
}

.row-leave-from {
    transform: translateY(0);
}

.row-leave-to {
    transform: translateY(-100%);
}
</style>