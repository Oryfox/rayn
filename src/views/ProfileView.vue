<template>
  <div class="base" v-if="user" id="page">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      fill="currentColor"
      class="bi bi-person-circle pic"
      viewBox="0 0 16 16"
      v-if="user.imageType == 'DEFAULT'"
      @click="upload"
    >
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path
        fill-rule="evenodd"
        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
      />
    </svg>
    <div v-else class="hover-area">
      <div class="pic" @click="upload">
        <img
          :src="baseUrl + 'user/image?token=' + this.$cookies.get('token')"
          alt="Your Image"
          id="profile-pic"
        />
      </div>
      <div class="delete-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          fill="currentColor"
          class="bi bi-trash trash-can"
          viewBox="0 0 16 16"
          @click="deleteImage"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </div>
    </div>
    <input
      type="text"
      v-model="user.displayName"
      @keyup.enter="updateDisplayName"
      id="namefield"
    />

    <input
      type="file"
      id="upload"
      style="display: none"
      @change="uploadSubmit"
    />
  </div>
</template>

<script>
import ES from "../plugins/eventService";
export default {
  data() {
    return {
      user: null,
      baseUrl: import.meta.env.VITE_HOST,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      ES.getUser()
        .then((res) => res.json())
        .then((json) => {
          this.user = json;
          if (!this.user.displayName)
            this.user.displayName = "User";
        });
    },
    anim() {
      document.getElementById("svg").classList.toggle("pic-visible");
    },
    upload() {
      document.getElementById("upload").click();
    },
    uploadSubmit() {
      var formdata = new FormData();
      formdata.append("file", document.getElementById("upload").files[0]);
      ES.postUserImage(formdata).then((res) => {
        if (res.ok) {
          document.getElementById("upload").value = "";
          this.getUser();
          const el = document.getElementById("profile-pic");
          el.src = el.src + "&t=" + new Date().getTime();
        } else {
          if (res.status === 415) {
            alert("Please select an image file!");
          }
        }
      });
    },
    deleteImage() {
      ES.deleteUserImage()
        .then((res) => {
          this.getUser();
          if (!res.ok) {
            alert("Sorry, that did not work");
          }
        })
        .catch(() => alert("Sorry, that did not work"));
    },
    updateDisplayName() {
      ES.updateDisplayName(this.user.displayName)
      .then(res => {
        if (res.ok) {
          this.getUser();
          document.getElementById("namefield").blur();
        }
      });
    }
  },
};
</script>

<style scoped>
.base {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
  gap: 1.5rem;
}
.pic {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transform: translateX(0);
  transition: transform 500ms;
}
.hover-area {
  animation: 1s ease 0s 1 fade;
  filter: drop-shadow(1px 10px 5px rgba(0, 0, 0, 0.2));
  -webkit-filter: drop-shadow(1px 10px 5px rgba(0, 0, 0, 0.2));
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  position: relative;
}
.delete-button {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.trash-can {
  transform: scale(1, 1);
  transition: transform 0.3s;
}
.trash-can:hover {
  color: var(--primary-color);
  transform: scale(1.1, 1.1);
  transition: transform 0.3s;
}
img {
  height: 100%;
  width: auto;
  margin: 0 auto;
  display: inline;
}
.hover-area:hover .pic {
  transform: translateX(-75%);
  -webkit-transform: translateX(-75%);
  -moz-transform: translateX(-75%);
  transition: transform 500ms;
}
#namefield {
  color: var(--text-color);
  font-weight: 700;
  font-size: 28px;
  text-align: center;
  border: none;
  outline: none;
}
.name {
  font-weight: 700;
  font-size: 28px;
}
.empty-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.edit-button {
  transition-duration: 500ms;
  cursor: pointer;
}
.edit-button:hover {
  transform: scale(1.1, 1.1);
  transition-duration: 500ms;
}

@keyframes fade {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>