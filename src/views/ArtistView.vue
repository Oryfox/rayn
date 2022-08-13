<template>
  <div class="split">
    <div class="list">
      <ArtistItem
        v-for="artist in artists"
        :key="artist"
        :artist="artist"
        @click="select(artist)"
        :selected="selectedArtist === artist"
      />
    </div>
    <div class="grid">
      <GridItem v-for="record in records" :key="record" :record="record" />
    </div>
  </div>
</template>

<script>
import ES from "../plugins/eventService";
import ArtistItem from "../components/ArtistItem.vue";
import GridItem from "../components/GridItem.vue";
export default {
  components: {
    ArtistItem,
    GridItem,
  },
  data() {
    return {
      artists: [],
      selectedArtist: null,
      records: [],
    };
  },
  created() {
    this.getArtists();
    if (this.$route.params.name) {
      this.select(this.$route.params.name, true);
    }
  },
  methods: {
    reload() {
      if (this.$route.params.name) {
        this.select(this.$route.params.name, true);
      } else {
        this.selectedArtist = null;
        this.records = [];
      }
    },
    getArtists() {
      ES.getArtists()
        .then((res) => res.json())
        .then((json) => this.artists = json);
    },
    select(artist, push) {
      if (!push) history.pushState({}, null, "/artists/" + encodeURI(artist));
      this.selectedArtist = artist;
      ES.getRecordsForArtist(this.selectedArtist)
        .then((res) => res.json())
        .then((json) => this.records = json);
    },
  },
  watch: {
    $route() {
      this.reload();
    },
  },
};
</script>

<style scoped>
.split {
  display: flex;
}
.list {
  height: calc(100vh - 4rem);
  overflow-y: scroll;
  width: 25rem;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
  flex: 1;
  height: calc(100vh - 4rem);
  overflow-y: scroll;
}
</style>