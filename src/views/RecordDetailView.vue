<template>
  <div class="stack">
    <div class="top-bar">
      <SidebarButton @click="this.$router.go(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
        </svg>
      </SidebarButton>
      <SidebarButton style="margin-left:auto" @click="toggleEditModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
        </svg>
      </SidebarButton>
      <SidebarButton class="trash-button" @click="toggleDeleteModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
        </svg>
      </SidebarButton>
    </div>
    <div class="base" v-if="record">
      <div class="left-split">
        <div class="image">
          <img :src="this.baseUrl + 'record/image?id=' + this.record._id" alt="" class="background coverimage"
            id="background" @load="applyBlur" />
          <img :src="this.baseUrl + 'record/image?id=' + this.record._id" alt="" :class="
            'foreground coverimage' +
            (record.imageType === 'DEFAULT' ? ' noborder' : '')
          " id="foreground" @load="applyBorder" @contextmenu="toggleContextMenu" />
        </div>

        <div>
          <table class="infopanel">
            <tr v-if="this.record.releaseYear">
              <td>Release year:</td>
              <td>{{ this.record.releaseYear }}</td>
            </tr>
            <tr>
              <td>Vinyl color:</td>
              <td v-if="this.record.color">{{ this.record.color }}</td>
              <td v-else>Black</td>
            </tr>
            <tr>
              <td>Limited:</td>
              <td v-if="this.record.limited">Yes</td>
              <td v-else>No</td>
            </tr>
            <tr>
              <td>Bootleg:</td>
              <td v-if="this.record.bootleg">Yes</td>
              <td v-else>No</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="right-split">
        <span class="title">
          <b>{{ this.record.title }}</b>
        </span>
        <span class="artist underline" @click="goToArtist">{{
            this.record.artist
        }}</span>

        <div class="tracks" v-if="this.record.tracks && this.record.tracks.length > 0">
          <div class="track" v-for="item in this.record.tracks" :key="item.rank">
            <span class="track-rank">
              <b>{{ item.rank }}.</b>
            </span>
            <span class="track-title underline" @click="goToYoutubeSearch(item.title)">{{ item.title }}</span>
          </div>
        </div>
      </div>

      <EditPopup class="edit-modal disabled" id="edit-modal" action="Editing" :record="this.record" @save="saveEdit"
        @cancel="cancelEdit" />
      <DeletePopup class="delete-modal disabled" id="delete-modal" @cancel="toggleDeleteModal"
        @confirm="deleteRecord" />
      <input type="file" id="upload" style="display: none" @change="uploadSubmit" />
    </div>
    <div v-else>Loading...</div>

    <div class="image-context-menu-wrapper disabled" @click="toggleContextMenu">
      <div class="image-context-menu" v-on:click.stop>
        <SidebarButton @click="selectImage">
          <h3>Upload new image</h3>
        </SidebarButton>
        <SidebarButton @click="resetImage">
          <h3>Reset image</h3>
        </SidebarButton>
      </div>
    </div>

  </div>
</template>

<script>
import EditPopup from "../components/EditPopup.vue";
import ES from "../plugins/eventService";
import emitter from "tiny-emitter/instance";
import SidebarButton from "../components/SidebarButton.vue";

export default {
  components: {
    EditPopup,
    SidebarButton,
  },
  data() {
    return {
      baseUrl: import.meta.env.VITE_HOST,
      record: null,
      originalRecord: null,
    };
  },
  created() {
    this.getRecord();
  },
  methods: {
    getRecord() {
      ES.getRecord(this.$route.params.id)
        .then((res) => res.json())
        .then((data) => {
          this.record = data
          if (this.record.limited === undefined) {
            this.record.limited = false;
          }
          if (this.record.bootleg === undefined) {
            this.record.bootleg = false;
          }
          console.log(data);
        })
        .catch((error) => console.log(error));
    },
    applyBlur() {
      document.getElementById("background").classList.toggle("background-blur");
    },
    applyBorder() {
      document.getElementById("foreground").classList.toggle("foreground-blur");
    },
    goToArtist() {
      this.$router.push("/artists/" + this.record.artist + "?back");
    },
    selectImage() {
      this.hideContextMenu();
      document.getElementById("upload").click();
    },
    hideContextMenu() {
      document.getElementsByClassName("image-context-menu-wrapper")[0].classList.toggle("disabled");
    },
    toggleContextMenu(evt) {
      let element = document.getElementsByClassName("image-context-menu")[0]
      document.getElementsByClassName("image-context-menu-wrapper")[0].classList.toggle("disabled");
      element.style.top = evt.clientY + "px";
      element.style.left = evt.clientX + "px";
    },
    uploadSubmit() {
      var formdata = new FormData();
      formdata.append("file", document.getElementById("upload").files[0]);
      ES.postRecordImage(this.record._id, formdata).then((res) => {
        if (res.ok) {
          document.getElementById("upload").value = "";
          const elements = document.getElementsByClassName("coverimage");
          for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            element.src = element.src + "&t=" + new Date().getTime();
          }
          this.applyBlur();
          this.applyBorder();
          document
            .getElementsByClassName("coverimage")[1]
            .classList.remove("noborder");
        } else {
          if (res.status === 415) {
            alert("Please select an image file!");
          }
        }
      });
    },
    goToYoutubeSearch(song) {
      electronAPI.youtube(this.record.artist + ' ' + song)
    },
    toggleEditModal() {
      if (!document.getElementById("edit-modal").classList.toggle("disabled")) {
        this.originalRecord = JSON.parse(JSON.stringify(this.record));
      }
    },
    toggleDeleteModal() {
      if (confirm("Are you sure you want to delete this record?")) {
        this.deleteRecord();
      }
    },
    cancelEdit() {
      this.record = this.originalRecord;
      this.toggleEditModal();
    },
    saveEdit() {
      this.record.creator = null;
      ES.putRecord(this.record)
        .then((response) => {
          if (response.ok) {
            this.toggleEditModal();
          } else {
            alert("Sorry, that did not work. Please try again");
          }
        })
        .catch((error) => console.log(error));
    },
    deleteRecord() {
      ES.deleteRecord(this.record._id).then((response) => {
        if (response.ok) {
          this.$router.push("/records");
        } else {
          alert("Sorry, that did not work. Please try again");
        }
      });
    },
    resetImage() {
      this.hideContextMenu();
      ES.resetRecordImage(this.record._id)
        .then(res => {
          if (res.ok) {
            const elements = document.getElementsByClassName("coverimage");
            for (let index = 0; index < elements.length; index++) {
              const element = elements[index];
              element.src = element.src + "&t=" + new Date().getTime();
            }
            this.applyBlur();
            this.applyBorder();
            document
              .getElementsByClassName("coverimage")[1]
              .classList.remove("noborder");
          }
        })
    }
  },
};
</script>

<style scoped>
.base {
  margin-top: 0.5rem;
  padding: 2rem;
  display: flex;
  border: solid thin var(--color-border);
  border-radius: 0.5rem;
  background-color: var(--color-background-soft);
  position: relative;
}

.top-bar {
  padding: 1em;
  display: flex;
  gap: 1rem;
  border: solid thin var(--color-border);
  border-radius: 0.5rem;
  background-color: var(--color-background-soft);
  height: 3rem;
}

.image {
  width: 100%;
  position: relative;
}

.image-context-menu-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}

.image-context-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  position: absolute;
  width: 220px;
  background-color: var(--color-background-soft);
  border: solid thin var(--color-border);
  border-radius: 0.5rem;
}

.image-context-menu * {
  flex: 1;
  align-items: center;
  text-align: center;
}

.left-split {
  width: 30%;
  padding-left: 1rem;
}

.right-split {
  width: 70%;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  /* border-radius: 1rem;
  box-shadow: 2px 2px 7px 3px rgba(0, 0, 0, 0.2);
  padding: 0.5rem; */
}

.title {
  font-size: 2rem;
}

.artist {
  color: var(--mild-color2);
  transition-duration: 0.5s;
}

.underline:hover::after {
  opacity: 1;
  width: 106%;
  left: -3%;
}

.underline {
  transition-duration: 0.5s;
  cursor: pointer;
  position: relative;
  display: block;
  align-self: flex-start;
}

.underline:after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 50%;
  width: 0;
  height: 2px;
  opacity: 0;
  background-color: var(--color-text);
  transition-duration: 300ms;
  border-radius: 2px;
}

.foreground {
  z-index: 1;
  position: relative;
  width: 85%;
  transition: border-radius 2s transform 0.5s;
  border: solid thin var(--color-border);
}

.foreground-blur {
  border-radius: 1rem;
  transition: border-radius 2s, transform 0.5s;
}

.background {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 85%;
  height: auto;
  transition: filter 2s, transform 0.5s;

  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
}

.background-blur {
  filter: blur(10px);
  transition: filter 2s, transform 0.5s;
}

.infopanel {
  margin-top: 2rem;
  margin-left: 1%;
  width: 85%;
  font-weight: 800;
}

.tracks {
  margin-top: 1.5rem;
}

.track {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}

.track-rank {
  width: 1.2rem;
}

.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.delete-modal {
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
  -webkit-backdrop-filter: blur(5px);
}

.disabled {
  display: none;
}
</style>