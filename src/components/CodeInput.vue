<template>
    <div class="flex justify-between">
        <input
            v-for="(input, index) in inputs"
            :key="index"
            :id="'input' + index"
            v-model="inputs[index]"
            @input="moveFocus(index)"
            @keydown="handleKeydown(index, $event)"
            placeholder="-"
            class="inputStyle"
            :class="codeStatus"
            maxlength="1"
            type="text"
        />
    </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';

const emits = defineEmits(["inputValue"]);
defineProps({
    codeStatus: {
        type: String,
        default: ''
    }
})
const inputs = ref(Array(6).fill(''));

const moveFocus = (index) => {
    if (inputs.value[index].length === 1 && index < inputs.value.length - 1) {
        const nextInput = index + 1;
        const nextElement = document.querySelector(`#input${nextInput}`);
        if (nextElement) {
            nextElement.focus();
        }
    }
};

const handleKeydown = (index, event) => {
    const key = event.key;

    if (key === 'Backspace' && !inputs.value[index] && index > 0) {
        const prevInput = index - 1;
        const prevElement = document.querySelector(`#input${prevInput}`);
        if (prevElement) {
            prevElement.focus();
        }
    }

    if (key === 'ArrowLeft' && index > 0) {
        const prevElement = document.querySelector(`#input${index - 1}`);
        if (prevElement) {
            prevElement.focus();
        }
    }

    if (key === 'ArrowRight' && index < inputs.value.length - 1) {
        const nextElement = document.querySelector(`#input${index + 1}`);
        if (nextElement) {
            nextElement.focus();
        }
    }
};

onMounted(() => {
    const firstInput = document.getElementById('input0');
    firstInput.focus()
})
watch(() => inputs.value[inputs.value.length - 1], () => {
    let value = inputs.value.join('')
    emits('inputValue', value)
})
</script>

<style scoped>
.inputStyle {
    @apply w-[40px] md:w-[60px] h-[40px] md:h-[60px] rounded-[10px] border border-border-gray md:text-2xl font-gt-walsheim-medium text-center;
}
.inputStyle:not(:placeholder-shown) {
    @apply border-bg-black;
}
.successStyle:not(:placeholder-shown) {
    @apply border-base-color;
}
.errorStyle:not(:placeholder-shown)  {
    @apply border-text-red;
}
</style>