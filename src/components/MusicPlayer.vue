<template>
  <div class="toolbar"></div>
  <div class="flow-root text-xs">
    <p class="float-left">{{ secondsTohhmmss(musixStore.player.duration.progress) }}</p> 
    <p class="float-right">{{ secondsTohhmmss(musixStore.player.duration.total) }}</p>
  </div>
  <div class="h-1 w-full bg-yellow-200 my-2">
    <div class="h-1 bg-blue-500" :style="`width: ${progressPercent}%`"></div>
  </div>
  <div class="grid grid-cols-5 mt-8">
    <div>
      <img src="../assets/icons/previous.svg" class="w-7/12 mx-auto"/>
    </div>
    <div @click="() => this.musixStore.audioPlayer.skipBackward(10)">
      <img src="../assets/icons/rewind.svg" class="w-7/12 mx-auto"/>
    </div>
    <div @click="playPause">
      <img src="../assets/icons/stop.svg" class="w-7/12 mx-auto" v-if="musixStore.player.state === 'stopped'"/>
      <img src="../assets/icons/pause.svg" class="w-7/12 mx-auto" v-else-if="musixStore.player.state === 'playing'"/>
      <img src="../assets/icons/play.svg" class="w-7/12 mx-auto" v-else-if="musixStore.player.state === 'paused'"/>
    </div>
    <div @click="() => this.musixStore.audioPlayer.skipForward(10)">
      <img src="../assets/icons/fast-forward.svg" class="w-7/12 mx-auto"/>
    </div>
    <div>
      <img src="../assets/icons/next.svg" class="w-7/12 mx-auto"/>
    </div>
  </div>
</template>

<script>
  import { useMusixStore } from '../stores/musix';
  import { secondsTohhmmss } from '../utils/common';

  export default {
    data() {
      return {
        musixStore: useMusixStore(),
      }
    },
    methods: {
      secondsTohhmmss: secondsTohhmmss,
      playPause() {
        if(this.musixStore.player.state === 'playing') {
          this.musixStore.player.state = 'paused';
        } else if(this.musixStore.player.state === 'paused') {
          this.musixStore.player.state = 'playing';
        } else if(this.musixStore.player.state === 'stopped') {
          this.musixStore.player.state = 'playing';
        }
        this.musixStore.audioPlayer.playPause();
      }
    },
    computed: {
      progressPercent() {
        if(this.musixStore.player.duration.total === 0) {
          return 0;
        }
        return Math.floor(
          (this.musixStore.player.duration.progress / this.musixStore.player.duration.total) * 100
        );
      }
    }
  }

</script>