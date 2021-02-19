import { ref } from "vue";
export const useScrollTop = () => {
  const top = ref(window.scrollY);

  window.addEventListener("scroll", updateScroll);

  function updateScroll() {
    top.value = document.documentElement.scrollTop;
  }

  return top;
};
