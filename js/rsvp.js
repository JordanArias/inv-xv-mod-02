/**
 * ==========================================================================
 * RSVP.JS - CONFIRMACIÓN DE ASISTENCIA (WHATSAPP Y FORMULARIO CON OPCIONES)
 * MIS XV AÑOS XIMENA (MODELO 01)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-rsvp-form-btn");
  const formEl = document.getElementById("rsvp-online-form");
  const chevron = document.getElementById("form-chevron-icon");
  const whatsappBtn = document.getElementById("whatsapp-rsvp-btn");
  const toast = document.getElementById("copy-toast");

  const cfg = window.XV_CONFIG || window.WEDDING_CONFIG;

  // Configurar enlace directo de WhatsApp
  if (whatsappBtn && cfg) {
    const phone = cfg.whatsapp?.telefono || "";
    const msg = encodeURIComponent(
      cfg.whatsapp?.mensajePredefinido ||
        "¡Hola Ximena! Confirmo con mucha alegría mi asistencia a tus XV Años."
    );
    whatsappBtn.href = `https://wa.me/${phone}?text=${msg}`;
  }

  // Alternar visibilidad del formulario en línea con rotación del icono chevron
  if (toggleBtn && formEl) {
    toggleBtn.addEventListener("click", () => {
      const isHidden = formEl.classList.contains("hidden");
      if (isHidden) {
        formEl.classList.remove("hidden");
        if (chevron) chevron.style.transform = "rotate(180deg)";
      } else {
        formEl.classList.add("hidden");
        if (chevron) chevron.style.transform = "rotate(0deg)";
      }
    });
  }

  // Manejo del envío del formulario en línea
  if (formEl) {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("guest-name");
      const passesSelect = document.getElementById("guest-passes");
      const attendSelect = document.getElementById("guest-attending");
      const messageInput = document.getElementById("guest-message");

      const guestName = nameInput ? nameInput.value.trim() : "";
      const passes = passesSelect ? passesSelect.value : "2";
      const attending =
        attendSelect && attendSelect.value === "si"
          ? "¡Sí, ahí estaré!"
          : "Lo siento, no podré asistir";
      const customMsg = messageInput ? messageInput.value.trim() : "";

      const quinceName = cfg?.quinceanera?.nombre || "Ximena";
      const phone = cfg?.whatsapp?.telefono || "";

      let fullMessage = `*CONFIRMACIÓN DE ASISTENCIA - MIS XV AÑOS ${quinceName.toUpperCase()}*\n\n`;
      fullMessage += `👤 *Invitado / Familia:* ${guestName}\n`;
      fullMessage += `🎟️ *Pases:* ${passes} persona(s)\n`;
      fullMessage += `✨ *Respuesta:* ${attending}\n`;
      if (customMsg) {
        fullMessage += `💌 *Mensaje para ${quinceName}:* ${customMsg}\n`;
      }

      if ("vibrate" in navigator) {
        try {
          navigator.vibrate(30);
        } catch (_) {}
      }

      if (toast) {
        toast.textContent = "✨ ¡Confirmación preparada! Abriendo WhatsApp...";
        toast.classList.add("show");
        setTimeout(() => {
          toast.classList.remove("show");
        }, 3000);
      }

      const url = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
      setTimeout(() => {
        window.open(url, "_blank");
      }, 700);
    });
  }
});
