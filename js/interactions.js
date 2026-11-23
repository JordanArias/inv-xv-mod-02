/**
 * ==========================================================================
 * INTERACTIONS.JS - MAPAS, REGALOS DESPLEGABLES, COPIADO DE CUENTA Y PLAYLIST
 * MIS XV AÑOS CANDELA (MODELO 02 - ACUARELA LILA & VIOLETA)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.XV_CONFIG || window.WEDDING_CONFIG;
  const toast = document.getElementById("copy-toast");

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  };

  if (cfg) {
    // Enlaces a Google Maps (Misa, Recepción y Franja de Fecha)
    const churchBtn = document.getElementById("church-map-btn");
    if (churchBtn && cfg.ceremonia?.mapsUrl) {
      churchBtn.href = cfg.ceremonia.mapsUrl;
    }

    const receptionBtn = document.getElementById("reception-map-btn");
    if (receptionBtn && cfg.recepcion?.mapsUrl) {
      receptionBtn.href = cfg.recepcion.mapsUrl;
    }

    const bandLocationBtn = document.getElementById("band-location-btn");
    if (bandLocationBtn && cfg.recepcion?.mapsUrl) {
      bandLocationBtn.href = cfg.recepcion.mapsUrl;
    }
  }

  // 1. Botón "ACCESO A REGALO" (despliega / oculta tarjeta bancaria y QR)
  const toggleGiftBtn = document.getElementById("toggle-gift-details-btn");
  const giftDetailsPanel = document.getElementById("gift-details-panel");
  if (toggleGiftBtn && giftDetailsPanel) {
    toggleGiftBtn.addEventListener("click", () => {
      const isHidden = giftDetailsPanel.classList.contains("hidden");
      giftDetailsPanel.classList.toggle("hidden", !isHidden);
    });
  }

  // 2. Botón para copiar el número de cuenta bancaria
  const copyBankBtn = document.getElementById("copy-account-btn");
  if (copyBankBtn) {
    copyBankBtn.addEventListener("click", () => {
      const accountNumber =
        cfg?.regalos?.transferencia?.numeroCuenta ||
        document.getElementById("bank-account-number")?.textContent?.trim() ||
        "123-4567890";

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(accountNumber)
          .then(() => {
            showToast(`✨ ¡Cuenta ${accountNumber} copiada al portapapeles!`);
          })
          .catch(() => {
            showToast(`✨ Nº de cuenta: ${accountNumber}`);
          });
      } else {
        showToast(`✨ Nº de cuenta: ${accountNumber}`);
      }
    });
  }

  // 3. Sección "¡REVIVE MI DÍA! TU TEMA FAVORITO" - Sugerir canción por WhatsApp
  const toggleSongBtn = document.getElementById("toggle-song-form-btn");
  const songForm = document.getElementById("song-suggest-form");
  if (toggleSongBtn && songForm) {
    toggleSongBtn.addEventListener("click", () => {
      songForm.classList.toggle("hidden");
      const input = document.getElementById("song-title-input");
      if (!songForm.classList.contains("hidden") && input) {
        input.focus();
      }
    });

    songForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const songInput = document.getElementById("song-title-input");
      const songValue = songInput ? songInput.value.trim() : "";
      if (!songValue) return;

      const phone = cfg?.whatsapp?.telefono || "";
      const baseMsg =
        cfg?.whatsapp?.mensajeCancion ||
        `¡Hola ${cfg?.quinceanera?.nombre || "Candela"}! Para tu fiesta de XV Años sugiero la canción:`;
      const fullText = `${baseMsg} 🎶 *${songValue}*`;

      showToast("🎶 ¡Preparando tu sugerencia musical en WhatsApp!");
      setTimeout(() => {
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(fullText)}`, "_blank");
      }, 600);
    });
  }
});
