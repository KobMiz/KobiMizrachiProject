document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    showPage(1);
});

function showPage(pageNumber) {
    var pages = document.getElementsByClassName("galleryPage");
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    document.getElementById("page" + pageNumber).style.display = "grid";

    var infoGallery = document.querySelector(".infogallerry");
    if (pageNumber === 1) {
        infoGallery.classList.add("active");
    } else {
        infoGallery.classList.remove("active");
    }
}
