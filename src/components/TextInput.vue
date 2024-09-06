<template>
    <input
        class="rounded-[10px] border border-border-gray text-[17px] p-5 text-black inputStyle"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
</template>

<script setup>
defineProps({
    placeholder: String,
    modelValue: String,
})
</script>

<style scoped>
.inputStyle:not(:placeholder-shown) {
    @apply border-bg-black;
}
</style>