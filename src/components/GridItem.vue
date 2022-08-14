<template>
  <div class="base" @click="navigateTo">
    <img :src="this.baseUrl + 'record/image?id=' + this.record._id" alt="Cover" />
    <b>{{ this.record.title }}</b>
    <span>{{ this.record.artist }}</span>
  </div>
</template>

<script>
export default {
  props: {
    record: null
  },
  data() {
    return {
      baseUrl: import.meta.env.VITE_HOST,
    };
  },
  methods: {
    navigateTo() {
      this.$router.push("/records/" + this.record._id);
    },
  },
};
</script>

<style scoped>
.base {
  display: flex;
  flex-direction: column;
  width: 16rem;
  cursor: pointer;
  border: solid thin transparent;
  border-radius: 0.5rem;
  transition-duration: 0.3s;
  padding: 0.5rem;
}

.base:hover {
  background-color: var(--color-background-soft);
  border-color: var(--color-border);
  transition-duration: 0.3s;
}

img {
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  transition-duration: 0.3s;
  max-width: 16rem;
  max-height: auto;
  background-color: gray;
}

span {
  color: var(--mild-color2);
}
</style>