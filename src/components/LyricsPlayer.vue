<template>
  <div 
    class="text-white text-center backdrop-brightness-50 no-scrollbar" 
    style="height: 25rem;overflow-y: scroll;"
  >
    <h6 
      v-if="musixStore.player.media.lyrics !== null" 
      v-for="(lyricItem, index) in musixStore.player.media.lyrics" 
      :ref="index === currentLyricsIndex ? 'activeLrc' : 'inactiveLrc'+index" 
      :class="index === currentLyricsIndex ? 'text-4xl' : 'text-md'"
    > 
      {{ lyricItem.content }}
    </h6>
  </div>
</template>

<script>

  import { useMusixStore } from '../stores/musix';

  export default {
    data() {
      return {
        musixStore: useMusixStore(),
      }
    },
    methods: {
      scrollLyricsToActive() {
        if(this.$refs.activeLrc && this.$refs.activeLrc[0]) {
          this.$refs.activeLrc[0].scrollIntoView({behavior: 'smooth', block: 'center'});
        }
      }
    },
    computed: {
      currentLyricsIndex() {
        if(this.musixStore.player.media.lyrics === null) {
          return -1;
        }
        const nextIndex = this.musixStore.player.media.lyrics.findIndex(lyricItem => {
          return lyricItem.type === 'lyric' && lyricItem.startMillisecond > Math.floor(this.musixStore.player.duration.progress * 1000)
        });
        return nextIndex - 1;
      }
    },
    mounted() {
      const i = setInterval(this.scrollLyricsToActive, 100);
    }
  }

</script>