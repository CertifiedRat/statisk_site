let slideIndex = 0;

function changeSlide(direction) {
  showSlide((slideIndex += direction));
}

function currentSlide(index) {
  showSlide((slideIndex = index));
}

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const wrapper = document.querySelector(".slide-wrapper");

  // Loop back if index goes out of bounds
  if (index >= slides.length) {
    slideIndex = 0;
  }
  if (index < 0) {
    slideIndex = slides.length - 1;
  }

  // Move the wrapper train horizontally (0%, -100%, -200%, etc.)
  wrapper.style.transform = `translateX(-${slideIndex * 100}%)`;

  // Update dots active visual state
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");
}
