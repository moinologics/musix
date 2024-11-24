import { defineStore } from 'pinia';

import { musixDB } from '../db';
import { parse as lyricsParse } from 'clrc';

export const useMusixStore = defineStore('musix', {
  state: () => ({
    audioPlayer: null,
    player: {
      state: 'stopped',
      duration: {progress: 0, total: 0},
      media: {audio: null, lyrics: null}
    },
    media: {
      title: 'Alan Walker Best Songs Of All Time - Alan Walker Full Album 2023',
      albums: [{name: 'Different World'}],
      artists: [{name: 'Alan Walker'}]
    }
  }),
  actions: {
    async loadSongAndLrc() {
      const audio = await musixDB.audios.where({id: 1}).first();
      if(!audio) { return false; }
      const lyrics = await musixDB.lyrics.where({audioId: audio.id}).toArray();
      if(lyrics.length === 0) { return false; }
      this.player.media.audio = URL.createObjectURL(audio.data);
      this.player.media.lyrics = lyricsParse(await lyrics[0].data.text());
      this.media.title = audio.title;
      this.media.albums = await musixDB.albums.where({id: audio.albumId}).toArray();
      const artistsIds = this.media.albums.map(album => album.artists);
      this.media.artists = await musixDB.artists.where('id').anyOf(artistsIds.flat()).toArray();
      return true;
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
