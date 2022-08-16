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
                <SidebarButton @click="importRecords">
                    <h5>Import</h5>
                </SidebarButton>
                <SidebarButton @click="logout">
                    <h5>Logout</h5>
                </SidebarButton>
            </div>
            <div class="form" v-else>
                <input type="text" ref="email" placeholder="Email">
                <input type="password" ref="password" placeholder="Password">
                <SidebarButton class="login-button" @click="login">
                    <h5>Login</h5>
                </SidebarButton>
            </div>
        </div>
        <div class="option">
            <h3>Reset options</h3>
            <SidebarButton @click="resetDatabase">
                <h5>Reset database</h5>
            </SidebarButton>
        </div>
        <SidebarButton @click="toggleDevTools">
            Toggle dev tools
        </SidebarButton>
    </div>
</template>

<script>
import ES from '../plugins/eventService'
import SidebarButton from "../components/SidebarButton.vue";
export default {
    data() {
        return {
            isLoggedIn: null,
            token: null
        };
    },
    created() {
        electronAPI.getToken()
            .then(token => {
                if (token) {
                    this.isLoggedIn = true;
                    this.token = token;
                } else {
                    this.isLoggedIn = false;
                }
            });
    },
    methods: {
        login() {
            fetch('https://vinyl.oryfox.de/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.$refs.email.value,
                    password: this.$refs.password.value
                })
            })
                .then(response => {
                    if (response.ok) {
                        return response.text()
                    } else {
                        throw new Error('Login failed');
                    }
                })
                .then(data => {
                    electronAPI.setToken(data);
                    this.token = data;
                    this.isLoggedIn = true;
                });
        },
        logout() {
            let token = this.$cookies.get("token")
            fetch('https://vinyl.oryfox.de/api/user/logout', {
                method: 'PUT',
                headers: {
                    'token': token
                }
            })
            electronAPI.deleteToken();
            this.isLoggedIn = false;
            this.token = null;
        },
        toggleDevTools() {
            electronAPI.devtools();
        },
        importRecords() {
            fetch('https://vinyl.oryfox.de/api/record', {
                headers: {
                    'token': this.token
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        if (response.status === 401) {
                            this.isLoggedIn = false;
                            this.token = null;
                        }
                        throw new Error('Import failed');
                    }
                })
                .then(data => {
                    this.syncImport(data);
                });

        },
        syncImport(data) {
            data.forEach(r => r.created = r.id);
            data.forEach(async record => {
                await ES.postRecord(record);
            })
            alert("Import successful");
        },
        resetDatabase() {
            electronAPI.resetDatabase();
        }
    },
    components: { SidebarButton }
}
</script>

<style scoped>
.collection {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

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