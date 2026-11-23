/**
 * ==========================================================================
 * RENDER.JS - INYECTA FECHA, CALENDARIO Y HORAS DESDE JS/CONFIG.JS
 * MIS XV AÑOS CANDELA (MODELO 02 - ACUARELA LILA & VIOLETA)
 * ==========================================================================
 */
(function () {
  const cfg = window.XV_CONFIG;
  if (!cfg) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const text = (sel, value) => {
    if (value) $$(sel).forEach((el) => (el.textContent = value));
  };
  const f = cfg.fecha;

  // ---- Nombre y Fecha en Sobre, Franja Violeta, Calendario y Cierre ----
  text(".envelope-main-names, .letter-couple-title, .xv-quince-name, .xv-final-name", cfg.quinceanera?.nombre);
  text(".letter-date-main", f.fechaPuntos);
  text(".xv-final-sub", `Mis XV Años · ${f.fechaPuntos}`);
  text(".xv-band-month", f.mesNombreUpper);
  const pills = $$(".xv-date-side-pill");
  if (pills[0]) pills[0].textContent = f.diaSemanaUpper;
  if (pills[1]) pills[1].textContent = f.anio;
  text(".xv-date-center-number", f.diaNumero);
  text(".xv-calendar-month-script", f.mesNombre);

  // ---- Calendario mensual (semana inicia en lunes) ----
  const table = $(".xv-calendar-table");
  if (table) {
    const year = +f.anio, month = f.mesIndice, day = +f.diaNumero;
    table.setAttribute("aria-label", `Calendario de ${f.mesNombre} ${f.anio}`);
    const offset = (new Date(year, month, 1).getDay() + 6) % 7;
    const total = new Date(year, month + 1, 0).getDate();
    const cells = Array(offset).fill("<td></td>");
    for (let d = 1; d <= total; d++) {
      cells.push(
        d === day
          ? `<td><span class="xv-calendar-highlight">${d}</span></td>`
          : `<td>${d}</td>`
      );
    }
    while (cells.length % 7) cells.push("<td></td>");
    let rows = "";
    for (let i = 0; i < cells.length; i += 7) {
      rows += `<tr>${cells.slice(i, i + 7).join("")}</tr>`;
    }
    const tbody = $("tbody", table);
    if (tbody) tbody.innerHTML = rows;
  }

  // ---- Horas (misa, fiesta/recepción e itinerario) ----
  $$(".xv-event-time-val").forEach((el, i) => {
    const ev = [cfg.ceremonia, cfg.recepcion][i];
    if (ev?.hora) el.textContent = ev.hora;
  });
  const times = $$(".xv-timeline-item .xv-timeline-time");
  (cfg.itinerario || []).forEach((hora, i) => {
    if (times[i] && hora) times[i].textContent = hora;
  });
})();
