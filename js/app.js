document.addEventListener("DOMContentLoaded", () => {
    
    // 1. MODO OSCURO / MODO CLARO
    const btnTheme = document.getElementById("btnTheme");
    btnTheme.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const icon = btnTheme.querySelector("i");
        if (document.body.classList.contains("dark-mode")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    });

   // 2. MÚSICA DE AMBIENTE (Reproductor de MP3)
const musicBtn = document.getElementById("btnAudio"); 
const backgroundAudio = document.getElementById("bg-audio");

if (musicBtn && backgroundAudio) {
    backgroundAudio.volume = 0.4; // Volumen suave inicial

    musicBtn.addEventListener("click", () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play()
                .then(() => {
                    // Cambia el color o icono a verde cuando esté sonando
                    musicBtn.style.color = "#27ae60"; 
                })
                .catch(error => {
                    console.log("Error al reproducir el audio: ", error);
                });
        } else {
            backgroundAudio.pause();
            // Regresa al color original (acentuado) cuando se pause
            musicBtn.style.color = "var(--accent)";
        }
    });
}
    // 3. GALERÍA CON LIGHTBOX (AMPLIAR IMÁGENES)
    const images = document.querySelectorAll(".zoomable");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeLightbox = document.getElementById("closeLightbox");

    images.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    closeLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });

    // 4. GESTIÓN DEL FORMULARIO DE RESERVAS
    const bookingForm = document.getElementById("bookingForm");
    const bookingConfirmation = document.getElementById("bookingConfirmation");
    const confirmationText = document.getElementById("confirmationText");

    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById("nombre").value;
        const servicio = document.getElementById("servicio").value;
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;

        confirmationText.innerHTML = `Gracias <strong>${nombre}</strong>, tu cita para <strong>${servicio}</strong> ha sido agendada para el día <strong>${fecha}</strong> a las <strong>${hora}</strong>.`;

        bookingForm.classList.add("hidden");
        bookingConfirmation.classList.remove("hidden");
    });

    // 5. ANIMACIONES SUAVES AL HACER SCROLL
    const fadeElements = document.querySelectorAll(".section-fade");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});