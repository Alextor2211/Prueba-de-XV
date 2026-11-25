// =============================================
// AF DIGITALES
// INVITACIÓN XV AÑOS - DEMO
// =============================================

// =============================================
// Configuración de demostración
// =============================================

// =============================================
// 2. CONFIGURACIÓN DEL EVENTO
// =============================================

const EVENTO = {
  nombre: "Sofía",

  // Sábado 20 de noviembre de 2027
  // 4:00 PM, horario del centro de México
  fecha: "2027-11-20T16:00:00-06:00",

  anio: 2027,
  mes: 10,
  dia: 20,

  maxPases: 5,
  whatsapp: "524623749329" // Agrega tu número con código de país, solo dígitos
};

const fechaEvento = new Date(EVENTO.fecha);

// Activar soporte para animaciones CSS
document.documentElement.classList.add("js");

// =============================================
// 3. INICIAR INVITACIÓN
// =============================================

document.addEventListener("DOMContentLoaded", () => {

  // Obtener un elemento por ID
  const $ = id => document.getElementById(id);

  // Modificar textos del HTML
  function cambiarTexto(selector, texto) {
    const elemento = document.querySelector(selector);

    if (elemento) {
      elemento.textContent = texto;
    }
  }

  // ===========================================
  // 4. ACTUALIZAR NOMBRE Y FECHA
  // ===========================================

  const fechaTexto = "20 · NOVIEMBRE · 2027";

  document.title =
    `Mis XV Años | ${EVENTO.nombre}`;

  cambiarTexto(
    ".splash-name",
    EVENTO.nombre
  );

  cambiarTexto(
    ".seal-initial",
    "S"
  );

  cambiarTexto(
    ".splash-footer",
    fechaTexto
  );

  cambiarTexto(
    ".names",
    EVENTO.nombre
  );

  cambiarTexto(
    ".hero-date",
    fechaTexto
  );

  cambiarTexto(
    ".big-date",
    "20"
  );

  cambiarTexto(
    ".date-month",
    "NOVIEMBRE"
  );

  cambiarTexto(
    ".gifts-signature",
    `Con cariño, ${EVENTO.nombre}`
  );

  cambiarTexto(
    ".farewell-overlay h2",
    EVENTO.nombre
  );





  // Actualizar día de la semana
  const diasSemanaCompletos = [
    "DOMINGO",
    "LUNES",
    "MARTES",
    "MIÉRCOLES",
    "JUEVES",
    "VIERNES",
    "SÁBADO"
  ];

  const diaSemana = new Date(
    EVENTO.anio,
    EVENTO.mes,
    EVENTO.dia
  ).getDay();

  const elementosFecha =
    document.querySelectorAll(
      ".date-display .date-side"
    );

  if (elementosFecha[0]) {
    elementosFecha[0].textContent =
      diasSemanaCompletos[diaSemana];
  }

  if (elementosFecha[1]) {
    elementosFecha[1].textContent =
      EVENTO.anio;
  }

  // ===========================================
  // 5. SOBRE INTERACTIVO
  // ===========================================

  const pantallaInicio = $("pantallaInicio");
  const btnAbrir = $("btnAbrir");
  const contenido = $("contenidoInvitacion");

  let invitacionAbierta = false;

  if (btnAbrir && pantallaInicio && contenido) {

    btnAbrir.addEventListener("click", () => {

      if (invitacionAbierta) return;

      invitacionAbierta = true;

      // Mostrar contenido detrás del sobre
      contenido.hidden = false;

      // Abrir las puertas
      pantallaInicio.classList.add("is-opening");

      // Reproducir música
      reproducirMusica();

      setTimeout(() => {

        pantallaInicio.hidden = true;

        document.body.classList.remove("locked");

        window.scrollTo({
          top: 0,
          behavior: "instant"
        });

        activarAnimaciones();

      }, 1300);

    });

  }

  // ===========================================
  // 6. MÚSICA DE FONDO
  // ===========================================

  const musica = $("musicaFondo");
  const btnAudio = $("btn-audio");

  function actualizarIconoMusica() {

    if (!musica || !btnAudio || !musica.querySelector("source[src]")) return;

    const reproduciendo =
      !musica.paused && !musica.ended;

    btnAudio.innerHTML = reproduciendo
      ? '<i class="fa-solid fa-volume-high"></i>'
      : '<i class="fa-solid fa-volume-xmark"></i>';

    btnAudio.setAttribute(
      "aria-label",
      reproduciendo
        ? "Pausar música"
        : "Reproducir música"
    );
  }

  async function reproducirMusica() {

    if (!musica || !btnAudio || !musica.querySelector("source[src]")) return;

    btnAudio.hidden = false;

    try {

      musica.volume = 0.55;

      await musica.play();

    } catch (error) {

      console.warn(
        "No se pudo reproducir la música:",
        error.message
      );

    }

    actualizarIconoMusica();
  }

  if (musica && btnAudio) {

    btnAudio.addEventListener(
      "click",
      async () => {

        if (musica.paused) {

          await reproducirMusica();

        } else {

          musica.pause();
          actualizarIconoMusica();

        }

      }
    );

    musica.addEventListener(
      "play",
      actualizarIconoMusica
    );

    musica.addEventListener(
      "pause",
      actualizarIconoMusica
    );

  }

  // ===========================================
  // 7. CUENTA REGRESIVA
  // ===========================================

  const dias = $("dias");
  const horas = $("horas");
  const minutos = $("minutos");
  const segundos = $("segundos");

  const countdownMessage =
    $("countdownMessage");

  function actualizarCuentaRegresiva() {

    if (
      !dias ||
      !horas ||
      !minutos ||
      !segundos
    ) return;

    const ahora = new Date();

    const diferencia =
      fechaEvento.getTime() - ahora.getTime();

    if (diferencia <= 0) {

      dias.textContent = "00";
      horas.textContent = "00";
      minutos.textContent = "00";
      segundos.textContent = "00";

      if (countdownMessage) {

        countdownMessage.textContent =
          "¡Llegó el día de mis XV años!";

      }

      return;
    }

    const totalSegundos =
      Math.floor(diferencia / 1000);

    const d =
      Math.floor(totalSegundos / 86400);

    const h =
      Math.floor(
        (totalSegundos % 86400) / 3600
      );

    const m =
      Math.floor(
        (totalSegundos % 3600) / 60
      );

    const s = totalSegundos % 60;

    dias.textContent =
      String(d).padStart(2, "0");

    horas.textContent =
      String(h).padStart(2, "0");

    minutos.textContent =
      String(m).padStart(2, "0");

    segundos.textContent =
      String(s).padStart(2, "0");

  }

  actualizarCuentaRegresiva();

  setInterval(
    actualizarCuentaRegresiva,
    1000
  );

  // ===========================================
  // 8. CALENDARIO AUTOMÁTICO
  // ===========================================

  const calendario = $("miniCalendar");

  const nombresDias = [
    "D", "L", "M", "M", "J", "V", "S"
  ];

  function generarCalendario() {

    if (!calendario) return;

    calendario.innerHTML = "";

    // Encabezados
    nombresDias.forEach(nombre => {

      const elemento =
        document.createElement("div");

      elemento.className = "cal-day-name";
      elemento.textContent = nombre;

      calendario.appendChild(elemento);

    });

    const primerDia = new Date(
      EVENTO.anio,
      EVENTO.mes,
      1
    ).getDay();

    const diasEnMes = new Date(
      EVENTO.anio,
      EVENTO.mes + 1,
      0
    ).getDate();

    const diasMesAnterior = new Date(
      EVENTO.anio,
      EVENTO.mes,
      0
    ).getDate();

    // Días del mes anterior
    for (
      let i = primerDia - 1;
      i >= 0;
      i--
    ) {

      const elemento =
        document.createElement("div");

      elemento.className =
        "cal-day text-muted";

      elemento.textContent =
        diasMesAnterior - i;

      calendario.appendChild(elemento);

    }

    // Días del mes del evento
    for (
      let dia = 1;
      dia <= diasEnMes;
      dia++
    ) {

      const elemento =
        document.createElement("div");

      elemento.className = "cal-day";
      elemento.textContent = dia;

      if (dia === EVENTO.dia) {

        elemento.classList.add("active");

        elemento.setAttribute(
          "aria-label",
          "Día de los XV años"
        );

      }

      calendario.appendChild(elemento);

    }

    // Completar la última semana
    const celdasActuales =
      primerDia + diasEnMes;

    const celdasRestantes =
      (7 - (celdasActuales % 7)) % 7;

    for (
      let dia = 1;
      dia <= celdasRestantes;
      dia++
    ) {

      const elemento =
        document.createElement("div");

      elemento.className =
        "cal-day text-muted";

      elemento.textContent = dia;

      calendario.appendChild(elemento);

    }

  }

  generarCalendario();

  // ===========================================
  // 9. CARRUSEL DE FOTOGRAFÍAS
  // ===========================================

  const carouselTrack = $("carouselTrack");
  const carouselViewport = $("carouselViewport");

  const slides = Array.from(
    document.querySelectorAll(
      ".carousel-slide"
    )
  );

  const btnPrev = $("carouselPrev");
  const btnNext = $("carouselNext");
  const dotsContainer = $("carouselDots");

  const carousel =
    document.querySelector(".carousel");

  let currentSlide = 0;
  let carouselInterval = null;

  const totalSlides = slides.length;

  function mostrarSlide(index) {

    if (
      !carouselTrack ||
      !dotsContainer ||
      totalSlides === 0
    ) return;

    currentSlide =
      (index + totalSlides) % totalSlides;

    carouselTrack.style.transform =
      `translateX(-${currentSlide * 100}%)`;

    const dots =
      dotsContainer.querySelectorAll(
        ".carousel-dot"
      );

    dots.forEach((dot, i) => {

      const activo =
        i === currentSlide;

      dot.classList.toggle(
        "active",
        activo
      );

      dot.setAttribute(
        "aria-current",
        activo ? "true" : "false"
      );

    });

  }

  function siguienteSlide() {
    mostrarSlide(currentSlide + 1);
  }

  function anteriorSlide() {
    mostrarSlide(currentSlide - 1);
  }

  function detenerCarrusel() {

    if (carouselInterval !== null) {

      clearInterval(carouselInterval);

      carouselInterval = null;

    }

  }

  function iniciarCarrusel() {

    detenerCarrusel();

    if (
      totalSlides <= 1 ||
      document.hidden ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) return;

    carouselInterval = setInterval(
      siguienteSlide,
      5000
    );

  }

  function reiniciarCarrusel() {
    iniciarCarrusel();
  }

  if (
    carouselTrack &&
    dotsContainer &&
    carousel
  ) {

    // Crear indicadores
    slides.forEach((slide, index) => {

      const dot =
        document.createElement("button");

      dot.type = "button";
      dot.className = "carousel-dot";

      dot.setAttribute(
        "aria-label",
        `Ver fotografía ${index + 1}`
      );

      dot.addEventListener("click", () => {

        mostrarSlide(index);
        reiniciarCarrusel();

      });

      dotsContainer.appendChild(dot);

    });

    // Fotografía anterior
    btnPrev?.addEventListener(
      "click",
      () => {

        anteriorSlide();
        reiniciarCarrusel();

      }
    );

    // Fotografía siguiente
    btnNext?.addEventListener(
      "click",
      () => {

        siguienteSlide();
        reiniciarCarrusel();

      }
    );

    // Pausar al pasar el cursor
    carousel.addEventListener(
      "mouseenter",
      detenerCarrusel
    );

    carousel.addEventListener(
      "mouseleave",
      iniciarCarrusel
    );

    carousel.addEventListener(
      "focusin",
      detenerCarrusel
    );

    carousel.addEventListener(
      "focusout",
      event => {

        if (
          !carousel.contains(
            event.relatedTarget
          )
        ) {
          iniciarCarrusel();
        }

      }
    );

    document.addEventListener(
      "visibilitychange",
      () => {

        if (document.hidden) {
          detenerCarrusel();
        } else {
          iniciarCarrusel();
        }

      }
    );

    // Deslizar imágenes en celular
    let touchStartX = 0;

    carouselViewport?.addEventListener(
      "touchstart",
      event => {

        touchStartX =
          event.changedTouches[0].screenX;

      },
      { passive: true }
    );

    carouselViewport?.addEventListener(
      "touchend",
      event => {

        const touchEndX =
          event.changedTouches[0].screenX;

        const diferencia =
          touchStartX - touchEndX;

        if (
          Math.abs(diferencia) > 50
        ) {

          if (diferencia > 0) {
            siguienteSlide();
          } else {
            anteriorSlide();
          }

          reiniciarCarrusel();

        }

      },
      { passive: true }
    );

    mostrarSlide(0);
    iniciarCarrusel();

  }

  // ===========================================
  // 10. ANIMACIONES AL HACER SCROLL
  // ===========================================

  function activarAnimaciones() {

    const elementos =
      document.querySelectorAll(".fade-in");

    if (
      !("IntersectionObserver" in window)
    ) {

      elementos.forEach(elemento => {
        elemento.classList.add("visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries, observador) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observador.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    elementos.forEach(elemento => {
      observer.observe(elemento);
    });

  }

  // ===========================================
  // 11. CONFIRMACIÓN POR WHATSAPP
  // ===========================================
  const formulario = $("formularioRSVP");
  const estado = $("estadoRSVP");
  formulario?.addEventListener("submit", event => {
    event.preventDefault();
    const nombre = $("nombreInvitado").value.trim();
    const pases = Number($("pasesAsistencia").value);
    if (nombre.length < 3 || !Number.isInteger(pases) || pases < 1 || pases > EVENTO.maxPases) {
      estado.textContent = "Revisa tu nombre y número de personas.";
      return;
    }
    const mensaje = `✨ *CONFIRMACIÓN DE ASISTENCIA* ✨\n\n¡Hola! Me encantaría acompañarte a celebrar tus XV años.\n\n👤 Nombre: ${nombre}\n🎉 Personas: ${pases}\n\n¡Gracias por la invitación!\n\n_Modelo de prueba · AF Digitales_`;
    const numero = EVENTO.whatsapp.trim();
    if (numero && !/^\d{8,15}$/.test(numero)) {
      estado.textContent = "El número de WhatsApp de la demo no es válido.";
      return;
    }
    estado.textContent = numero ? "Envía el mensaje en WhatsApp para completar tu confirmación." : "Modo demo: selecciona un contacto en WhatsApp si deseas probar el envío.";
    window.location.href = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  });

});
// ==========================================
// AF DIGITALES
// FOTOGRAFÍAS QUE APARECEN AL DESLIZAR
// ==========================================

function animarFotografiasAF() {

  // Seleccionar todas las fotos interiores.
  // Excluimos la portada para conservar
  // su animación original.

  const fotos = document.querySelectorAll(
    ".photo-space img, " +
    ".carousel-slide img, " +
    ".between-family-photo img, " +
    ".farewell-section > img"
  );

  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {
    return;
  }

  // Detectar cuándo una fotografía
  // entra en el área visible.

  const observadorFotosAF =
    new IntersectionObserver(
      (entradas, observador) => {

        entradas.forEach(entrada => {

          if (entrada.isIntersecting) {

            // Mostrar suavemente
            entrada.target.classList.add(
              "foto-visible-af"
            );

            // Ejecutar solo una vez
            observador.unobserve(
              entrada.target
            );

          }

        });

      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px"
      }
    );

  fotos.forEach(foto => {

    foto.classList.add(
      "foto-aparece-af"
    );

    observadorFotosAF.observe(foto);

  });

}

// Iniciar después de cargar el HTML

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    animarFotografiasAF,
    { once: true }
  );

} else {

  animarFotografiasAF();

}