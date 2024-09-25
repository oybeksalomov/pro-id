<template>
    <div class="authContainer">
        <AuthContainer>
            <div v-if="oauthStore.getClient?.name" class="text-3xl font-gt-walsheim-medium mt-10">{{ oauthStore.getClient.name }}</div>
            <div class="title">Выберите аккаунт Pro ID:</div>

            <div @click="authorizeClient" v-if="!isLoading && !isAuthorized" class="w-full flex flex-col mt-5">
                <div class="border-b py-2.5 flex cursor-pointer hover:bg-gray-50">
                    <img v-if="userStore.getUser.avatar" src="#" alt="avatar photo" class="size-[60px] rounded-full object-cover object-center">
                    <div v-else class="size-[60px] rounded-full bg-gray-300"></div>
                    <div class="ml-5 flex flex-col justify-center items-start">
                        <div class="text-lg font-gt-walsheim-medium">{{ userStore.getUser.name }} {{ userStore.getUser.surname }}</div>
                        <div class="opacity-40">+{{ userStore.getUser.phone_number }}</div>
                    </div>
                </div>
                <div class="flex items-center py-2.5 cursor-pointer hover:bg-gray-50">
                    <div class="size-[60px] rounded-full bg-bg-black flex items-center justify-center">
                        <PlusIcon class="size-[18px]" />
                    </div>
                    <div class="text-lg ml-5 text-bg-black font-gt-walsheim-medium">Добавить аккаунт</div>
                </div>
            </div>

            <div v-if="isAuthorized" class="flex flex-col justify-center items-center">
                <SuccessCheckOutlineIcon class="size-[43px] rounded-full mt-5"/>
                <div class="text-[17px] mt-5 font-gt-walsheim-bold">Alex Martin</div>
                <div>Вы успешно вошли в систему</div>
                <div class="text-[13px] mt-6 text-center">Через {{ countNumber }} секунд вы <br> вернетесь на сайт GoodLook.</div>
                <button @click="redirect" class="text-[17px] mt-6 hover:underline text-base-color">Перейти на сайт Good Look</button>
            </div>
      
        </AuthContainer>
    </div>
</template>

<script setup>
import AuthContainer from '@/components/AuthContainer.vue';
import PlusIcon from '@/icons/PlusIcon.vue';
import SuccessCheckOutlineIcon from '@/icons/SuccessCheckOutlineIcon.vue';
import { onMounted, ref, watch } from 'vue';
import { useOauthStore } from '../stores/modules/oauth';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/modules/user';

const oauthStore = useOauthStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const isLoading = ref(false)
const params = ref({
    client_id: route.query.client_id,
    redirect_uri: route.query.redirect_uri,
    scope: route.query.scope,
    state: route.query.state,
    user_id: ''
})
const redirectUrl = ref('')
const isAuthorized = ref(false)
const countNumber = ref(5)

const authorizeClient = async () => {
    params.value.user_id = await userStore.getUser.id
    await oauthStore.authorizeClient(params.value)
        .then(res => {
            redirectUrl.value = res.data.redirect_uri
            isAuthorized.value = true
        })
}

const redirect = () => {
    if (redirectUrl.value) {
        window.location.href = redirectUrl.value
    }
}

const countReverse = () => {
    const number = countNumber.value
    let interval = setInterval(() => {
        countNumber.value--
        if(countNumber.value === 0) {
            window.location.href = redirectUrl.value
            clearInterval(interval)
        }
    }, 1000)

}

onMounted( async() => {
    isLoading.value = true
    await oauthStore.fetchClients(route.query.client_id)
    await userStore.fetchUser()
    isLoading.value = false
})

watch(() => isAuthorized.value, () => {
    if(isAuthorized.value) {
        countReverse()
    }
})
</script>

<style scoped>

</style>