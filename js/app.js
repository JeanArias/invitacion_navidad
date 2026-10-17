(function () {
  "use strict";

  var EVENT_DATE = new Date("2026-11-28T19:00:00-06:00");
  var AUDIO_START = 13;
  var PLACE = "XX54+GR San Vicente, San José";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };

  var audio = $("bgm");
  var soundBtn = $("soundBtn");
  var cover = $("inicio");

  // Enlaces de mapa
  var q = encodeURIComponent(PLACE);
  $("mapsLink").href = "https://www.google.com/maps/search/?api=1&query=" + q;
  $("wazeLink").href = "https://waze.com/ul?q=" + q + "&navigate=yes";

  // Audio: el segmento 13s -> fin se repite desde el segundo 13
  audio.loop = false;
  audio.addEventListener("ended", function () {
    audio.currentTime = AUDIO_START;
    audio.play().catch(function () {});
  });

  function setSoundUI(on) {
    soundBtn.setAttribute("aria-pressed", String(on));
    soundBtn.setAttribute("aria-label", on ? "Música activada. Silenciar" : "Música desactivada. Activar música");
    $("soundLabel").textContent = on ? "ON" : "OFF";
  }

  function playAudio() {
    var start = function () {
      if (audio.currentTime < AUDIO_START) audio.currentTime = AUDIO_START;
      return audio.play();
    };
    audio.preload = "auto";
    if (audio.readyState >= 1) {
      return start();
    }
    return new Promise(function (resolve, reject) {
      audio.addEventListener("loadedmetadata", function () { start().then(resolve, reject); }, { once: true });
      audio.load();
    });
  }

  function toggleSound() {
    if (audio.paused) {
      playAudio().then(function () { setSoundUI(true); }).catch(function () { setSoundUI(false); });
    } else {
      audio.pause();
      setSoundUI(false);
    }
  }
  soundBtn.addEventListener("click", toggleSound);
  setSoundUI(false);

  // Tap to open
  var opened = false;
  $("openBtn").addEventListener("click", function () {
    if (opened) return;
    opened = true;
    cover.classList.add("is-open");
    playAudio().then(function () { setSoundUI(true); }).catch(function () { setSoundUI(false); });
    setTimeout(function () {
      document.body.classList.remove("is-locked");
      $("bienvenida").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      cover.hidden = true;
    }, reduceMotion ? 0 : 1100);
  });

  // Revelado al hacer scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.18 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Nieve ligera
  if (!reduceMotion) {
    var snow = $("snow");
    for (var i = 0; i < 22; i++) {
      var f = document.createElement("i");
      var s = 3 + Math.random() * 5;
      f.className = "flake";
      f.style.cssText = "left:" + Math.random() * 100 + "%;width:" + s + "px;height:" + s + "px;" +
        "animation-duration:" + (9 + Math.random() * 10) + "s;animation-delay:-" + Math.random() * 15 + "s;" +
        "--drift:" + (Math.random() * 60 - 30) + "px;opacity:" + (0.4 + Math.random() * 0.5);
      snow.appendChild(f);
    }
  }

  // Cuenta regresiva
  var pad = function (n) { return String(n).padStart(2, "0"); };
  function tick() {
    var diff = EVENT_DATE - Date.now();
    if (diff <= 0) {
      $("countdown").hidden = true;
      $("cd-msg").hidden = false;
      return;
    }
    var s = Math.floor(diff / 1000);
    $("cd-d").textContent = Math.floor(s / 86400);
    $("cd-h").textContent = pad(Math.floor(s % 86400 / 3600));
    $("cd-m").textContent = pad(Math.floor(s % 3600 / 60));
    $("cd-s").textContent = pad(s % 60);
    setTimeout(tick, 1000 - (Date.now() % 1000));
  }
  tick();

  // Formularios
  function setStatus(form, msg, kind) {
    var el = form.querySelector(".status");
    el.textContent = msg;
    el.className = "status" + (kind ? " is-" + kind : "");
  }

  function wireForm(form, endpoint, build, okMsg) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var bad = null;
      form.querySelectorAll("[required]").forEach(function (f) {
        var invalid = !f.value.trim();
        f.setAttribute("aria-invalid", String(invalid));
        if (invalid && !bad) bad = f;
      });
      if (bad) { setStatus(form, "Por favor completa los campos obligatorios.", "error"); bad.focus(); return; }

      var cfg = window.INVITACION_CONFIG || {};
      if (!cfg.apiUrl) { setStatus(form, "El envío aún no está configurado. Inténtalo más tarde.", "error"); return; }

      var btn = form.querySelector("button[type=submit]");
      var label = btn.textContent;
      btn.disabled = true; btn.textContent = "Enviando…";
      setStatus(form, "", "");

      fetch(cfg.apiUrl.replace(/\/$/, "") + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(build(new FormData(form)))
      }).then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        setStatus(form, okMsg, "ok");
        form.reset();
      }).catch(function () {
        setStatus(form, "No pudimos enviar tu respuesta. Revisa tu conexión e inténtalo de nuevo.", "error");
      }).then(function () {
        btn.disabled = false; btn.textContent = label;
      });
    });
  }

  var val = function (fd, k) { return String(fd.get(k) || "").trim(); };

  wireForm($("rsvpForm"), "/rsvp", function (fd) {
    return {
      nombre: val(fd, "nombre"),
      acompanantes: parseInt(val(fd, "acompanantes"), 10) || 0,
      nombres_acompanantes: val(fd, "nombres_acompanantes"),
      website: val(fd, "website")
    };
  }, "¡Gracias! Tu asistencia quedó confirmada. Te esperamos.");
})();
