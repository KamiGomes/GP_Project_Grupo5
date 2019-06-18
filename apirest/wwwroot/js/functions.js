//Slide Show
var currentSlide = 1;
showSlides(currentSlide);

function changeSlide(n) {
  showSlides(currentSlide += n);
};

function showSlides(n){
  var slides = document.getElementsByClassName("slides");
  if (n > slides.length) {
    currentSlide = 1;
  }
  if (n < 1) {
    currentSlide = slides.length;
  }
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[currentSlide-1].style.display = "block";
};
//
