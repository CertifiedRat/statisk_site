const menuIkon = document.querySelector(".menuikon");
const nav = document.querySelector(".header-content");

menuIkon.addEventListener("click", menuClicked);
function menuClicked() {
  menuIkon.classList.toggle("menuopen");
  nav.classList.toggle("menuopen");
}
