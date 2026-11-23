/**
 * ==========================================================================
 * MUSIC.JS - REPRODUCTOR INTEGRADO EN PORTADA ("DALE PLAY") Y BOTÓN FLOTANTE
 * MIS XV AÑOS XIMENA (MODELO 01)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("wedding-music");
  if (!audio) return;

  // Controles en el Reproductor del Hero ("DALE PLAY")
  const playerPlayBtn = document.getElementById("player-play-btn");
  const playerPlayIcon = document.getElementById("player-play-icon");
  const playerPrevBtn = document.getElementById("player-prev-btn");
  const playerNextBtn = document.getElementById("player-next-btn");
  const playerRepeatBtn = document.getElementById("player-repeat-btn");
  const playerShuffleBtn = document.getElementById("player-shuffle-btn");
  const progressBar = document.getElementById("player-progress-bar");
  const progressFill = document.getElementById("player-progress-fill");
  const currentTimeEl = document.getElementById("player-current-time");
  const totalTimeEl = document.getElementById("player-total-time");

  // Botón flotante inferior derecho
  const floatingBtn = document.getElementById("floating-music-btn");

  audio.volume = 0.8;

  const formatTime = (sec) => {
    if (!isFinite(sec) || sec < 0) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  const syncUI = (isPlaying) => {
    if (playerPlayIcon) {
      if (isPlaying) {
        playerPlayIcon.classList.remove("fa-play");
        playerPlayIcon.classList.add("fa-pause");
      } else {
        playerPlayIcon.classList.remove("fa-pause");
        playerPlayIcon.classList.add("fa-play");
      }
    }

    if (floatingBtn) {
      floatingBtn.classList.toggle("is-playing", isPlaying);
      floatingBtn.classList.toggle("is-paused", !isPlaying);
      floatingBtn.setAttribute("title", isPlaying ? "Pausar música" : "Reproducir música");
    }
  };

  const playMusic = () => {
    audio
      .play()
      .then(() => syncUI(true))
      .catch((err) => {
        console.log("Reproducción en espera de interacción:", err);
      });
  };

  const toggleMusic = (e) => {
    if (e) e.stopPropagation();
    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
      syncUI(false);
    }
  };

  // Evento disparado al abrir el sobre
  window.addEventListener("requestPlayMusic", () => {
    if (audio.paused) {
      playMusic();
    }
  });

  if (playerPlayBtn) playerPlayBtn.addEventListener("click", toggleMusic);
  if (floatingBtn) floatingBtn.addEventListener("click", toggleMusic);

  if (playerPrevBtn) {
    playerPrevBtn.addEventListener("click", () => {
      audio.currentTime = 0;
      if (audio.paused) playMusic();
    });
  }

  if (playerNextBtn) {
    playerNextBtn.addEventListener("click", () => {
      audio.currentTime = 0;
      if (audio.paused) playMusic();
    });
  }

  if (playerRepeatBtn) {
    playerRepeatBtn.addEventListener("click", () => {
      audio.loop = !audio.loop;
      playerRepeatBtn.classList.toggle("active", audio.loop);
    });
  }

  if (playerShuffleBtn) {
    playerShuffleBtn.addEventListener("click", () => {
      playerShuffleBtn.classList.toggle("active");
    });
  }

  audio.addEventListener("loadedmetadata", () => {
    if (totalTimeEl && audio.duration) {
      totalTimeEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener("timeupdate", () => {
    if (currentTimeEl) {
      currentTimeEl.textContent = formatTime(audio.currentTime);
    }
    if (progressFill && audio.duration) {
      const pct = Math.min(100, Math.max(0, (audio.currentTime / audio.duration) * 100));
      progressFill.style.width = `${pct}%`;
    }
  });

  if (progressBar) {
    progressBar.addEventListener("click", (e) => {
      if (!audio.duration) return;
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.min(1, Math.max(0, clickX / rect.width));
      audio.currentTime = ratio * audio.duration;
    });
  }
});
