<template>
  <div class="py-10 text-center">
    <div class="px-5 text-3xl font-semibold scroll-container">
      <div class="scroll-text"> {{ musixStore.media.title }} </div>
    </div>
    <h3 class="mt-8 text-2xl font-semibold"> {{ musixStore.media.albums.map(a => a.name).join(', ') }} </h3>
    <h4 class="mt-8 text-xl font-semibold"> {{ musixStore.media.artists.map(a => a.name).join(', ') }} </h4>
  </div>
</template>

<script>
  import { useMusixStore } from '../stores/musix';

  export default {
    data() {
      return {
        musixStore: useMusixStore(),
      }
    }
  }

</script>

<style scoped>
  .scroll-container {
    overflow: hidden;
  }

  .scroll-container .scroll-text {
    /* animation properties */
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
    
    -moz-animation: my-animation 15s linear infinite;
    -webkit-animation: my-animation 15s linear infinite;
    animation: my-animation 15s linear infinite;
  }

  /* for Firefox */
  @-moz-keyframes my-animation {
    from { -moz-transform: translateX(100%); }
    to { -moz-transform: translateX(-100%); }
  }

  /* for Chrome */
  @-webkit-keyframes my-animation {
    from { -webkit-transform: translateX(100%); }
    to { -webkit-transform: translateX(-100%); }
  }

  @keyframes my-animation {
    from {
      -moz-transform: translateX(100%);
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    to {
      -moz-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }

</style>