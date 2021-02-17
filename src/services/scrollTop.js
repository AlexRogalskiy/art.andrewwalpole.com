import { ref } from "vue";
export const useScrollTop = () => {
  const top = ref(window.scrollY);

  console.log("init scroll", top.value);
  window.addEventListener("scroll", updateScroll);

  function updateScroll() {
    top.value = document.documentElement.scrollTop;
  }

  return top;
};
