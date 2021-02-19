<template>
  <ul class="image-grid">
    <ImageItem v-for="(image,i) in images" :key="i" :imageData="image" @showImage="showModal" />
    <div class="image-modal" :class="{isShowing:modalIsShowing, isTall:currentModalIsTall}" @click="closeModal">
      <img class="modal-image" :src="currentModalImage">
      <!-- <button class="close-btn" @click="closeModal">close</button> -->
    </div>
  </ul>
</template>

<script>
import { ref } from 'vue'
import ImageItem from './ImageItem.vue';
import useImages from '../services/images'; 

export default {
  components: { ImageItem },
  methods: {
    showModal(img, isTall) {
      this.currentModalImage = img;
      this.currentModalIsTall = Boolean(isTall);
      this.modalIsShowing = true;
    },
    closeModal() {
      this.modalIsShowing = false;
    }
  },
  setup( props ) {

    const { images } = useImages();
    const modalIsShowing = ref(false);
    const currentModalImage = ref('/placeholder.png');
    const currentModalIsTall = ref(false);
    return { images, modalIsShowing, currentModalImage, currentModalIsTall };
  }

}
</script>

<style scoped lang="scss">
a {
  color: #42b983;
}

ul.image-grid {
  margin:0;
  padding:0;
  display:grid;
  justify-content: center;
  grid-template-columns: repeat( auto-fill, 400px);
  grid-auto-rows: 225px;
  grid-auto-flow: dense;
  list-style-type: none;
}

@media screen and (max-width:835px) {
  ul.image-grid {
    /* margin:0 20px; */
    grid-template-columns: 1fr;
  }
}

.image-modal {
  opacity:0;
  pointer-events: none;
  position: fixed;
  top:0;
  left:0;
  z-index:100;
  width:100%;
  height:100vh;
  background-color:#000000ee;

  transition: all 0.5s;

  .modal-image {
    display:block;
    position:absolute;
    top:200%;
    left:50%;
    transition:top 0.5s ease-in-out 0s;
    transform: translate3d(-50%,-50%,0);
    width:90%;
    max-width: 1600px;
    box-shadow:0px 2px 8px 0px #000000aa;
    text-align: center;
  }

  &.isShowing {
    transition: all 0.8s;


    pointer-events:unset;
    opacity:1;

    .modal-image {
    transition:top 0.8s ease-in-out 0.5s;

      top:50%;
    }
  }

  &.isTall {

    .modal-image {
      width:auto;
      max-width:100%;
      max-height:90vh;
    }
  }
}

</style>