document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slideContainer = document.querySelector(".principal__nosso-lamen");
    const bullets = document.querySelectorAll(".bullet");
    const totalSlides = bullets.length;
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlide(index) {
        currentSlide = index;
        slideContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
        updateBullets();
    }

    function updateBullets() {
        bullets.forEach((bullet, i) => {
            if (i === currentSlide) {
                bullet.classList.add("active");
            } else {
                bullet.classList.remove("active");
            }
        });
    }

    function changeSlide(index) {
        showSlide(index);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    bullets.forEach((bullet, index) => {
        bullet.addEventListener("click", function () {
            changeSlide(index);
        });
    });

    // Adiciona a classe "active" ao primeiro bullet quando a página é carregada
    bullets[0].classList.add("active");

    // Adiciona eventos de toque para deslizar
    slideContainer.addEventListener("touchstart", function (e) {
        touchStartX = e.touches[0].clientX;
    });

    slideContainer.addEventListener("touchend", function (e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        const swipeThreshold = 50; // Ajuste conforme necessário

        if (swipeDistance > swipeThreshold) {
            prevSlide();
        } else if (swipeDistance < -swipeThreshold) {
            nextSlide();
        }
    }

    setInterval(() => {
        nextSlide();
    }, 5000);
});
