import { reactive, toRefs } from "vue";
import { ImageData } from "../data/imagedata";

const imageState = reactive({
  imageBase: "/local/art/", //"https://andrewwalpole.s3-us-west-1.amazonaws.com/art/",
  images: ImageData,
});

export default function useImages() {
  const get400 = (imageItem) => {
    return imageState.imageBase + imageItem["400"];
  };

  const get800 = (imageItem) => {
    return imageState.imageBase + imageItem["800"];
  };

  const get1600 = (imageItem) => {
    return imageState.imageBase + imageItem["1600"];
  };

  const getAll400 = () => {
    return imageState.images.map((i) => get400(i));
  };

  const getAll800 = () => {
    return imageState.images.map((i) => get800(i));
  };

  const getAll1600 = () => {
    return imageState.images.map((i) => get1600(i));
  };

  return { ...toRefs(imageState), get400, get800, get1600, getAll400, getAll800, getAll1600 };
}
