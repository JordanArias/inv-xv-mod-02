/**
 * ==========================================================================
 * GALLERY.JS - GALERÍA HORIZONTAL DE 3 FOTOS CON ROTACIÓN E INTERCALADO
 *              Y VISOR LIGHTBOX
 * MIS XV AÑOS CANDELA (MODELO 02 - ACUARELA LILA & VIOLETA)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const zoomableImages = document.querySelectorAll(
    ".gallery-thumb-item img, .hero-arch-img, .qr-code-image, .zoomable-photo"
  );

  // 1. Visor Lightbox a pantalla completa
  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Fotografía de Mis XV Años - Candela";
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  zoomableImages.forEach((img) => {
    img.addEventListener("click", () => {
      openLightbox(img.src, img.alt);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target === lightboxClose) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (lightbox && e.key === "Escape" && !lightbox.classList.contains("hidden")) {
      closeLightbox();
    }
  });

  // 2. Rotación e intercalado automático en los 3 cuadros de "Mis Momentos"
  const trioStage = document.querySelector(".gallery-trio-stage");
  if (!trioStage) return;

  const slotImgs = Array.from(
    trioStage.querySelectorAll(".gallery-thumb-item .gallery-thumb-img")
  );
  if (slotImgs.length < 3) return;

  const rawList = trioStage.getAttribute("data-gallery-images") || "";
  const photoPool = rawList
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (photoPool.length < 3) return;

  // Precargar imágenes del carrusel para que el cambio sea instantáneo y fluido
  photoPool.forEach((src) => {
    const preload = new Image();
    preload.src = src;
  });

  let startIndex = 0;
  let rotationTimer = null;
  const ROTATION_INTERVAL_MS = 3200;

  function rotateGallerySlots() {
    // Si el visor lightbox está abierto, pausamos momentáneamente el cambio
    if (lightbox && !lightbox.classList.contains("hidden")) return;

    startIndex = (startIndex + 1) % photoPool.length;

    slotImgs.forEach((imgEl, slotOffset) => {
      const nextIndex = (startIndex + slotOffset) % photoPool.length;
      const nextSrc = photoPool[nextIndex];
      const nextAlt = `Sesión fotográfica de Candela ${nextIndex + 1}`;

      // Desfase sutil entre izquierda, centro y derecha para efecto intercalado
      setTimeout(() => {
        imgEl.classList.add("is-swapping");

        setTimeout(() => {
          imgEl.src = nextSrc;
          imgEl.alt = nextAlt;
          imgEl.classList.remove("is-swapping");
        }, 230);
      }, slotOffset * 110);
    });
  }

  function startRotation() {
    if (!rotationTimer) {
      rotationTimer = setInterval(rotateGallerySlots, ROTATION_INTERVAL_MS);
    }
  }

  function stopRotation() {
    if (rotationTimer) {
      clearInterval(rotationTimer);
      rotationTimer = null;
    }
  }

  // Pausar al pasar el cursor encima para que el invitado pueda apreciar o hacer clic cómodamente
  trioStage.addEventListener("mouseenter", stopRotation);
  trioStage.addEventListener("mouseleave", startRotation);

  startRotation();
});
