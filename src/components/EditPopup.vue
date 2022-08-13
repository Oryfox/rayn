<template>
  <div @click="cancelEdit">
    <div class="modal-pane" v-if="record" v-on:click.stop>
      <div class="modalheader">
        <span
          v-if="
            record.title !== null &&
            record.artist !== null &&
            record.title !== '' &&
            record.artist !== ''
          "
          >{{ action }}
          <span class="highlighted">{{ this.record.title }}</span> by
          <span class="highlighted">{{ this.record.artist }}</span>
        </span>
        <span v-else>Creating new record</span>
        <button class="btn-close close-modal-button" @click="cancelEdit" />
      </div>

      <div class="modal-content-pane">
        <div class="property-list">
          <div class="property">
            <label for="title">Album title</label>
            <input
              type="text"
              id="title"
              class="inputfield"
              v-model="this.record.title"
            />
          </div>
          <div class="property">
            <label for="title">Artist name</label>
            <input
              type="text"
              id="title"
              class="inputfield"
              v-model="this.record.artist"
            />
          </div>
          <div class="property">
            <label for="title">Album release year</label>
            <input
              type="number"
              id="title"
              class="inputfield"
              v-model="this.record.releaseYear"
            />
          </div>
          <div class="property">
            <label for="title">Vinyl color</label>
            <input
              type="text"
              class="inputfield"
              id="title"
              v-model="this.record.color"
            />
          </div>
          <div class="property">
            <label for="title">Limited</label>
            <input
              type="checkbox"
              class="checkobox"
              id="title"
              v-model="this.record.limited"
            />
          </div>
          <div class="property">
            <label for="title">Bootleg</label>
            <input
              type="checkbox"
              class="checkobox"
              id="title"
              v-model="this.record.bootleg"
            />
          </div>
        </div>

        <div class="track-list">
          <div
            class="track-in-list"
            v-for="(track, index) in this.record.tracks"
            :key="track.id"
          >
            <span class="track-list-rank" @click="adjustRank(track)"
              ><b>{{ track.rank }}</b></span
            >
            <input type="text" v-model="track.title" class="track-list-input" />
            <SecondaryButton
              class="track-list-remove"
              @click="removeTrack(index)"
              v-text="'-'"
            />
          </div>
          <PrimaryButton
            class="add-track-button"
            @click="addTrack"
            v-text="'Add Track'"
          />
        </div>

        <button class="btn btn-primary paddingbutton">f</button>
        <div class="control-buttons">
          <SecondaryButton @click="cancelEdit" v-text="'Cancel'" />
          <PrimaryButton @click="saveEdit" v-text="'Save changes'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "./PrimaryButton.vue";
import SecondaryButton from "./SecondaryButton.vue";

export default {
  components: {
    PrimaryButton,
    SecondaryButton,
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
    orderTracks() {
      this.record.tracks.sort((a, b) => a.rank - b.rank);
    },
    adjustRank(track) {
      let answer = prompt("Enter new rank", track.rank);
      if (answer) {
        track.rank = parseInt(answer);
        this.orderTracks();
      }
    },
  },
};
</script>

<style scoped>
.modal-pane {
  width: 80%;
  margin: 2.5rem 0;
  box-shadow: 2px 2px 13px 2px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  background-color: white;
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
  background: #f0f0f0;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  display: flex;
  padding: 0 1rem;
  align-items: center;
  height: 4rem;
  font-size: 24px;
}
.highlighted {
  color: maroon;
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
  border-style: solid;
  border-width: 1px;
  border-radius: 0.5rem;
  border-color: rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-grow: 1;

  overflow-y: scroll;
}
.control-buttons {
  display: flex;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  gap: 1rem;
}
.track-in-list {
  display: flex;
  align-items: center;
}
.track-list-rank {
  width: 2rem;
}
.track-list-input {
  flex-grow: 1;
}
.track-list-remove {
  margin-left: 1rem;
}
.paddingbutton {
  visibility: hidden;
  margin-top: 1rem;
}
.add-track-button {
  margin-left: auto;
}
input[type*="text"] {
  border-radius: 0.5rem;
  border: solid thin rgba(0, 0, 0, 0.2);
  padding: 0.2rem 0.5rem;
  color: rgba(0, 0, 0, 0.7);
  caret-color: rgba(0, 0, 0, 0.4);
}
input[type*="text"]:focus {
  outline: none !important;
  border-radius: 0.5rem;
  border: solid thin rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
}
input[type*="number"] {
  border-radius: 0.5rem;
  border: solid thin rgba(0, 0, 0, 0.2);
  padding: 0.2rem 0.5rem;
  color: rgba(0, 0, 0, 0.7);
  caret-color: rgba(0, 0, 0, 0.4);
}
input[type*="number"]:focus {
  outline: none !important;
  border-radius: 0.5rem;
  border: solid thin rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
}
</style>