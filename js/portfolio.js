function bodyScrolingToggle (){
    document.body.classList.toggle("stop-scrolling");
}
(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        porfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details");
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slidIndex, screenshots;

    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") &&
            !event.target.classList.contains("active")) {
            filterContainer.querySelector(".active").classList.remove("outer-shadow",
                "active");
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            porfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-category")|| target ==="all") {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                     item.classList.remove("show");
                     item.classList.add("hide");
               }
           })
        }
    })

    portfolioItemsContainer.addEventListener("click", (event)=>{
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner")
                .parentElement;
            itemIndex = Array.from(portfolioItem.parentElement.children)
                .indexOf(portfolioItem);
            screenshots = porfolioItems[itemIndex].
                querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                 prevBtn.style.display = "block";
                 nextBtn.style.display = "block";
            }
            slidIndex = 0;
            popupToggle();
            popupSlideShow();
            popupDetails();
            
       } 
    })

    closeBtn.addEventListener("click", ()=>{
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDtailsToggle();
        }
    })
    function popupToggle() {
        popup.classList.toggle("open");
        //bodyScrolingToggle();
    }

    function popupSlideShow() {
        const imgSrc = screenshots[slidIndex];
        const popupImg = popup.querySelector(".pp-img");
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
           popup.querySelector(".pp-loader").classList.remove("active"); 
        }
        popup.querySelector(".pp-counter").innerHTML = (slidIndex + 1) + " of "
            + screenshots.length;
    }

    nextBtn.addEventListener("click", () => {
        if (slidIndex === screenshots.length - 1) {
            slidIndex = 0;
        } else {
            slidIndex++;
        }
        popupSlideShow();
    })

    prevBtn.addEventListener("click", () => {
        if (slidIndex === 0) {
            slidIndex = screenshots.length - 1;
        } else {
            slidIndex--;
        }
         popupSlideShow();
    })
    //popupDetails
    function popupDetails() {
        const details = porfolioItems[itemIndex].querySelector(".portfolio-item-details")
            .innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = porfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;

        const category = porfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }
    projectDetailsBtn.addEventListener("click", () => {
        popupDtailsToggle();
    })

    function popupDtailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");

            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        } else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer
                .scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
       }
    }
})();