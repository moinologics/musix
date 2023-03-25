import { defineStore } from 'pinia';

import { parse as lyricsParse } from 'clrc';

export const useMusixStore = defineStore('musix', {
  state: () => ({
    storage: null,
    audioPlayer: null,
    player: {
      state: 'stopped',
      duration: {progress: 0, total: 0},
      media: {audio: null, lyrics: null}
    }
  }),
  actions: {
    async initializeFileStorage() {
      this.storage = new OPFS();
      await this.storage.init();
    },
    async loadSongAndLrc() {
      const songFile = await this.storage.getFile('/test/songs', 'wonderland.mp3');
      const lyricsFile = await this.storage.getFile('/test/lyrics', 'wonderland.lrc');
      const lyricsFileContent = await this.storage.readFile(lyricsFile, 'text');
      this.player.media.audio = URL.createObjectURL(songFile);
      this.player.media.lyrics = lyricsParse(lyricsFileContent);
    },
    setupAudioPlayer() {
      this.audioPlayer.on('ready', () => {
        this.audioPlayer.setVolume(0.2);
        this.audioPlayer.setHeight(40);
        this.player.duration.total = this.audioPlayer.getDuration();
        this.player.state = 'paused';
      });
      this.audioPlayer.on('audioprocess', (e) => {
        this.player.duration.progress = e;
      });
      this.audioPlayer.on('finish', () => {
        this.player.duration.progress = 0;
        this.player.state = 'stopped';
      });
    },
  },
})
