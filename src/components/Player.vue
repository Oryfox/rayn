<template>
  <div
    :class="'base' + (hidden ? ' base-hidden' : '')"
    ref="base"
    v-if="videoId"
  >
    <div class="title-wrapper">
      <h4 class="title underline" @click="goToRecord">{{ videoTitle }}</h4>
    </div>
    <div class="horizontal">
      <div class="fold-button" @click="toggleVisibilty">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-chevron-bar-right"
          viewBox="0 0 16 16"
          v-if="!hidden"
        >
          <path
            fill-rule="evenodd"
            d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-chevron-bar-left"
          viewBox="0 0 16 16"
          v-else
        >
          <path
            fill-rule="evenodd"
            d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"
          />
        </svg>
      </div>
      <iframe
        v-if="videoId"
        :src="
          'https://www.youtube-nocookie.com/embed/' +
          videoId +
          '?listType=playlist'
        "
        :title="videoTitle"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="fgrow"
        :key="videoId"
        @load="this.hidden = false"
      ></iframe>
    </div>
  </div>
</template>

<script>
import emitter from "tiny-emitter/instance";
export default {
  data() {
    return {
      videoId: null,
      videoTitle: null,
      hidden: true,
      recordId: null,
    };
  },
  created() {
    emitter.on("play", (id, title, record) => {
      if (this.videoId === null) {
        this.hidden = true;
      }
      this.videoId = id;
      this.videoTitle = title;
      this.recordId = record;
    });
  },
  methods: {
    toggleVisibilty() {
      this.hidden = !this.hidden;
    },
    goToRecord() {
      this.$router.push("/records/" + this.recordId);
    },
  },
};
</script>

<style scoped>
.base {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 4;
  top: 4.5rem;
  right: 8px;
  width: 424px;
  height: 318px;
  text-align: center;
  transition-duration: 300ms;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.4);
}
.base-hidden {
  right: -368px;
  transition-duration: 300ms;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}
.title-wrapper {
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.title {
  opacity: 1;
  transition: opacity 300ms;
}
.base-hidden .title {
  opacity: 0;
  transition: opacity 300ms;
}
.fgrow {
  flex-grow: 1;
  border-radius: 0.5rem;
  /* box-shadow: 1px 1px 8px 5px rgba(0, 0, 0, 0.4); */
}
.horizontal {
  display: flex;
  height: 100%;
  gap: 0.5rem;
}
.fold-button {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  border-radius: 0.5rem;
  transition-duration: 0.3s;
  cursor: pointer;
}
.fold-button:hover {
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
  background: white;
  transition-duration: 0.3s;
}

.underline:hover::after,
.underline:focus::after {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
.underline {
  transition-duration: 0.5s;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  display: block;
  align-self: flex-start;
}
.underline:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.1em;
  background-color: var(--primary-color);
  opacity: 0;
  transition: opacity 300ms, transform 300ms;
  transform: translate3d(-100%, 0, 0);
}
</style>