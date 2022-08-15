<template>
    <div class="collection">
        <h1>Settings</h1>
        <div class="option">
            <h3>Cloud synchronization</h3>
            <div class="wait" v-if="isLoggedIn === null">
                Checking login status...
            </div>
            <div class="loggedin" v-else-if="isLoggedIn === true">
                <SidebarButton>
                    <h5>Upload</h5>
                </SidebarButton>
                <SidebarButton>
                    <h5>Clone cloud version</h5>
                </SidebarButton>
                <SidebarButton>
                    <h5>Logout</h5>
                </SidebarButton>
            </div>
            <div class="form" v-else>
                <input type="text" ref="email" placeholder="Email">
                <input type="password" ref="email" placeholder="Password">
                <SidebarButton class="login-button">
                    <h5>Login</h5>
                </SidebarButton>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarButton from "../components/SidebarButton.vue";
export default {
    data() {
        return {
            isLoggedIn: null
        };
    },
    created() {
        if (this.$cookies.get("token")) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    },
    components: { SidebarButton }
}
</script>

<style scoped>
h1 {
    width: 100%;
    margin-bottom: 1rem;
}

.option {
    border: solid thin var(--color-border);
    background-color: var(--color-background);
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 200px;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.login-button {
    display: flex;
    align-items: center;
    justify-content: center;
}

input[type*="text"],
input[type*="password"] {
    border: solid thin var(--color-border);
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    color: var(--color-text);
    background-color: var(--color-background);
    caret-color: var(--color-text);
    height: 2rem;
    font-size: 16px;
}

input[type*="text"]:focus,
input[type*="password"]:focus {
    outline: none !important;
    border: solid thin var(--color-border);
    background-color: var(--color-background-mute);
    border-radius: 0.5rem;
}
</style>