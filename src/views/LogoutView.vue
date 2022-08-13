<template>
  <div>Logging out</div>
</template>

<script>
import ES from "../plugins/eventService";
import emitter from "tiny-emitter/instance";
export default {
  created() {
    emitter.emit("play", null, null, null);
    ES.logout()
      .then((res) => {
        this.$cookies.remove("token");
        emitter.emit("tokenRemove");
        this.$router.push("/");
      })
      .catch((error) => {
        this.$cookies.remove("token");
        emitter.emit("tokenRemove");
        this.$router.push("/");
      });
  },
};
</script>

<style>
</style>