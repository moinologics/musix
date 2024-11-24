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
      <!-- <input type="file" ref="file" @change="handleFileChange"/> -->
      <AddMusic />
    </div>
  </div>
</template>

<script>
  import { useMusixStore } from '../stores/musix';
  import LyricsPlayer from './LyricsPlayer.vue';
  import MediaInfo from './MediaInfo.vue';
  import AddMusic from './AddMusic.vue';
  import MusicPlayer from './MusicPlayer.vue';
  import { secondsTohhmmss, fileToBlob } from '../utils/common';

  import { musixDB } from '../db';

  export default {
    data() {
      return {
        musixStore: useMusixStore(),
        options: {}
      };
    },
    methods: {
      async handleFileChange() {
        // const id = await musixDB.albums.add({
        //   name: 'The Sped Up EP',
        //   artists: [1]
        // });
        // const file = this.$refs.file.files[0];
        // if(!file) return;
        // let targetDB;
        // if(file.type === 'audio/mpeg') {
        //   targetDB = musixDB.audios;
        // } else if(file.type === 'text/plain') {
        //   targetDB = musixDB.lyrics;
        // } else {
        //   return;
        // }
        // const blob = await fileToBlob(file);
        // const id = await targetDB.add({
        //   audioId: 1,
        //   data: blob
        // });
        console.log(id);
        // console.log(await targetDB.where({id: id}).first());
      },
      async setupMusix() {
        const isLoadSuccess = await this.musixStore.loadSongAndLrc();
        if(!isLoadSuccess) {
          console.log('no song found');
          return;
        }
        this.musixStore.audioPlayer = this.$refs.wavesurfer.waveSurfer;
        this.musixStore.setupAudioPlayer();
      },
      ...{secondsTohhmmss},
    },
    components: {
      MediaInfo,
      LyricsPlayer,
      MusicPlayer,
      AddMusic
    },
    mounted() {
      this.setupMusix();
    }
  };

</script>
