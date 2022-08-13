<template>
  <div class="base">
    <div class="image-wrapper">
      <img :src="baseUrl + 'artist/' + artist + '/image'" alt="Artist Image" />
    </div>
    <b :class="'underline ' + (selected ? 'underlinenow' : '')">{{ artist }}</b>
  </div>
</template>

<script>
export default {
  props: {
    artist: {
      type: String,
      default: null,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  data() {
    return {
      baseUrl: import.meta.env.VITE_HOST,
    };
  },
};
</script>

<style scoped>
.base {
  display: flex;
  align-items: center;
  height: 8rem;
  gap: 1rem;
  padding: 0.5rem;
  cursor: pointer;
}
.image-wrapper {
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  width: 7rem;
  height: 100%;
  display: flex;
  justify-content: center;
  box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, 0.3);
  transform: scale(0.9, 0.9);
  transition: transform 500ms;
}
img {
  height: 100%;
  width: auto;
  margin: 0 auto;
  display: inline;
}
b {
  transition-duration: 0.3s;
}
.base:hover b {
  transform: translateX(20px);
  transition-duration: 0.5s;
}
.base:hover .image-wrapper {
  transform: scale(1, 1);
  transition: transform 500ms;
}
.underline {
  transition-duration: 0.5s;
  cursor: pointer;
  overflow: hidden;
  position: relative;
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
.underlinenow::after {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
</style>