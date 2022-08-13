<template>
  <div v-if="artist">{{ artist }}</div>
</template>

<script>
export default {
  data() {
    return {
      artist: null,
    };
  },
  created() {
    this.getArtist();
  },
  methods: {
    getArtist() {},
  },
};
</script>

<style>
</style>