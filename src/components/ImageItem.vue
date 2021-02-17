<template>
    <li class="image-item" :class="classes">
      <img :src=image loading="lazy" ref="imageTag">
    </li>
</template>

<script>
import { ref, computed, onMounted, watch, watchEffect } from 'vue';
// import { ref } from 'vue'
import useImages from '../services/images'; 
import {useScrollTop} from '../services/scrollTop'; 

export default {
  props: {
    imageData: {
      type: Object,
      required:true
    }
  },
  setup( props ) {

    const imageTag = ref(null);

    onMounted( () => {
      isInView.value = window.scrollY + window.innerHeight + 1200 > imageTag.value.offsetTop;
    });

    const { get400, get800, get1600 } = useImages();
    const top  = useScrollTop();
    const imageData = ref(props.imageData);
    
    let startingSize = Math.random() > 0.25 ? 'small' : Math.random() > 0.3 ? 'medium' : 'large';
    startingSize = imageData.value.tall ? Math.random() > 0.5 ? 'small' : 'medium' : startingSize;
    startingSize = imageData.value.size ? imageData.value.size : startingSize;

    const size = ref(startingSize);

    const isInView = ref(false);
    const everInView = ref(false);
    
    watchEffect( () => {
      if( !imageTag.value ) return;
      isInView.value = top.value + (window.innerHeight * 2) > imageTag.value.offsetTop;
    });

    const image = computed( () => {

      if( isInView.value ) {
        everInView.value = true;
      }

      if( !isInView.value && !everInView.value ) {
        return '/placeholder.png';
      }

      switch(size.value) {
        case 'small':
          return get400(imageData.value);
        break;
        case 'medium':
          return get800(imageData.value);
        break;
        case 'large':
          return get1600(imageData.value);
        break;
      }
    });




    const classes = computed( ()=> {
      return {[size.value]:true, 'showing':isInView.value, 'tall':imageData.value.tall}
    });
    
    return { imageTag, image, size, imageData , classes, isInView, everInView, top};
  }

}
</script>

<style scoped>

li.image-item {
  /* max-height:400px; */
  overflow: hidden;
  opacity:0;
  transition: opacity 0s ease-in-out;
  transition-delay: 0s;
}

li.showing {
  opacity:1;
  transition: opacity 1s ease-in-out;
  transition-delay: 0.5s;
}

li > img {
  width:100%;
  height:100%;
  object-fit: cover;
}

.small {
  grid-column: span 1;
}

.medium {
  grid-column: span 2;
  grid-row:span 2;
}

.large {
  grid-column: span 4;
  grid-row:span 4;
}

.tall {
  /* grid-column: span 2; */
  grid-row:span 5;
}

.small.tall {
  grid-row:span 3;

}

@media screen and (max-width:800px) {
  .small, .medium, .large {
    grid-column: span 1;
    grid-row:span 1;
  }

  .tall {
    grid-row:span 2;
  }
}

@media screen and (max-width:1600px) {
  .small, .medium {
    grid-column: span 1;
    grid-row:span 1;
  }

  .large {
    grid-column: span 2;
    grid-row:span 2;
  }

  .tall {
    grid-row:span 3;
  }
}

</style>