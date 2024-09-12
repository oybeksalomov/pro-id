<template>
    <div>
        <input
            class="rounded-[10px] w-full border border-border-gray text-[17px] p-5 text-black inputStyle"
            :class="{'border-text-red': errorMsg}"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >
        <div v-if="errorMsg" class="text-md text-text-red mt-2">{{errorMsg}}</div>
    </div>
</template>

<script setup>
defineProps({
    placeholder: String,
    modelValue: String,
    errorMsg: String
})
</script>

<style scoped>
.inputStyle:not(:placeholder-shown) {
    @apply border-bg-black;
}
</style>