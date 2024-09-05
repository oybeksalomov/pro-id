<template>
    <main class="base-container grid grid-cols-5 gap-5">

        <!--Birinchi ustun-->
        <div class="col-span-1 main-card">
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
        <div class="col-span-3 flex flex-col gap-5">
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
        <div class="main-card col-span-1">
            <div class="flex flex-col items-center pb-10 ">
                <div class="size-[80px] rounded-full flex items-center justify-center bg-base-color">
                    <AccauntIcon class="fill-white size-[30px]"/>
                </div>
                <div class="text-2xl mt-5">Name Surname</div>
            </div>
            <hr>
            <div class="mt-10">
                <ul class="flex flex-col gap-2.5">
                    <li
                        v-for="(item, index) in accauntMenuItems"
                        :key="index"
                    >
                        <router-link to="#" class="flex items-center">
                            <component :is="item.icon" class="fill-bg-black size-6"/>
                            <div class="text-lg ml-[15px]">{{item.name}}</div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <hr>
            <div class="mt-10">
                <ul class="flex flex-col gap-2.5">
                    <li
                        v-for="(item, index) in accauntMenuItems"
                        :key="index"
                    >
                        <router-link to="#" class="flex items-center">
                            <component :is="item.icon" class="fill-bg-black size-6"/>
                            <div class="text-lg ml-[15px]">{{item.name}}</div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<script setup>
import AccauntIcon from "@/icons/AccauntIcon.vue";
import MailIcon from "@/icons/MailIcon.vue";
import {ref} from "vue";
import CloudIcon from "@/icons/CloudIcon.vue";
import SettingIcon from "@/icons/SettingIcon.vue";

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
</script>

<style scoped>

</style>