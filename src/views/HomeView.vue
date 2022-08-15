<template>
  <div class="home-vertical">
    <div class="header-horizontal">
      <img src="/icon.png" alt="Icon" />
      <div class="vertical">
        <h1>Rayn</h1>
        <h4>
          Keep track of your vinyl records.
        </h4>
      </div>
    </div>
    <div class="button-wrapper">
      <SidebarButton class="button" @click="this.$router.push('/records')">
        <div class="button-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" />
          </svg>
          <h2>Records</h2>
        </div>
      </SidebarButton>
      <SidebarButton class="button" @click="this.$router.push('/artists')">
        <div class="button-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          <h2>Artists</h2>
        </div>
      </SidebarButton>
      <SidebarButton class="button" @click="this.$router.push('/records/' + this.record._id)">
        <div class="button-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" class="bi bi-shuffle"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z" />
            <path
              d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
          </svg>
          <h2>Shuffle</h2>
        </div>
      </SidebarButton>
      <SidebarButton class="button" @click="this.$router.push('/settings')">
        <div class="button-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
          </svg>
          <h2>Settings</h2>
        </div>
      </SidebarButton>
      <SidebarButton class="button" @click="github">
        <div class="button-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <h2>Github</h2>
        </div>
      </SidebarButton>
    </div>
  </div>
</template>

<script>
import SidebarButton from "../components/SidebarButton.vue";
import ES from '../plugins/eventService';
import GridItem from "../components/GridItem.vue";
export default {
  components: {
    SidebarButton,
    GridItem
  },
  data() {
    return {
      record: null
    }
  },
  created() {
    this.randomRecord();
  },
  methods: {
    async randomRecord() {
      ES.getRecords()
        .then(res => res.json())
        .then(data => {
          this.record = data[Math.floor(Math.random() * data.length)];
        })
    },
    github() {
      electronAPI.github();
    }
  }
}
</script>

<style scoped>
.home-vertical {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 0.5rem);
  gap: 3.5rem;
}

.vertical {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

h1 {
  font-size: 64px;
}

svg {
  padding: 1rem;
}

img {
  max-width: 20rem;
  max-height: auto;
}

.header-horizontal {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  position: relative;
  width: 100%;
}

.button {
  border: solid thin var(--color-border);
}

.button-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.button-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}
</style>
