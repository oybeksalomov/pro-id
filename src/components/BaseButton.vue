<template>
    <button class="py-5 px-10 rounded-[10px] font-gt-walsheim-medium baseBtn border border-white transition-all active:opacity-60">
        <slot></slot>
    </button>
</template>

<script setup>

</script>

<style scoped>
.black-bg {
    background-color: var(--bg-black);
    color: var(--base-white);
}
.outline-bg {
    background-color: var(--base-white);
    border-color: var(--border-gray);
    color: var(--border-gray);
}
.baseBtn:hover {
    background-color: var(--base-color);
    color: var(--base-white);
    border-color: var(--base-color);
}
</style>