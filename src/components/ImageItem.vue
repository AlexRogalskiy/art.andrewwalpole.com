<template>
    <li class="image-item" :class="classes">
      <template v-if="mediaType === 'image'">
        <img :src=image loading="lazy" ref="imageTag">
      </template>
      <template v-else-if="mediaType === 'info'">
        <section>
          <h1>Generative Art by Andrew Walpole</h1>
          <ul>
            <li><a href="https://twitter.com/walpolea" target="_blank">@walpolea</a> on twitter</li>
            <li><a href="https://instagram.com/andrewwalpole" target="_blank">@andrewwalpole</a> on instagram</li>
            <li>website: <a href="andrewwalpole.com" target="_blank">andrewwalpole.com</a></li>
          </ul>
          <p class="copyright">copyright &copy; {{new Date().getFullYear()}}</p>
        </section>
      </template>
      <template v-else-if="mediaType === 'video'">
        <video :src=image autoplay muted ref="imageTag"></video>
      </template>
    </li>
</template>

<script>
import { ref, computed, onMounted, watchEffect } from 'vue';
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
      if( imageTag.value )
      isInView.value = window.scrollY + window.innerHeight + 1200 > imageTag.value.offsetTop;
    });

    const { get400, get800, get1600 } = useImages();
    const top  = useScrollTop();
    const imageData = ref(props.imageData);
    const mediaType = ref(imageData.value.type || 'image');
    
    let startingSize = Math.random() > 0.25 ? 'small' : Math.random() > 0.3 ? 'medium' : 'large';
    startingSize = imageData.value.tall ? Math.random() > 0.5 ? 'small' : 'medium' : startingSize;
    startingSize = imageData.value.size ? imageData.value.size : startingSize;

    if(mediaType.value === "info") {
      console.log(startingSize)
    }

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
      return {[size.value]:true, 'showing':isInView.value, 'tall':imageData.value.tall, [mediaType.value]:true}
    });
    
    return { imageTag, mediaType, image, size, imageData , classes, isInView, everInView, top};
  }

}
</script>

<style scoped lang='scss'>

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

.info {
  opacity:1 !important;
  grid-column: 2 / -2;
  grid-row: 3 / span 3;

  // background: #000;
  text-align:left;
  padding:5% 8%;

  section {

    color:#fff;
    width:100%;
    min-height:500px;
    display:grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    align-items: end;

    ul {
      flex:1;

      list-style: none;
      padding:0;
      margin:0;
      display:flex;
      flex-wrap: wrap;

      li {
        padding:0;
        margin:0;
        margin-bottom:20px;
        margin-right:40px;
        flex:1;
      }
    }
    
    h1 {
      flex:1;
      font-size:3rem;
    }

    a {
      color:#ccc;
      font-weight:bold;
      text-decoration: none;
      font-size:2rem;

      &:hover {
        color: #ff6666;
      }
    }

    .copyright {
      margin-bottom:40px;
    }

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

  .info {
    grid-row: 2 / span 3;
    grid-column: 1 / -2;
  }
}

@media screen and (max-width:800px) {
  .small, .medium, .large {
    grid-column: span 1;
    grid-row:span 1;
  }

  .tall {
    grid-row:span 2;
  }

  .info {
    grid-row: 1 / span 3;
    grid-column: 1 / span 1;
  }
}




</style>