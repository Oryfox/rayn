<template>
    <div class="button-base">
        <slot></slot>
    </div>
</template>

<script>
</script>

<style scoped>
.button-base {
    border-radius: 0.5rem;
    transition-duration: 0.3s;
    padding: 0.4rem;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.button-base:hover {
    background: var(--color-background-mute);
    transition-duration: 0.3s;
}
</style>