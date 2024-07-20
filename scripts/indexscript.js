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
    const pages = document.getElementsByClassName("galleryPage");
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    document.getElementById("page" + pageNumber).style.display = "grid";

    const infoGallery = document.querySelector(".infogallerry");
    if (pageNumber === 1) {
        infoGallery.classList.add("active");
    } else {
        infoGallery.classList.remove("active");
    }
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
        button.style.transform = 'scale(1.1)';
        button.style.transition = 'transform 0.3s ease';
    });

    button.addEventListener('mouseleave', function () {
        button.style.transform = 'scale(1)';
    });
});

const logos = document.querySelectorAll('.imgLogo');

logos.forEach(logo => {
    logo.addEventListener('mouseenter', function () {
        logo.style.transform = 'scale(1.15)';
        logo.style.transition = 'transform 0.3s ease';
    });

    logo.addEventListener('mouseleave', function () {
        logo.style.transform = 'scale(1)';
    });
});


const galleryBoxes = document.querySelectorAll('.galleryBox');

galleryBoxes.forEach(galleryBox => {
    galleryBox.addEventListener('mouseover', function () {
        galleryBox.style.transform = 'scale(1.1)';
        galleryBox.style.transition = 'transform 0.3s ease';
    });

    galleryBox.addEventListener('mouseout', function () {
        galleryBox.style.transform = 'scale(1)';
    });
});

