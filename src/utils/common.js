export function secondsTohhmmss(secs) {
  const sec_num = parseInt(secs, 10)
  const hours   = Math.floor(sec_num / 3600)
  const minutes = Math.floor(sec_num / 60) % 60
  const seconds = sec_num % 60
  return [hours,minutes,seconds].map(v => v < 10 ? '0' + v : v).filter((v,i) => v !== '00' || i > 0).join(':');
}

export async function fileToBlob(file) {
  if(file && file.constructor.name === 'File') {
    return new Blob(
      [new Uint8Array(await file.arrayBuffer())], 
      {type: file.type }
    );
  }
  throw new Error(`only File input allowed, but ${file && file.constructor.name} provided`);
}