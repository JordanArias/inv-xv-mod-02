/**
 * ==========================================================================
 * COUNTDOWN.JS - CUENTA REGRESIVA DINÁMICA Y ENLACE A GOOGLE CALENDAR
 * MIS XV AÑOS XIMENA (MODELO 01)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.XV_CONFIG || window.WEDDING_CONFIG;
  const configDate = cfg?.fecha?.fechaHoraISO || "2026-11-24T18:00:00-04:00";
  const targetDate = new Date(configDate);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  let countdownInterval = null;

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    // Si la fecha configurada ya llegó o pasó, quedar en 00 sin reiniciar
    if (diff <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => (n < 10 ? "0" + n : n.toString());

    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  }

  updateCountdown();
  if (targetDate.getTime() > Date.now()) {
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  // Configurar enlace dinámico a Google Calendar
  const calendarBtn = document.getElementById("google-calendar-btn");
  if (calendarBtn && cfg) {
    const quinceName = cfg.quinceanera?.nombre || "Ximena";
    const title = encodeURIComponent(`Mis XV Años - ${quinceName}`);
    const details = encodeURIComponent(
      `¡Acompáñame a celebrar mis XV Años! Misa de Agradecimiento: ${cfg.ceremonia.lugar} (${cfg.ceremonia.hora}). Recepción: ${cfg.recepcion.lugar} (${cfg.recepcion.hora}).`
    );
    const location = encodeURIComponent(
      `${cfg.ceremonia.lugar} / ${cfg.recepcion.lugar}`
    );
    const toCal = (iso) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
    const endISO = cfg.fecha?.fechaFinISO || new Date(targetDate.getTime() + 8 * 3600 * 1000).toISOString();
    const dates = `${toCal(configDate)}/${toCal(endISO)}`;
    calendarBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  }
});
