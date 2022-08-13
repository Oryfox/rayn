<template>
  <div :class="'self' + (opened ? ' self-opened' : '')" @click="toggle">
    <span>{{ selected.display }}</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up caret"
      viewBox="0 0 16 16" v-if="opened">
      <path
        d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down caret"
      viewBox="0 0 16 16" v-else>
      <path
        d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
    </svg>

    <div class="expand" v-if="opened">
      <div class="element" v-for="option in options" :key="option" @click="select(option)">
        {{ option.display }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selected: null,
    options: null
  },
  data() {
    return {
      opened: false
    }
  },
  methods: {
    toggle() {
      this.opened = !this.opened;
    },
    select(option) {
      this.selected.display = option.display;
      this.selected.type = option.type;
      this.$emit('change');
    }
  }
}
</script>

<style scoped>
.self {
  position: relative;
  width: 9rem;
  height: 2rem;
  border: solid thin var(--color-border);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: var(--color-background);
}

.self span {
  margin-left: 3px;
}

.self-opened {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.element {
  height: 1.5rem;
  padding-left: 4px;
}

.element:hover {
  background: var(--color-background-mute);
}

.element:last-child:hover {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.expand {
  position: absolute;
  left: -1px;
  top: 100%;
  z-index: 5;
  background: var(--color-background-soft);
  width: 9rem;
  border: solid thin var(--color-border);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.caret {
  margin-left: auto;
  padding: 3px;
  width: 1.5rem;
  height: 100%;
}
</style>