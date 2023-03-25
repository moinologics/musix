<template>
  <div class="container mx-auto h-full">
    <div class="grid grid-cols-2 mt-5 border">
      <div class="grid grid-cols-1">
        <div class="bg-cover bg-center bg-[url('https://wallpaperaccess.com/download/alan-walker-logo-981648')]">
          <LyricsPlayer />
        </div>
        <div class="mt-2" v-if="musixStore.player.media.audio !== null">
          <wavesurfer :src="musixStore.player.media.audio" :options="options" ref="wavesurfer"></wavesurfer>
        </div>
      </div>
      <div class="grid grid-cols-1">
        <MediaInfo />
        <div class="px-5 text-center">
          <MusicPlayer />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useMusixStore } from '../stores/musix';
  import LyricsPlayer from './LyricsPlayer.vue';
  import MediaInfo from './MediaInfo.vue';
  import MusicPlayer from './MusicPlayer.vue';
  import { secondsTohhmmss } from '../utils/common';

  export default {
    data() {
      return {
        musixStore: useMusixStore(),
        options: {}
      };
    },
    methods: {
      async setupMusix() {
        await this.musixStore.initializeFileStorage();
        await this.musixStore.loadSongAndLrc();
        this.musixStore.audioPlayer = this.$refs.wavesurfer.waveSurfer;
        this.musixStore.setupAudioPlayer();
      },
      ...{secondsTohhmmss},
    },
    components: {
      MediaInfo,
      LyricsPlayer,
      MusicPlayer
    },
    mounted() {
      this.setupMusix();
    }
  };

</script>
