<template>
  <div class="base" @click="cancel">
    <div class="modal-pane" v-on:click.stop>
      <div class="modalheader">
        <span v-if="getInput">Enter artist name and album title</span>
        <span v-else>Select filling mode</span>
        <SidebarButton style="margin-left:auto" @click="cancel">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </SidebarButton>
      </div>
      <div class="modal-content-pane">
        <div class="input-holder" v-if="getInput">
          <div class="property">
            <input type="text" id="title" class="inputfield" v-model="this.artist" @keyup.enter="submit"
              @keydown="resetMessage" placeholder="Artist name" />
          </div>
          <div class="property">
            <input type="text" id="title" class="inputfield" v-model="this.title" @keyup.enter="submit"
              @keydown="resetMessage" placeholder="Album title" />
          </div>
          <span class="message" v-if="message">{{ message }}</span>

          <div class="confirm-group">
            <SidebarButton @click="automatic">
              <h3>Cancel</h3>
            </SidebarButton>
            <SidebarButton @click="submit">
              <h3>Submit</h3>
            </SidebarButton>
          </div>
        </div>
        <div class="button-wrapper" v-else>
          <SidebarButton @click="automatic" class="button">
            <h2>Automatic</h2>
          </SidebarButton>
          <SidebarButton @click="manual" class="button">
            <h2>Manual</h2>
          </SidebarButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ES from "../plugins/eventService";
import SidebarButton from "./SidebarButton.vue";

export default {
  props: {
    record: null,
  },
  data() {
    return {
      getInput: false,
      artist: "",
      title: "",
      message: null,
    };
  },
  methods: {
    cancel() {
      this.getInput = false;
      this.artist = "";
      this.title = "";
      this.$emit("cancel");
    },
    automatic() {
      this.getInput = !this.getInput;
    },
    manual() {
      this.$emit("success");
    },
    submit() {
      if (this.artist !== "" && this.title !== "") {
        ES.getAutoRecord(this.artist, this.title).then((res) => {
          if (res.ok) {
            res.json().then((newrec) => {
              this.record.artist = newrec.artist;
              this.record.title = newrec.title;
              this.record.color = newrec.color;
              this.record.bootleg = newrec.bootleg;
              this.record.limited = newrec.limited;
              this.record.releaseYear = newrec.releaseYear;
              this.record.tracks = newrec.tracks;
              this.record.imageType = newrec.imageType;
              this.getInput = false;
              this.artist = "";
              this.title = "";
              this.$emit("success");
            });
          }
          else {
            if (res.status === 404) {
              alert("No album could be found");
            }
            else {
              alert("Whoops.. Something went wrong");
            }
          }
        });
      }
      else {
        this.message = "Artist and Title must contain a value";
      }
    },
    resetMessage() {
      this.message = null;
    },
  },
  components: { SidebarButton }
};
</script>

<style scoped>
.base {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 3%);
}

.modal-pane {
  width: 40%;
  margin: 2.5rem 0;
  border: solid thin var(--color-border);
  border-radius: 1rem;
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

.button-wrapper {
  display: flex;
  width: 100%;
  gap: 1rem;
}

.button {
  height: 2rem;
  flex: 1;
  text-align: center;
  border: solid thin var(--color-border);
  background-color: var(--color-background-soft);
  justify-content: center;
}

.modalheader {
  background: var(--color-background);
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  display: flex;
  padding: 0 1rem;
  align-items: center;
  height: 4rem;
  font-size: 24px;
}

.btn-primary {
  background: var(--bright-color);
  border-color: var(--bright-color);
}

.btn-primary:focus {
  box-shadow: 1px 1px 10px 1px var(--bright-color);
}

.input-holder {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

.confirm-group {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
  height: 3rem;
}

.message {
  color: red;
  font-size: 0.8rem;
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
</style>