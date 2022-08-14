<template>
    <SidebarButton class="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"
            v-if="!active">
            <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" v-else>
            <path
                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
    </SidebarButton>
</template>

<script>
import SidebarButton from "./SidebarButton.vue";
export default {
    components: {
        SidebarButton,
    },
    props: {
        active: {
            type: Boolean,
            default: false,
        },
    }
}
</script>

<style scoped>
.button {
    background: transparent !important;
    padding: 0.3rem !important;
    border: solid thin var(--color-border);
}

.button:hover {
    background: var(--color-background-mute) !important;
}
</style>