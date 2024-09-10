<template>
    <div class="relative">
        <div class="flex">
            <button
                @click.stop.prevent="() => isOpenSelect = !isOpenSelect"
                class="text-xl size-[60px] bg-base-bg rounded-l-[10px] flex-none flex items-center justify-center border border-r-0 border-border-gray"
            >
                {{selectedCountry?.flag ?? '🌍'}}
            </button>
            <input
                ref="phoneInput"
                v-maska="selectMask"
                class="h-[60px] w-full text-[17px] px-5 border border-border-gray rounded-r-[10px]"
                :value="modelValue"
                @input="inputEvent"
            >
        </div>

        <transition name="select">
            <div
                v-if="isOpenSelect"
                v-on-click-outside.bubble="closeSelectModal"
                class="absolute z-10 h-fit max-h-[380px] overflow-y-auto bg-white border top-[70px] w-full p-5 rounded-[10px] border-border-gray"
            >
                <ul>
                    <li
                        v-for="(country, index) in countryStore.getActiveCountries"
                        :key="index"
                        class="flex items-center h-10 text-[17px] hover:bg-base-bg -mx-4 px-4 rounded-[10px] cursor-pointer"
                        :class="{'bg-base-bg': selectedCountry?.name === country?.name}"
                        @click="selectCountry(index)"
                    >
                        <div class="text-xl">{{country.flag}}</div>
                        <div class="ml-[15px]">{{country.name}}</div>
                        <div class="ml-auto text-border-gray">{{country.code}}</div>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import {vOnClickOutside} from "@vueuse/components";
import {vMaska} from "maska/vue";
import {useCountryStore} from "@/stores/modules/country.js";

const emits = defineEmits(['update:modelValue', 'selectedCountry'])
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    }
})
const countryStore = useCountryStore()
const selectedCountry = ref(null)
const phoneInput = ref(null)
const isOpenSelect = ref(false)
const phoneNumber = ref('')

const selectMask = computed(() => {
    return selectedCountry.value ? selectedCountry.value.mask : '+###########'
})

const closeSelectModal = () => {
    isOpenSelect.value = false
}

const inputEvent = (event) => {
    selectedCountry.value = countryStore.getActiveCountries.find(country => country.code === event.target.value.toString().substring(0, country.code.length));
    phoneNumber.value = event.target.value.toString();
    emits('update:modelValue', event.target.value)
    emits('selectedCountry', selectedCountry.value)
}

const selectCountry = (index) => {
    selectedCountry.value = countryStore.getActiveCountries[index];
    phoneNumber.value = selectedCountry.value.code.toString()
    phoneInput.value.focus()
    emits('update:modelValue', selectedCountry.value.code)
    emits('selectedCountry', selectedCountry.value)
    closeSelectModal()
}
onMounted(async () => {
    await countryStore.fetchCountries()
    selectCountry(1) // ip manziliga qarab davlat default tanlash
})

watch(() => props.modelValue, () => {
    phoneNumber.value = props.modelValue
})
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
    transition: opacity 0.2s ease;
}

.select-enter-from,
.select-leave-to {
    opacity: 0;
}
</style>