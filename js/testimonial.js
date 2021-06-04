(() => {
    const sliderContainer = document.querySelector(".testi-slider-content"),
        slides = sliderContainer.querySelectorAll(".testi-item"),
        slidWidth = sliderContainer.offsetWidth,
        prevBtn = document.querySelector(".testi-slider-nav .prev"),
        nextBtn = document.querySelector(".testi-slider-nav .next"),
        activeSlide = sliderContainer.querySelector(".testi-item.active");
    let sliderIndex = Array.from(activeSlide.parentElement.children)
        .indexOf(activeSlide);

    slides.forEach((slide) => {
        slide.style.width = slidWidth + "px";
    })
    sliderContainer.style.width = slidWidth * slides.length + "px";

    nextBtn.addEventListener("click", () => {
        if (sliderIndex === slides.length - 1) {
            sliderIndex = 0;
        } else {
            sliderIndex++;
        }
        slider();
    })

    prevBtn.addEventListener("click", () => {
        if (sliderIndex === 0) {
            sliderIndex = slides.length - 1;
        } else {
            sliderIndex--;
        }
        slider();
    })
    
    function slider() {
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");
        slides[sliderIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slidWidth * sliderIndex) + "px";
    }
    slider();
})();