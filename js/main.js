(function () {
  // 0. Unified Dark / Light Theme Switcher
  const rootEl = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-toggle-icon");

  const sunSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
  const moonSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

  function applyTheme(mode) {
    const isLight = mode === "light";
    rootEl.classList.toggle("light", isLight);
    rootEl.classList.toggle("dark", !isLight);
    const metaTheme = document.getElementById("meta-theme-color");
    if (metaTheme) metaTheme.setAttribute("content", isLight ? "#F4F4F5" : "#09090B");
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
    }
    if (themeIcon) themeIcon.innerHTML = isLight ? moonSvg : sunSvg;
  }

  try {
    const paramTheme = new URLSearchParams(window.location.search).get("theme");
    const saved = localStorage.getItem("centris-landing-theme");
    if (paramTheme === "light" || paramTheme === "dark") applyTheme(paramTheme);
    else if (saved === "light" || saved === "dark") applyTheme(saved);
  } catch (e) {}

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      const next = rootEl.classList.contains("light") ? "dark" : "light";
      applyTheme(next);
      try {
        localStorage.setItem("centris-landing-theme", next);
      } catch (e) {}
    });
  }

  // 1. Mobile navigation drawer (with Escape key, outside click, and desktop breakpoint reset)
  const menuBtn = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const siteHeader = document.querySelector(".site-header");

  function closeMobileDrawer(restoreFocus) {
    if (!menuBtn || !drawer || drawer.hidden) return;
    menuBtn.setAttribute("aria-expanded", "false");
    drawer.hidden = true;
    if (restoreFocus) menuBtn.focus();
  }

  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", function () {
      const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!isOpen));
      drawer.hidden = isOpen;
    });
    drawer.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileDrawer(false);
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !drawer.hidden) {
        closeMobileDrawer(true);
      }
    });
    document.addEventListener("click", function (e) {
      if (!drawer.hidden && siteHeader && !siteHeader.contains(e.target)) {
        closeMobileDrawer(false);
      }
    });
    if (window.matchMedia) {
      window.matchMedia("(min-width: 1024px)").addEventListener("change", function (e) {
        if (e.matches) closeMobileDrawer(false);
      });
    }
  }

  // Helper: WAI-ARIA Tablist roving tabindex and keyboard navigation (ArrowLeft/ArrowRight/Home/End)
  function bindTablistKeyboard(tabNodeList, activateAtIndex) {
    const tabs = Array.prototype.slice.call(tabNodeList);
    tabs.forEach(function (tab, idx) {
      tab.addEventListener("keydown", function (e) {
        let nextIdx = null;
        if (e.key === "ArrowRight") nextIdx = (idx + 1) % tabs.length;
        else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") nextIdx = 0;
        else if (e.key === "End") nextIdx = tabs.length - 1;
        if (nextIdx !== null) {
          e.preventDefault();
          activateAtIndex(nextIdx, true);
        }
      });
    });
  }

  function flashElement(el) {
    if (!el) return;
    el.classList.remove("is-flashing");
    void el.offsetWidth;
    el.classList.add("is-flashing");
  }

  const reducedMotionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  let reducedMotion = reducedMotionQuery ? reducedMotionQuery.matches : false;
  if (reducedMotionQuery && reducedMotionQuery.addEventListener) {
    reducedMotionQuery.addEventListener("change", function (e) {
      reducedMotion = e.matches;
      if (reducedMotion) {
        document.querySelectorAll("[data-reveal]").forEach(function (el) {
          el.setAttribute("data-reveal", "shown");
        });
      }
    });
  }
  let emitTelemetryPulse = function () {};

  // 2. Hero cockpit tabs with View Transitions API + clean fallback
  const cockpitTabs = document.querySelectorAll(".cockpit-tab");
  const cockpitPanels = document.querySelectorAll(".cockpit-panel");
  const cockpitBody = document.querySelector(".cockpit-body");
  let activeCockpitVT = null;

  function applyCockpitTabDOM(activeIdx, moveFocus, useCssSwitchAnim) {
    cockpitTabs.forEach(function (t, i) {
      const isSelected = i === activeIdx;
      t.setAttribute("aria-selected", String(isSelected));
      t.setAttribute("tabindex", isSelected ? "0" : "-1");
      if (isSelected && moveFocus) t.focus();
    });
    const activeTab = cockpitTabs[activeIdx];
    const targetId = activeTab ? activeTab.getAttribute("aria-controls") : null;
    cockpitPanels.forEach(function (p) {
      const isTarget = p.id === targetId;
      p.hidden = !isTarget;
      if (isTarget && useCssSwitchAnim) {
        p.classList.remove("is-switching");
        void p.offsetWidth;
        p.classList.add("is-switching");
      } else {
        p.classList.remove("is-switching");
      }
    });
  }

  function activateCockpitTab(idx, moveFocus) {
    const total = cockpitTabs.length;
    if (!total) return;
    const activeIdx = (idx + total) % total;
    const currentSelected = document.querySelector('.cockpit-tab[aria-selected="true"]');
    if (currentSelected === cockpitTabs[activeIdx]) {
      if (moveFocus) cockpitTabs[activeIdx].focus();
      return;
    }

    emitTelemetryPulse("mint");

    if (
      cockpitBody &&
      typeof document.startViewTransition === "function" &&
      !reducedMotion
    ) {
      if (activeCockpitVT && typeof activeCockpitVT.skipTransition === "function") {
        try { activeCockpitVT.skipTransition(); } catch (e) {}
      }
      cockpitBody.style.viewTransitionName = "cockpit-panel";
      const vt = document.startViewTransition(function () {
        applyCockpitTabDOM(activeIdx, moveFocus, false);
      });
      activeCockpitVT = vt;
      vt.finished.catch(function () {}).finally(function () {
        if (activeCockpitVT === vt) {
          cockpitBody.style.viewTransitionName = "";
          activeCockpitVT = null;
        }
      });
      return;
    }

    applyCockpitTabDOM(activeIdx, moveFocus, true);
  }

  cockpitTabs.forEach(function (tab, idx) {
    tab.addEventListener("click", function () {
      activateCockpitTab(idx, false);
    });
  });
  bindTablistKeyboard(cockpitTabs, activateCockpitTab);

  // 3 & 4. Unified capacity + athlete phone simulation (Sofía Peralta across Tab 1 & Tab 3)
  const simFeedback = document.getElementById("sim-feedback");
  const sofiaCreditsEl = document.getElementById("sofia-credits");
  const sofiaStatusEl = document.getElementById("sofia-booking-status");
  const athleteBtn = document.getElementById("athlete-book-btn");
  const athleteCredits = document.getElementById("athlete-credits-count");
  const athleteSub = document.getElementById("athlete-booking-sub");
  const athleteFeedback = document.getElementById("athlete-sim-feedback");
  const baseSofiaCredits = 2;
  const baseCounts = { funcional: 14, oly: 9 };
  const bookedState = { funcional: false, oly: false };

  function syncClassRowUI(id) {
    const btn = document.querySelector('[data-sim-toggle="' + id + '"]');
    const row = btn ? btn.closest(".class-row") : null;
    if (!btn || !row) return { booked: 0, cap: 0, title: "Clase" };
    const cap = Number(row.getAttribute("data-cap"));
    const isBooked = Boolean(bookedState[id]);
    const booked = (baseCounts[id] || 0) + (isBooked ? 1 : 0);
    const label = row.querySelector("[data-cap-label]");
    const badge = row.querySelector("[data-status-badge]");
    const title = row.querySelector(".class-meta-title")?.textContent || "Clase";

    row.setAttribute("data-booked", String(booked));
    if (label) {
      label.textContent = booked + "/" + cap;
      flashElement(label);
    }
    btn.textContent = isBooked ? "Cancelar reserva" : "Anotar a Sofía";
    btn.classList.toggle("is-primary", !isBooked);

    if (badge) {
      if (booked >= cap) {
        badge.className = "badge badge-coral";
        badge.textContent = "Completo";
      } else if (cap - booked <= 2) {
        badge.className = "badge badge-amber";
        badge.textContent = "Últimos lugares";
      } else {
        badge.className = "badge badge-mint";
        badge.textContent = "Con lugar";
      }
      flashElement(badge);
    }
    return { booked: booked, cap: cap, title: title };
  }

  function syncSofiaAllViews() {
    const used = (bookedState.funcional ? 1 : 0) + (bookedState.oly ? 1 : 0);
    const remaining = Math.max(0, baseSofiaCredits - used);

    if (sofiaCreditsEl) {
      sofiaCreditsEl.textContent = remaining + " / 3";
      sofiaCreditsEl.classList.toggle("is-updated", used > 0);
      flashElement(sofiaCreditsEl);
    }
    if (sofiaStatusEl) {
      if (used === 0) {
        sofiaStatusEl.textContent = "Habilitada (2 créditos libres)";
      } else if (used === 1) {
        const turn = bookedState.funcional ? "18:00" : "20:00";
        sofiaStatusEl.textContent = "Anotada hoy " + turn + " (queda 1 crédito)";
      } else {
        sofiaStatusEl.textContent = "Anotada 18:00 y 20:00 (0 créditos libres)";
      }
    }

    if (athleteCredits) {
      athleteCredits.textContent = remaining + " / 3";
      athleteCredits.classList.toggle("is-updated", used > 0);
      flashElement(athleteCredits);
    }
    if (athleteSub) {
      athleteSub.textContent = bookedState.funcional
        ? "Reservado (queda 1 de 16 cupos) · Cancelación sin cargo hasta 16:00"
        : "Quedan 2 de 16 cupos · Cancelación sin cargo hasta 16:00";
    }
    if (athleteBtn) {
      athleteBtn.textContent = bookedState.funcional ? "Cancelar en término" : "Reservar lugar";
      athleteBtn.classList.toggle("is-primary", !bookedState.funcional);
    }
  }

  document.querySelectorAll("[data-sim-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = btn.getAttribute("data-sim-toggle");
      if (!id || !(id in bookedState)) return;
      bookedState[id] = !bookedState[id];
      const info = syncClassRowUI(id);
      syncSofiaAllViews();
      const used = (bookedState.funcional ? 1 : 0) + (bookedState.oly ? 1 : 0);
      const remaining = Math.max(0, baseSofiaCredits - used);

      if (simFeedback) {
        if (bookedState[id]) {
          simFeedback.innerHTML = "<strong>Sofía Peralta anotada en " + info.title + ":</strong> el cupo pasó a " + info.booked + "/" + info.cap + " y sus créditos semanales bajaron a " + remaining + "/3 (sin bloqueo por saldo pendiente).";
        } else {
          simFeedback.innerHTML = "<strong>Reserva de Sofía cancelada en término:</strong> se liberó el lugar en " + info.title + " (" + info.booked + "/" + info.cap + ") y volvió su crédito semanal (" + remaining + "/3).";
        }
      }
      emitTelemetryPulse(bookedState[id] ? "volt" : "mint");
      if (id === "funcional" && athleteFeedback) {
        athleteFeedback.innerHTML = bookedState.funcional
          ? "<strong>Sincronizado con mostrador:</strong> 18:00 Funcional quedó en 15/16 cupos y Sofía tiene " + remaining + "/3 créditos disponibles."
          : "<strong>Cancelación sincronizada:</strong> el lugar en 18:00 Funcional volvió a 14/16 y Sofía tiene " + remaining + "/3 créditos disponibles.";
      }
    });
  });

  if (athleteBtn) {
    athleteBtn.addEventListener("click", function () {
      bookedState.funcional = !bookedState.funcional;
      const info = syncClassRowUI("funcional");
      syncSofiaAllViews();
      const used = (bookedState.funcional ? 1 : 0) + (bookedState.oly ? 1 : 0);
      const remaining = Math.max(0, baseSofiaCredits - used);

      emitTelemetryPulse(bookedState.funcional ? "volt" : "mint");
      if (athleteFeedback) {
        athleteFeedback.innerHTML = bookedState.funcional
          ? "<strong>Lugar reservado desde el celular:</strong> 18:00 Funcional quedó en " + info.booked + "/" + info.cap + " cupos y descontó 1 crédito semanal (" + remaining + "/3)."
          : "<strong>Cancelación antes de las 16:00:</strong> el crédito regresó al instante (" + remaining + "/3) y el cupo volvió a " + info.booked + "/" + info.cap + ".";
      }
      if (simFeedback) {
        simFeedback.innerHTML = bookedState.funcional
          ? "<strong>Reserva desde el celular de Sofía:</strong> 18:00 Funcional pasó a " + info.booked + "/" + info.cap + " en la grilla de recepción (" + remaining + "/3 créditos)."
          : "<strong>Cancelación desde el celular de Sofía:</strong> 18:00 Funcional volvió a " + info.booked + "/" + info.cap + " en recepción (" + remaining + "/3 créditos).";
      }
    });
  }

  // 5. #operacion Horizontal Slider + Interactive Rule Demos
  const opsRail = document.getElementById("ops-rail");
  const opsTrack = document.getElementById("ops-track");
  const opsPillarBtns = document.querySelectorAll(".ops-pillar-btn");
  const opsSlides = document.querySelectorAll(".ops-slide");
  const opsPrev = document.getElementById("ops-prev");
  const opsNext = document.getElementById("ops-next");
  const opsCounter = document.getElementById("ops-counter");
  let currentOps = 0;
  const totalOps = opsPillarBtns.length;

  function setOpsSlide(idx, moveFocus) {
    currentOps = (idx + totalOps) % totalOps;
    if (opsTrack) {
      opsTrack.style.transform = "translateX(-" + (currentOps * 100) + "%)";
    }
    opsPillarBtns.forEach(function (b, i) {
      const isSelected = i === currentOps;
      b.setAttribute("aria-selected", String(isSelected));
      b.setAttribute("tabindex", isSelected ? "0" : "-1");
      if (isSelected) {
        if (moveFocus) b.focus();
        if (opsRail && opsRail.scrollWidth > opsRail.clientWidth) {
          const targetLeft = Math.max(0, b.offsetLeft - (opsRail.clientWidth - b.offsetWidth) / 2);
          opsRail.scrollTo({ left: targetLeft, behavior: reducedMotion ? "auto" : "smooth" });
        }
      }
    });
    opsSlides.forEach(function (slide, i) {
      const isInactive = i !== currentOps;
      slide.setAttribute("aria-hidden", String(isInactive));
      if (isInactive) {
        slide.setAttribute("inert", "");
        slide.inert = true;
      } else {
        slide.removeAttribute("inert");
        slide.inert = false;
      }
    });
    if (opsCounter) opsCounter.textContent = (currentOps + 1) + " / " + totalOps;
  }

  opsPillarBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setOpsSlide(Number(btn.getAttribute("data-ops-index")), false);
    });
  });
  bindTablistKeyboard(opsPillarBtns, setOpsSlide);
  if (opsPrev) opsPrev.addEventListener("click", function () { setOpsSlide(currentOps - 1, false); });
  if (opsNext) opsNext.addEventListener("click", function () { setOpsSlide(currentOps + 1, false); });

  // Mini-sim 1: Suspensión de clase
  const suspendBtn = document.getElementById("ops-suspend-btn");
  const classBadge = document.getElementById("ops-class-badge");
  const suspendMsg = document.getElementById("ops-suspend-msg");
  let suspended = false;
  if (suspendBtn && classBadge && suspendMsg) {
    suspendBtn.addEventListener("click", function () {
      suspended = !suspended;
      if (suspended) {
        classBadge.className = "badge badge-coral";
        classBadge.textContent = "Cancelada · 0/16";
        suspendBtn.textContent = "Restablecer simulación";
        suspendMsg.textContent = "14 reservas canceladas y 14 créditos devueltos automáticamente.";
      } else {
        classBadge.className = "badge badge-mint";
        classBadge.textContent = "Programada · 14/16";
        suspendBtn.textContent = "Simular suspensión de clase";
        suspendMsg.textContent = "14 atletas anotados con crédito consumido.";
      }
      flashElement(classBadge);
    });
  }

  // Mini-sim 2: Baja anticipada
  const bajaBtn = document.getElementById("ops-baja-btn");
  const memBadge = document.getElementById("ops-mem-badge");
  const futureTag = document.getElementById("ops-future-tag");
  const bajaMsg = document.getElementById("ops-baja-msg");
  let bajaDone = false;
  if (bajaBtn && memBadge && futureTag && bajaMsg) {
    bajaBtn.addEventListener("click", function () {
      bajaDone = !bajaDone;
      if (bajaDone) {
        memBadge.className = "badge badge-coral";
        memBadge.textContent = "Baja anticipada · 0 futuras";
        futureTag.className = "badge badge-zinc";
        futureTag.textContent = "Sin vigencia siguiente";
        bajaBtn.textContent = "Restablecer simulación";
        bajaMsg.textContent = "Se cancelaron las 3 reservas posteriores y esos 3 lugares volvieron a la grilla.";
      } else {
        memBadge.className = "badge badge-mint";
        memBadge.textContent = "3 reservas futuras";
        futureTag.className = "badge badge-amber";
        futureTag.textContent = "Renovación encadenada";
        bajaBtn.textContent = "Simular baja anticipada";
        bajaMsg.textContent = "Las reservas posteriores se cancelan y liberan cupo al instante.";
      }
      flashElement(memBadge);
      flashElement(futureTag);
    });
  }

  // Mini-sim 3: Coach attendance toggle (with status feedback)
  const opsAttMsg = document.getElementById("ops-att-msg");
  document.querySelectorAll(".att-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const rowId = btn.getAttribute("data-att-row");
      const athlete = btn.getAttribute("data-athlete") || "Atleta";
      const state = btn.getAttribute("data-state") === "presente" ? "Presente" : "Ausente";
      document.querySelectorAll('.att-btn[data-att-row="' + rowId + '"]').forEach(function (peer) {
        peer.setAttribute("aria-pressed", String(peer === btn));
      });
      flashElement(btn);
      if (opsAttMsg) {
        opsAttMsg.textContent = athlete + " marcado como " + state + " · editable durante las próximas 18h 20m.";
      }
    });
  });

  // Mini-sim 4: Caja immutable audit simulation
  const auditBtn = document.getElementById("ops-audit-btn");
  const auditRow1 = document.getElementById("ops-audit-row-1");
  const auditSub1 = document.getElementById("ops-audit-sub-1");
  const auditTag1 = document.getElementById("ops-audit-tag-1");
  const auditRow2 = document.getElementById("ops-audit-row-2");
  const auditMsg = document.getElementById("ops-audit-msg");
  let auditSimulated = false;
  if (auditBtn && auditRow1 && auditSub1 && auditTag1 && auditRow2 && auditMsg) {
    auditBtn.addEventListener("click", function () {
      auditSimulated = !auditSimulated;
      if (auditSimulated) {
        auditRow1.classList.add("is-voided");
        auditSub1.textContent = 'Motivo anulación: "Importe duplicado en mostrador"';
        auditTag1.className = "badge badge-coral";
        auditTag1.textContent = "Anulado (Admin)";
        auditRow2.hidden = false;
        auditBtn.textContent = "Restablecer simulación";
        auditMsg.textContent = "El cobro #1041 quedó anulado con motivo y autoría, y se asentó #1042 firme.";
        flashElement(auditRow2);
      } else {
        auditRow1.classList.remove("is-voided");
        auditSub1.textContent = "Efectivo · Cargado por error en mostrador";
        auditTag1.className = "badge badge-mint";
        auditTag1.textContent = "Firme";
        auditRow2.hidden = true;
        auditBtn.textContent = "Simular anulación con motivo";
        auditMsg.textContent = "Los cobros no se borran: probá cómo corrige un error un Administrador.";
      }
      flashElement(auditTag1);
    });
  }

  // 6. FAQ Accordion
  document.querySelectorAll(".faq-trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      const panelId = trigger.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      trigger.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });

  // 7. Demo form validation, live error recovery, XSS-safe summary & copy action
  const form = document.getElementById("demo-form");
  const boxInput = document.getElementById("box-name");
  const nameInput = document.getElementById("contact-name");
  const channelInput = document.getElementById("contact-channel");
  const athleteSelect = document.getElementById("athlete-count");
  const needInput = document.getElementById("main-need");
  const submitBtn = document.getElementById("demo-submit-btn");
  const feedback = document.getElementById("form-feedback");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneAllowedRegex = /^[+\d\s().-]+$/;

  function validateBoxValue(val) {
    const trimmed = val.trim();
    if (!trimmed) return "Ingresá el nombre de tu box o centro.";
    if (trimmed.length < 2) return "El nombre del box debe tener al menos 2 caracteres.";
    return "";
  }

  function validateNameValue(val) {
    const trimmed = val.trim();
    if (!trimmed) return "Ingresá tu nombre para poder contactarte.";
    if (trimmed.length < 2) return "Ingresá un nombre válido (mínimo 2 caracteres).";
    return "";
  }

  function validateChannelValue(val) {
    const trimmed = val.trim();
    if (!trimmed) return "Ingresá un email o número de WhatsApp de contacto.";
    if (emailRegex.test(trimmed)) return "";
    const digitsOnly = trimmed.replace(/\D/g, "");
    if (phoneAllowedRegex.test(trimmed) && digitsOnly.length >= 8 && digitsOnly.length <= 15) {
      return "";
    }
    return "Ingresá un email válido (ej. hola@tubox.com) o un WhatsApp con código de área (mínimo 8 dígitos).";
  }

  function setFieldError(input, errId, message) {
    const errEl = document.getElementById(errId);
    if (message) {
      input.setAttribute("aria-invalid", "true");
      if (errEl) errEl.textContent = message;
      return false;
    }
    input.removeAttribute("aria-invalid");
    if (errEl) errEl.textContent = "";
    return true;
  }

  if (boxInput) {
    boxInput.addEventListener("input", function () {
      if (boxInput.getAttribute("aria-invalid") === "true") {
        setFieldError(boxInput, "err-box-name", validateBoxValue(boxInput.value));
      }
    });
  }
  if (nameInput) {
    nameInput.addEventListener("input", function () {
      if (nameInput.getAttribute("aria-invalid") === "true") {
        setFieldError(nameInput, "err-contact-name", validateNameValue(nameInput.value));
      }
    });
  }
  if (channelInput) {
    channelInput.addEventListener("input", function () {
      if (channelInput.getAttribute("aria-invalid") === "true") {
        setFieldError(channelInput, "err-contact-channel", validateChannelValue(channelInput.value));
      }
    });
  }

  if (form && boxInput && nameInput && channelInput && feedback) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const errBox = validateBoxValue(boxInput.value);
      const errName = validateNameValue(nameInput.value);
      const errChannel = validateChannelValue(channelInput.value);

      const validBox = setFieldError(boxInput, "err-box-name", errBox);
      const validName = setFieldError(nameInput, "err-contact-name", errName);
      const validChannel = setFieldError(channelInput, "err-contact-channel", errChannel);

      if (!validBox) {
        boxInput.focus();
        return;
      }
      if (!validName) {
        nameInput.focus();
        return;
      }
      if (!validChannel) {
        channelInput.focus();
        return;
      }

      const boxVal = boxInput.value.trim();
      const nameVal = nameInput.value.trim();
      const channelVal = channelInput.value.trim();
      const scaleLabel = athleteSelect && athleteSelect.selectedOptions[0]
        ? athleteSelect.selectedOptions[0].textContent
        : "Entre 80 y 200 atletas";
      const needVal = needInput && needInput.value.trim()
        ? needInput.value.trim()
        : "Ordenar grilla de clases, reservas y caja diaria.";

      const summaryText = [
        "Solicitud de demo Centris (20 min)",
        "• Box / Centro: " + boxVal,
        "• Contacto: " + nameVal + " (" + channelVal + ")",
        "• Escala actual: " + scaleLabel,
        "• Prioridad operativa: " + needVal
      ].join("\n");

      feedback.textContent = "";

      const titleLine = document.createElement("div");
      const strongEl = document.createElement("strong");
      strongEl.textContent = "Resumen de demo preparado para " + boxVal + ": ";
      titleLine.appendChild(strongEl);
      titleLine.appendChild(document.createTextNode("como este entorno es de demostración local (sin envío a servidor), podés copiar el resumen listo a continuación:"));

      const preEl = document.createElement("pre");
      preEl.className = "form-feedback-summary";
      preEl.textContent = summaryText;

      const actionsRow = document.createElement("div");
      actionsRow.className = "form-feedback-actions";

      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className = "sim-action-btn is-primary";
      copyBtn.id = "copy-demo-summary";
      copyBtn.textContent = "Copiar resumen de solicitud";

      const copyStatus = document.createElement("span");
      copyStatus.className = "ops-action-msg";
      copyStatus.setAttribute("aria-live", "polite");

      copyBtn.addEventListener("click", function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(summaryText).then(function () {
            copyBtn.textContent = "Resumen copiado";
            copyStatus.textContent = "Listo en tu portapapeles para pegarlo por WhatsApp o email.";
          }).catch(function () {
            copyStatus.textContent = "Seleccioná el recuadro de arriba para copiar el texto.";
          });
        } else {
          copyStatus.textContent = "Seleccioná el recuadro de arriba para copiar el texto.";
        }
      });

      actionsRow.appendChild(copyBtn);
      actionsRow.appendChild(copyStatus);

      feedback.appendChild(titleLine);
      feedback.appendChild(preEl);
      feedback.appendChild(actionsRow);
      feedback.hidden = false;

      if (submitBtn) {
        submitBtn.textContent = "Actualizar resumen de demo";
      }
      flashElement(feedback);
    });
  }

  // 8. Overdrive Reactive Telemetry Canvas 2D + Scroll Depth Fallback + One-Shot Scroll Reveal
  const heroSection = document.querySelector(".hero");
  const heroCopyEl = document.querySelector(".hero-copy");
  const telemetryCanvas = document.getElementById("hero-telemetry-canvas");

  if (heroSection && telemetryCanvas && telemetryCanvas.getContext) {
    const ctx = telemetryCanvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = null;
    let heroVisible = true;
    let pointerActive = false;
    let targetX = 0.5;
    let targetY = 0.28;
    let currentX = 0.5;
    let currentY = 0.28;
    let copyZone = { cx: 0, cy: 0, rx: 1, ry: 1 };
    const pulses = [];

    function getThemePalette() {
      const isLight = document.documentElement.classList.contains("light");
      return isLight
        ? {
            dot: "rgba(82, 82, 91, 0.22)",
            cross: "rgba(63, 98, 18, 0.28)",
            volt: "rgba(63, 98, 18, ",
            mint: "rgba(4, 120, 87, "
          }
        : {
            dot: "rgba(161, 161, 170, 0.15)",
            cross: "rgba(193, 244, 41, 0.22)",
            volt: "rgba(193, 244, 41, ",
            mint: "rgba(24, 255, 200, "
          };
    }

    function resizeCanvas() {
      const rect = heroSection.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      telemetryCanvas.width = Math.round(width * dpr);
      telemetryCanvas.height = Math.round(height * dpr);
      if (heroCopyEl) {
        const cRect = heroCopyEl.getBoundingClientRect();
        copyZone = {
          cx: cRect.left - rect.left + cRect.width * 0.5,
          cy: cRect.top - rect.top + cRect.height * 0.5,
          rx: Math.max(180, cRect.width * 0.56),
          ry: Math.max(120, cRect.height * 0.64)
        };
      }
    }

    function getReadingZoneFactor(x, y) {
      const nx = (x - copyZone.cx) / copyZone.rx;
      const ny = (y - copyZone.cy) / copyZone.ry;
      const d = nx * nx + ny * ny;
      if (d >= 1.25) return 1;
      if (d <= 0.45) return 0.06;
      return 0.06 + ((d - 0.45) / 0.8) * 0.94;
    }

    emitTelemetryPulse = function (tone) {
      if (reducedMotion || !width || !height) return;
      pulses.push({
        x: width * 0.5,
        y: Math.min(height * 0.54, 420),
        radius: 28,
        maxRadius: Math.max(width, height) * 0.62,
        alpha: 0.72,
        tone: tone === "mint" ? "mint" : "volt"
      });
      if (pulses.length > 4) pulses.shift();
    };

    function drawTelemetryFrame(nowMs) {
      if (!ctx || !width || !height) return;
      const t = (nowMs || 0) * 0.001;
      const palette = getThemePalette();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Ease pointer inertia
      const ease = pointerActive ? 0.12 : 0.04;
      if (!pointerActive && !reducedMotion) {
        targetX = 0.5 + Math.sin(t * 0.35) * 0.14;
        targetY = 0.26 + Math.cos(t * 0.27) * 0.06;
      }
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      const px = currentX * width;
      const py = currentY * height;
      const spacing = width < 640 ? 32 : 38;
      const influenceR = width < 640 ? 180 : 250;

      // Update radial pulse waves
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.radius += (p.maxRadius - p.radius) * 0.065 + 3.2;
        p.alpha *= 0.962;
        if (p.alpha < 0.02 || p.radius >= p.maxRadius) {
          pulses.splice(i, 1);
        }
      }

      // Draw subtle radial pulse rings
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        const colorBase = p.tone === "mint" ? palette.mint : palette.volt;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = colorBase + (p.alpha * 0.42).toFixed(3) + ")";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // Architectural lattice nodes + cursor / pulse illumination
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);
      const offsetX = (width - cols * spacing) * 0.5 + spacing * 0.5;

      for (let r = 0; r <= rows; r++) {
        const y = r * spacing + 18;
        if (y > height * 0.92) break;
        for (let c = 0; c <= cols; c++) {
          const x = offsetX + c * spacing;
          const dx = x - px;
          const dy = y - py;
          const dist = Math.hypot(dx, dy);
          const cursorEnergy = Math.max(0, 1 - dist / influenceR);

          let waveEnergy = 0;
          let waveTone = "volt";
          for (let k = 0; k < pulses.length; k++) {
            const p = pulses[k];
            const dPulse = Math.abs(Math.hypot(x - p.x, y - p.y) - p.radius);
            if (dPulse < 52) {
              const contrib = (1 - dPulse / 52) * p.alpha;
              if (contrib > waveEnergy) {
                waveEnergy = contrib;
                waveTone = p.tone;
              }
            }
          }

          const ambientBeat = reducedMotion ? 0 : Math.max(0, Math.sin(t * 1.4 + c * 0.45 + r * 0.35)) * 0.18;
          const isAnchor = (c % 4 === 0 && r % 3 === 0);
          const zoneFactor = getReadingZoneFactor(x, y);

          if (waveEnergy > 0.08 && zoneFactor > 0.25) {
            const colorPrefix = waveTone === "mint" ? palette.mint : palette.volt;
            ctx.fillStyle = colorPrefix + Math.min(0.85, (0.25 + waveEnergy * 0.7) * zoneFactor).toFixed(3) + ")";
            const sz = 1.4 + waveEnergy * 1.8;
            ctx.fillRect(x - sz * 0.5, y - sz * 0.5, sz, sz);
          } else if (cursorEnergy > 0.04 && zoneFactor > 0.2) {
            ctx.fillStyle = palette.volt + ((0.18 + cursorEnergy * 0.55) * zoneFactor).toFixed(3) + ")";
            const rNode = 1.2 + cursorEnergy * 1.5;
            ctx.beginPath();
            ctx.arc(x, y, rNode, 0, Math.PI * 2);
            ctx.fill();
          } else if (isAnchor) {
            ctx.globalAlpha = zoneFactor;
            ctx.strokeStyle = palette.cross;
            ctx.lineWidth = 1;
            const arm = 2.6 + ambientBeat * 2.2;
            ctx.beginPath();
            ctx.moveTo(x - arm, y);
            ctx.lineTo(x + arm, y);
            ctx.moveTo(x, y - arm);
            ctx.lineTo(x, y + arm);
            ctx.stroke();
            ctx.globalAlpha = 1;
          } else {
            ctx.globalAlpha = zoneFactor;
            ctx.fillStyle = palette.dot;
            ctx.fillRect(x - 0.8, y - 0.8, 1.6, 1.6);
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    function tick(now) {
      drawTelemetryFrame(now);
      if (heroVisible && !document.hidden && !reducedMotion) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    function ensureLoop() {
      if (reducedMotion) {
        drawTelemetryFrame(0);
        return;
      }
      if (!rafId && heroVisible && !document.hidden) {
        rafId = window.requestAnimationFrame(tick);
      }
    }

    resizeCanvas();
    ensureLoop();

    window.addEventListener("resize", function () {
      resizeCanvas();
      if (reducedMotion) drawTelemetryFrame(0);
    }, { passive: true });

    if (!reducedMotion) {
      heroSection.addEventListener("pointermove", function (e) {
        const rect = heroSection.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          pointerActive = true;
          targetX = Math.max(0.05, Math.min(0.95, (e.clientX - rect.left) / rect.width));
          targetY = Math.max(0.05, Math.min(0.88, (e.clientY - rect.top) / rect.height));
          heroSection.style.setProperty("--hero-x", Math.round(targetX * 100) + "%");
          heroSection.style.setProperty("--hero-y", Math.round(targetY * 100) + "%");
        }
      }, { passive: true });

      heroSection.addEventListener("pointerleave", function () {
        pointerActive = false;
      }, { passive: true });
    }

    if ("IntersectionObserver" in window) {
      const heroObs = new IntersectionObserver(function (entries) {
        heroVisible = Boolean(entries[0] && entries[0].isIntersecting);
        if (heroVisible) ensureLoop();
      }, { threshold: 0.02 });
      heroObs.observe(heroSection);
    }

    document.addEventListener("visibilitychange", function () {
      if (!document.hidden && heroVisible) ensureLoop();
    });

    if (window.MutationObserver) {
      new MutationObserver(function () {
        if (reducedMotion) drawTelemetryFrame(0);
      }).observe(rootEl, { attributes: true, attributeFilter: ["class"] });
    }
  }

  // Scroll-progress fallback only when native CSS scroll-timeline is unsupported
  const scrollProgressEl = document.getElementById("scroll-progress-fill");
  if (scrollProgressEl && !(window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()"))) {
    let scrollRaf = false;
    function updateScrollProgress() {
      scrollRaf = false;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      scrollProgressEl.style.setProperty("--scroll-progress", ratio.toFixed(4));
    }
    window.addEventListener("scroll", function () {
      if (!scrollRaf) {
        scrollRaf = true;
        window.requestAnimationFrame(updateScrollProgress);
      }
    }, { passive: true });
    updateScrollProgress();
  }

  if ("IntersectionObserver" in window && !reducedMotion) {
    const staggerContainers = document.querySelectorAll(".scenes-grid, .roles-grid, .modality-grid, .scope-split, .faq-list");
    staggerContainers.forEach(function (grid) {
      Array.prototype.slice.call(grid.children).forEach(function (child, idx) {
        child.style.setProperty("--stagger", String(Math.min(idx, 3)));
      });
    });

    const revealSelectors = [
      ".section-header",
      ".scenes-grid > .scene-card",
      ".ops-controls-bar",
      ".ops-viewport",
      ".roles-grid > .role-card",
      ".roles-shared-note",
      ".modality-grid > .modality-card",
      ".scope-split > .panel-surface",
      ".faq-list > .faq-item",
      ".demo-layout"
    ].join(", ");

    const revealTargets = document.querySelectorAll(revealSelectors);
    const viewportFloor = window.innerHeight * 0.94;

    const revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        obs.unobserve(el);
        if (el.getAttribute("data-reveal") === "pending") {
          el.setAttribute("data-reveal", "entering");
          el.addEventListener("animationend", function () {
            el.setAttribute("data-reveal", "shown");
          }, { once: true });
        } else {
          el.setAttribute("data-reveal", "shown");
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -36px 0px"
    });

    revealTargets.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top > viewportFloor) {
        el.setAttribute("data-reveal", "pending");
        revealObserver.observe(el);
      } else {
        el.setAttribute("data-reveal", "shown");
      }
    });
  }
})();
