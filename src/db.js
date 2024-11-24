import Dexie from 'dexie';

export const musixDB = new Dexie('musix');

musixDB.version(1).stores({
  artists: '++id, name',  // only Primary key and indexed props
  albums: '++id, name, artists',
  audios: '++id, title, albumId',
  lyrics: '++id, audioId'
});

