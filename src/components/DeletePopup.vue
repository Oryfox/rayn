<template>
  <div @click="cancel">
    <div class="background" v-on:click.stop>
      <div class="btn-holder">
        <SecondaryButton @click="cancel" v-text="'Cancel'" />
        <PrimaryButton @click="confirm" v-text="'Confirm deletion'"/>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "./PrimaryButton.vue"
import SecondaryButton from "./SecondaryButton.vue";
export default {
  components: {
    PrimaryButton,
    SecondaryButton
  },
  methods: {
      cancel() {
          this.$emit('cancel')
      },
      confirm() {
          this.$emit('confirm')
      }
  }
}
</script>

<style scoped>
.background {
  background: white;
  padding: 1rem;
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  box-shadow: 2px 2px 13px 2px rgba(0, 0, 0, 0.2);
}
.btn-holder {
  display: flex;
  gap: 1rem;
}
</style>