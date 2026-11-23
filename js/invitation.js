/**
 * ==========================================================================
 * INVITATION.JS - TRANSICIONES Y REVELADO CINEMÁTICO SUAVE EN SCROLL
 * MIS XV AÑOS CANDELA (MODELO 02 - ACUARELA LILA & VIOLETA)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector(".main-invitation-container");
  const envelope = document.getElementById("envelope-screen");
  const isEnvelopePresent = envelope && !envelope.classList.contains("hidden");

  // 1. Entrada suave del contenedor principal
  if (mainContainer) {
    mainContainer.classList.add("page-dreamy-entrance");

    if (!isEnvelopePresent) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          mainContainer.classList.add("page-ready");
        }, 80);
      });
    } else {
      window.addEventListener(
        "envelopeOpened",
        () => {
          setTimeout(() => {
            mainContainer.classList.add("page-ready");
          }, 120);
        },
        { once: true }
      );
    }
  }

  // 2. Grupos de elementos con animación de revelado suave al hacer scroll
  const revealGroups = [
    // Portada / Hero Acuarela
    { selector: ".xv-monogram-15-block", class: "top-floral-reveal" },
    { selector: ".xv-watercolor-cloud-wrap", class: "scroll-reveal-scale", delay: "delay-1" },
    { selector: ".xv-hero-arch-frame", class: "scroll-reveal-scale", delay: "delay-2" },
    { selector: ".xv-audio-player-block", class: "scroll-reveal-scale", delay: "delay-2" },

    // Franjas Violetas (Fecha y Regalos)
    { selector: ".xv-purple-band .xv-band-inner", class: "scroll-reveal" },

    // Padres, Padrinos, Contador y Calendario
    { selector: ".xv-family-block", class: "scroll-reveal" },
    { selector: ".xv-countdown-block", class: "scroll-reveal", delay: "delay-1" },
    { selector: ".xv-calendar-block", class: "scroll-reveal-scale", delay: "delay-2" },

    // Misa, Fiesta y Banners Fotográficos
    { selector: ".xv-event-card", class: "scroll-reveal", stagger: true },
    { selector: ".xv-torn-photo-banner", class: "scroll-reveal-scale" },

    // Itinerario, Dress Code Geométrico y Playlist
    { selector: ".xv-itinerary-section", class: "scroll-reveal" },
    { selector: ".xv-timeline-item", class: "scroll-reveal", stagger: true },
    { selector: ".xv-dresscode-geo-card", class: "scroll-reveal-scale" },
    { selector: ".xv-playlist-section", class: "scroll-reveal" },

    // Galería, RSVP y Cierre
    { selector: ".xv-rsvp-section", class: "scroll-reveal" },
    { selector: ".gallery-thumb-item", class: "scroll-reveal-scale", stagger: true },
    { selector: ".xv-farewell-block", class: "scroll-reveal" },
    { selector: ".xv-final-photo-section", class: "scroll-reveal-scale" }
  ];

  const allTargets = [];
  revealGroups.forEach((group) => {
    const nodes = document.querySelectorAll(group.selector);
    nodes.forEach((node, index) => {
      node.classList.add(group.class);
      if (group.delay) {
        node.classList.add(group.delay);
      }
      if (group.stagger) {
        const staggerIndex = (index % 5) + 1;
        node.classList.add(`delay-${staggerIndex}`);
      }
      allTargets.push(node);
    });
  });

  if (!("IntersectionObserver" in window)) {
    allTargets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -30px 0px",
      threshold: 0.08
    }
  );

  const startObserving = () => {
    allTargets.forEach((el) => observer.observe(el));
  };

  if (!isEnvelopePresent) {
    setTimeout(startObserving, 120);
  } else {
    window.addEventListener(
      "envelopeOpened",
      () => {
        setTimeout(startObserving, 250);
      },
      { once: true }
    );
  }
});
