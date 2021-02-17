<template>
  <ul class="image-grid">
    <ImageItem v-for="(image,i) in images" :key="i" :imageData="image" />
  </ul>
</template>

<script>
// import { ref } from 'vue'
import ImageItem from './ImageItem.vue';
import useImages from '../services/images'; 

export default {
  components: { ImageItem },
  setup( props ) {

    const { images } = useImages();
    return { images };
  }

}
</script>

<style scoped>
a {
  color: #42b983;
}

ul.image-grid {
  margin:0;
  padding:0;
  display:grid;
  justify-content: center;
  grid-template-columns: repeat( auto-fill, 400px);
  grid-auto-rows: 225px;/*min(225px, 1fr);*/
  grid-auto-flow: dense;
  list-style-type: none;
}

@media screen and (max-width:600px) {
  ul.image-grid {
    grid-template-columns: 1fr;
  }
}

</style>