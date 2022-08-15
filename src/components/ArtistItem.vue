<template>
  <div class="base">
    <div class="image-wrapper">
      <img :src="baseUrl + 'artist/' + artist + '/image'" alt="Artist Image" @contextmenu="resetImage"
        ref="artistImage" />
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
  methods: {
    resetImage() {
      fetch(this.baseUrl + 'artist/' + this.artist + '/image', {
        method: 'DELETE',
      }).then(() => {
        this.$refs.artistImage.src = this.baseUrl + 'artist/' + this.artist + '/image?t=' + Date.now();
      });
    },
  },
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
  border-radius: 0.5rem;
  transition-duration: 0.3s;
}

.base:hover {
  background-color: var(--color-background-mute);
  transition-duration: 0.3s;
}

.image-wrapper {
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  display: flex;
  height: 8rem;
  width: 8rem;
  justify-content: center;
  background-color: var(--color-background);
  transform: scale(0.9, 0.9);
  transition: transform 500ms;
}

img {
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
  cursor: pointer;
  position: relative;
}

.underline:after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--color-text);
  opacity: 0;
  transition-duration: 300ms;
}

.underlinenow::after {
  width: 106%;
  left: -3%;
  opacity: 1;
  transition-duration: 300ms;
}
</style>