<script setup>
import { RouterLink } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import Player from "./components/Player.vue";
</script>

<template>
  <div id="content">
    <Sidebar id="sidebar" />
    <router-view id="router" v-slot="{ Component }">
      <transition name=" fade" mode="out-in">
        <component :is="Component" ref="current"> </component>
      </transition>
    </router-view>
  </div>
  <Player />
</template>

<style scoped>
#sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
}

#router {
  margin-left: 5rem;
  padding: 0.5rem 0.5rem 0 0.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
