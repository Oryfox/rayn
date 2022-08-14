<template>
  <div class="edit-popup-base" @click="cancelEdit">
    <div class="modal-pane" v-if="record" v-on:click.stop>
      <div class="modalheader">
        <span v-if="
          record.title !== null &&
          record.artist !== null &&
          record.title !== '' &&
          record.artist !== ''
        ">{{ action }}
          <span class="highlighted">{{ this.record.title }}</span> by
          <span class="highlighted">{{ this.record.artist }}</span>
        </span>
        <span v-else>Creating new record</span>
        <SidebarButton style="margin-left:auto" @click="cancel">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </SidebarButton>
      </div>

      <div class="modal-content-pane">
        <div class="property-list">
          <div class="property">
            <label for="title">Album title</label>
            <input type="text" id="title" class="inputfield" v-model="this.record.title" />
          </div>
          <div class="property">
            <label for="title">Artist name</label>
            <input type="text" id="title" class="inputfield" v-model="this.record.artist" />
          </div>
          <div class="property">
            <label for="title">Album release year</label>
            <input type="number" id="title" class="inputfield" v-model="this.record.releaseYear" />
          </div>
          <div class="property">
            <label for="title">Vinyl color</label>
            <input type="text" class="inputfield" id="title" v-model="this.record.color" />
          </div>
          <div class="property">
            <label for="title">Limited</label>
            <!-- <input type="checkbox" class="checkobox" id="title" v-model="this.record.limited" /> -->
            <CustomCheckbox @click="this.record.limited = !this.record.limited" :active="this.record.limited" />
          </div>
          <div class="property">
            <label for="title">Bootleg</label>
            <!-- <input type="checkbox" class="checkobox" id="title" v-model="this.record.bootleg" /> -->
            <CustomCheckbox @click="this.record.bootleg = !this.record.bootleg" :active="this.record.bootleg" />
          </div>
        </div>

        <div class="track-list">
          <div class="track-in-list" v-for="(track, index) in this.record.tracks" :key="track.id">
            <input type="number" v-model="track.rank" class="track-list-rank" @change="orderTracks" />
            <input type="text" v-model="track.title" class="track-list-input" />
            <SidebarButton @click="removeTrack(index)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
              </svg>
            </SidebarButton>
          </div>
          <SidebarButton class="add-track-button" @click="addTrack">
            <h4>Add Track</h4>
          </SidebarButton>
        </div>

        <div class="control-buttons">
          <SidebarButton @click="cancelEdit">
            <h3>Cancel</h3>
          </SidebarButton>
          <SidebarButton @click="saveEdit">
            <h3>Save changes</h3>
          </SidebarButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarButton from "./SidebarButton.vue";
import CustomCheckbox from "./CustomCheckbox.vue";

export default {
  components: {
    SidebarButton,
    CustomCheckbox
  },
  data() {
    return {
      inserted: false,
    };
  },
  props: {
    record: null,
    action: String,
  },
  methods: {
    cancelEdit() {
      this.$emit("cancel");
    },
    saveEdit() {
      this.$emit("save");
    },
    addTrack() {
      if (this.record.tracks)
        this.record.tracks.push({
          title: "",
          rank: this.record.tracks.length + 1,
        });
      else this.record.tracks = [{ title: "", rank: 1 }];
    },
    removeTrack(index) {
      this.record.tracks.splice(index, 1);
    },
    orderTracks(event) {
      event.target.blur();
      this.record.tracks.sort((a, b) => a.rank - b.rank);
    },
  },
};
</script>

<style scoped>
.edit-popup-base {
  background-color: rgba(255, 255, 255, 3%);
  font-size: 16px;
}

.modal-pane {
  width: 80%;
  margin: 2.5rem 0;
  border: solid thin var(--color-border);
  border-radius: 0.5rem;
  background-color: var(--color-background-soft);
  display: flex;
  flex-direction: column;
}

.modal-content-pane {
  padding: 1rem;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.modalheader {
  background-color: var(--color-background);
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  display: flex;
  padding: 0 1rem;
  align-items: center;
  height: 4rem;
  font-size: 24px;
}

.highlighted {
  color: var(--color-heading);
}

.close-modal-button {
  margin-left: auto;
}

.property-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.property {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.property .inputfield {
  margin-left: auto;
  flex-grow: 1;
}

.property label {
  width: 10rem;
  text-align: right;
  padding-right: 0.7rem;
}

.checkobox {
  flex-grow: 0;
}

.track-list {
  display: flex;
  flex-direction: column;
  border: solid thin var(--color-border);
  border-radius: 0.5rem;
  padding: 0.5rem;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-grow: 1;
  overflow-y: scroll;
}

.control-buttons {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  min-height: 3rem !important;
  gap: 1rem;
}

.track-in-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.track-list-input {
  flex-grow: 1;
}

.track-list-remove {
  margin-left: 1rem;
}

.paddingbutton {
  visibility: hidden;
  height: 4rem;
}

.add-track-button {
  margin-left: auto;
}

input[type*="text"] {
  border: solid thin var(--color-border);
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: var(--color-text);
  background-color: var(--color-background);
  caret-color: var(--color-text);
  height: 2rem;
  font-size: 16px;
}

input[type*="text"]:focus {
  outline: none !important;
  border: solid thin var(--color-border);
  background-color: var(--color-background-mute);
  border-radius: 0.5rem;
}

input[type*="number"] {
  border: solid thin var(--color-border);
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: var(--color-text);
  background-color: var(--color-background);
  caret-color: var(--color-text);
  height: 2rem;
  font-size: 16px;
}

input[type*="number"]:focus {
  outline: none !important;
  border: solid thin var(--color-border);
  background-color: var(--color-background-mute);
  border-radius: 0.5rem;
}

.track-list-rank {
  width: 2rem;
  outline: none;
  border: none !important;
  background-color: transparent !important;
}

input[type*="number"]::-webkit-outer-spin-button,
input[type*="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>