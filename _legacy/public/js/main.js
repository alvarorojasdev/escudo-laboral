document.addEventListener("DOMContentLoaded", () => {
  // Ocultar hasta que los componentes se carguen
  document.documentElement.style.visibility = "hidden";

  const loadComponent = async (selector, path) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const html = await response.text();
    el.innerHTML = html;
  };

  const showAlert = (container, type, message) => {
    if (!container) return;
    container.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button></div>`;
  };

  const showGlobalToast = (type, message, timeout = 4000) => {
    // Crear un contenedor temporal en la esquina superior derecha
    let container = document.getElementById("globalFormAlert");
    if (!container) {
      container = document.createElement("div");
      container.id = "globalFormAlert";
      container.style.position = "fixed";
      container.style.top = "20px";
      container.style.right = "20px";
      container.style.zIndex = 2000;
      document.body.appendChild(container);
    }
    container.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button></div>`;
    setTimeout(() => {
      container.innerHTML = "";
    }, timeout);
  };

  Promise.all([
    loadComponent("#header", "/components/header.html"),
    loadComponent("#footer", "/components/footer.html"),
  ])
    .then(() => {
      document.documentElement.style.visibility = "visible";
    })
    .catch((err) => {
      console.error("Error cargando componentes:", err);
      document.documentElement.style.visibility = "visible";
    });

  // Depuración adicional: Verificar el estado del modal y sus propiedades
  const modalElement = document.getElementById("contactModal");
  if (modalElement) {
    console.log("Modal encontrado en el DOM. Verificando propiedades...");
    console.log("Atributos del modal:", modalElement.attributes);
    console.log("Clases del modal:", modalElement.classList);
    try {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      console.log("Modal inicializado correctamente:", modalInstance);
    } catch (error) {
      console.error("Error al inicializar el modal:", error);
    }
  } else {
    console.error("Modal no encontrado en el DOM. Verifica su carga.");
  }

  // Evitar que el navegador restaure el foco en un botón del accordion al recargar
  function removeAccordionFocusOnLoad(delay = 120) {
    function doRemove() {
      try {
        // 1) Blur cualquier botón del accordion que esté enfocado
        const focusedButtons = document.querySelectorAll(
          ".accordion-button:focus"
        );
        focusedButtons.forEach((btn) => btn.blur());

        // 2) Si el activeElement es un accordion-button, blur y enfocar body temporalmente
        const active = document.activeElement;
        if (
          active &&
          active.classList &&
          active.classList.contains("accordion-button")
        ) {
          active.blur();
          const hadTab = document.body.hasAttribute("tabindex");
          if (!hadTab) document.body.setAttribute("tabindex", "-1");
          // focus sin hacer scroll
          document.body.focus({ preventScroll: true });
          if (!hadTab) document.body.removeAttribute("tabindex");
        }

        // 3) Forzar una limpieza extra tras otro pequeño delay (algunos navegadores restauran foco después)
        setTimeout(() => {
          const focusedAfter = document.querySelectorAll(
            ".accordion-button:focus"
          );
          focusedAfter.forEach((btn) => btn.blur());
        }, 220);
      } catch (e) {
        console.warn("No se pudo remover foco inicial del accordion:", e);
      }
    }

    if (document.readyState === "complete") {
      setTimeout(doRemove, delay);
    } else {
      window.addEventListener("load", () => setTimeout(doRemove, delay));
    }
  }

  // Ejecutar la rutina para evitar sombreado del primer item al recargar
  removeAccordionFocusOnLoad();

  // Detectar si el foco es restaurado por el navegador y removerlo inmediatamente
  (function preventAccordionAutoFocus() {
    let lastInputWasKeyboard = false;

    // Si el usuario está usando el teclado (Tab/Arrow/Enter), permitimos foco
    window.addEventListener(
      "keydown",
      (e) => {
        const keys = [
          "Tab",
          "ArrowDown",
          "ArrowUp",
          "ArrowLeft",
          "ArrowRight",
          "Enter",
          " ",
        ];
        lastInputWasKeyboard = keys.includes(e.key) || e.key.length === 1;
      },
      { capture: true }
    );
    // Ratón o touch -> no consideramos teclado
    window.addEventListener("mousedown", () => (lastInputWasKeyboard = false), {
      capture: true,
    });
    window.addEventListener(
      "touchstart",
      () => (lastInputWasKeyboard = false),
      { capture: true }
    );

    // Si un accordion-button gana foco y no fue por teclado, blur inmediatamente
    document.addEventListener("focusin", (e) => {
      try {
        const target = e.target;
        if (
          target &&
          target.classList &&
          target.classList.contains("accordion-button") &&
          !lastInputWasKeyboard
        ) {
          // small timeout to ensure not to interrupt real keyboard focus sequence
          setTimeout(() => {
            try {
              target.blur();
            } catch (err) {}
          }, 8);
        }
      } catch (err) {
        /* ignore */
      }
    });

    // Repetir la remoción de foco varias veces por seguridad (Chrome a veces lo restaura tarde)
    [80, 220, 520, 900].forEach((d) =>
      setTimeout(removeAccordionFocusOnLoad, d)
    );
  })();

  // Eliminar lógica redundante para acordeones

  // Consolidar lógica para manejo de foco en modales y acordeones
  function handleFocusManagement() {
    document.addEventListener("focusin", (e) => {
      const target = e.target;
      if (target && target.classList.contains("accordion-button")) {
        target.blur();
      }
    });

    document.querySelectorAll(".modal").forEach((modalEl) => {
      modalEl.addEventListener("hide.bs.modal", () => {
        document.activeElement?.blur();
      });
    });
  }

  handleFocusManagement();
});
