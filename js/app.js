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

    // 2. MÚSICA AMBIENTAL RELAJANTE (Audio Sintético mediante Web Audio API)
    const btnAudio = document.getElementById("btnAudio");
    let audioCtx = null;
    let isPlaying = false;
    let oscillator = null;

    btnAudio.addEventListener("click", () => {
        if (!isPlaying) {
            // Iniciar tono relajante
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(432, audioCtx.currentTime); // Frecuencia de relajación 432Hz
            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // Volumen suave

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            isPlaying = true;
            btnAudio.style.color = "#27ae60"; // Cambia icono a verde
        } else {
            // Pausar música
            if (oscillator) oscillator.stop();
            isPlaying = false;
            btnAudio.style.color = "var(--accent)";
        }
    });

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