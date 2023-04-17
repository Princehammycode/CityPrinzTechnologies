const carousel = document.querySelector(".carousel");

//getting clicked icon element
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");


let isDragStart = false, prevPageX, prevScrollLeft;

const showHideicons = () => {
    //showing and hiding prev/next icon according to caurosel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //clientWidth is the viewable width of an element. so this line is getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block"; //if the caurosel scroll left value is 0 then hide prev icon else show it
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; //getting first img width & adding 14 margin value
        //adding click event to each icon
        //if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideicons(), 60); //calling showHideIcons after 60ms

    });
});

const dragStart = (e) => {
    //updating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX; //e.pageX will run on desktop devices and on touch devices e.touches[0].pageX rub
    prevScrollLeft = carousel.scrollLeft; //scroll left gives the number of px of element content that is scrolled horizontally
}

const dragging = (e) => {
    //scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging"); //adding drag class to carousel on mouse move
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideicons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging"); //removing this class on mouse up
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
