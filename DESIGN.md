---
name: Centris
description: Sistema operativo diario para boxes de CrossFit, centros de entrenamiento funcional y gimnasios boutique.
colors:
  signal-volt: "#c1f429"
  signal-volt-hover: "#aedf1b"
  signal-volt-leaf: "#3f6212"
  verified-mint: "#18ffc8"
  pending-amber: "#fbbf24"
  alert-coral: "#ff6d6d"
  carbon-canvas: "#09090b"
  workbench-surface: "#111214"
  elevated-slate: "#18191c"
  recessed-well: "#0d0e10"
  daylight-canvas: "#f4f4f5"
  pure-white: "#ffffff"
  zinc-secondary: "#a1a1aa"
  zinc-muted: "#8b8b95"
  border-subtle: "#232428"
  border-strong: "#32343a"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.35rem, 5vw, 3.8rem)"
    fontWeight: 700
    lineHeight: 1.07
    letterSpacing: "-0.032em"
  headline:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.026em"
  title:
    fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.018em"
  body:
    fontFamily: "'Onest', 'DM Sans', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.004em"
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.015em"
rounded:
  hero: "24px"
  card: "16px"
  control: "12px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "36px"
  section-mobile: "72px"
  section-desktop: "96px"
components:
  button-primary:
    backgroundColor: "{colors.signal-volt}"
    textColor: "{colors.carbon-canvas}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.signal-volt-hover}"
    textColor: "{colors.carbon-canvas}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-ghost:
    backgroundColor: "{colors.workbench-surface}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.elevated-slate}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-icon-control:
    backgroundColor: "{colors.workbench-surface}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.control}"
    width: "44px"
    height: "44px"
  input-field:
    backgroundColor: "{colors.recessed-well}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
    height: "46px"
  card-surface:
    backgroundColor: "{colors.workbench-surface}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.card}"
    padding: "24px"
  cockpit-dock:
    backgroundColor: "{colors.workbench-surface}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.hero}"
    padding: "24px"
---

# Design System: Centris

## Overview

**Creative North Star: "The Peak-Hour Floor Dock"**

Centris habita la intersección física y digital de un box de entrenamiento a las 19:00: el momento en que el mostrador cobra cuotas, el coach toma asistencia frente a las tarimas y los atletas reservan su próximo turno desde el celular. El sistema visual combina la precisión técnica de un cronómetro de gimnasio con la calidez documental del piso de entrenamiento real (iluminación de tungsteno cálida, acero negro y caucho denso), rechazando el estándar genérico de SaaS lleno de tarjetas de texto abstractas, gradientes púrpura/azul o ilustraciones vectoriales corporativas.

La densidad está calibrada para decisiones rápidas en mostrador y teléfono móvil: encabezados escultóricos en `Bricolage Grotesque`, prosa operativa directa en `Onest` escrita en voseo rioplatense y telemetría numérica tabular en `JetBrains Mono` para horarios (`18:00`), cupos (`14/16`), vigencias (`01/11 – 30/11`) y saldos de caja (`$ 28.000`). Cada pantalla demuestra reglas verificables del producto (vigencia deportiva separada del saldo en caja, pagos inmutables con anulación por motivo y privacidad financiera para el coach) mediante tableros interactivos anclados sobre fotografía documental real.

El sistema es nativo de tema dual: su estado predeterminado es **Carbon Dark** (`#09090b`), pensado para pantallas de recepción y celulares en el piso del gimnasio, acompañado por un modo **Daylight High-Contrast** (`#f4f4f5` / `#ffffff`) para trabajo administrativo a plena luz del día.

**Key Characteristics:**
- **Arquitectura de encastre físico-digital ("The Roll"):** Una ventana fotográfica panorámica del box (`16:9`) sobre la cual se ancla el tablero operativo vivo (`margin-top: -104px` en desktop, `-40px` en mobile).
- **Disciplina de acento único (`Signal Volt`):** El verde voltio eléctrico (`#c1f429`) se reserva de forma exclusiva para llamadas a la acción primarias y focos de selección activa, nunca para decorar bordes estáticos ni íconos secundarios.
- **Tríada tipográfica con rol funcional estricto:** `Bricolage Grotesque` para voz de marca y títulos, `Onest` para lectura ágil de interfaz y `JetBrains Mono` (`tabular-nums`) para toda cifra operativa o contable.
- **Superficies planas y táctiles por capas:** Ausencia de tarjetas anidadas con bordes redundantes; la jerarquía interna se resuelve con pozos tonales (`#0d0e10`), divisores de `1px` (`#232428`) y objetivos táctiles mínimos de `44×44px`.
- **Fotografía documental sin texto horneado:** Escenas reales de mostrador, piso y celular con iluminación mixta (tungsteno + luz fría de pantalla) donde toda etiqueta de telemetría vive en el DOM como HTML/CSS real.

## Colors

La paleta combina un chasis neutro de carbón y acero con un único acento eléctrico de conversión (`Signal Volt`) y tres semáforos operativos de estado (`Verified Mint`, `Pending Amber`, `Alert Coral`) que adaptan su luminancia automáticamente entre modo oscuro y modo claro para garantizar contraste WCAG AA.

### Primary
- **Signal Volt** (`#c1f429`): Color de acción primaria exclusiva (`.btn-volt`, indicador de selección activa y foco de teclado). Siempre se combina con texto negro puro (`#000000`) sobre relleno sólido.
- **Signal Volt Pressed** (`#aedf1b`): Estado `:hover` y `:active` para botones primarios de conversión.
- **Daylight Volt Ink** (`#3f6212`): Variante de tinta y borde de alto contraste utilizada únicamente en modo claro (`html.light`) cuando el acento aparece como texto o contorno sobre fondos claros (`#f4fde0`).

### Secondary
- **Verified Mint** (`#18ffc8` en oscuro / `#047857` en claro): Estado operativo habilitado, clase con cupo disponible (`Con lugar`), membresía activa (`Al día`) y confirmación de formulario o restitución automática de créditos.
- **Pending Amber** (`#fbbf24` en oscuro / `#92400e` en claro): Advertencia operativa no bloqueante: socio con pago parcial (`Saldo pendiente`, `Moroso`) habilitado para entrenar, o turno con `Últimos lugares` (`<= 2` cupos libres).

### Tertiary
- **Alert Coral** (`#ff6d6d` en oscuro / `#b91c1c` en claro): Límite duro o acción correctiva auditada: clase agotada (`Completo 16/16`), cobro anulado con motivo obligatorio (`Pago anulado`) y errores de validación en formularios.

### Neutral
- **Carbon Canvas** (`#09090b`): Lienzo principal de página en modo oscuro y color de texto primario en modo claro.
- **Workbench Surface** (`#111214`): Superficie base de paneles operativos, tarjetas de rol, tarjetas de escena y contenedor del tablero en modo oscuro.
- **Elevated Slate** (`#18191c`): Superficie elevada para controles interactivos en reposo (`.sim-action-btn`, `.att-btn`) y estados `:hover` de filas o acordeones.
- **Recessed Well** (`#0d0e10`): Pozo tonal hundido para barras superiores de tablero (`.cockpit-topbar`), campos de entrada (`.field input`), marcos de teléfono simulado (`.phone-frame`) y consolas de estado en vivo (`.live-log`).
- **Daylight Canvas** (`#f4f4f5`): Lienzo general de página en modo claro (`html.light`), acompañado por tarjetas en **Pure White** (`#ffffff`) y pozos en `#f8f9fa`.
- **Pure White** (`#ffffff`): Tinta primaria de titulares y datos clave en modo oscuro; superficie de tarjeta en modo claro.
- **Zinc Secondary** (`#a1a1aa` en oscuro / `#52525b` en claro): Prosa descriptiva, subtítulos de sección y metadatos de coach o sala.
- **Zinc Muted** (`#8b8b95` en oscuro / `#63636b` en claro): Etiquetas secundarias, placeholders de formulario y pistas de desplazamiento tabular, calibrado para superar el umbral WCAG AA (`>= 4.5:1`).
- **Subtle Hairline** (`#232428` en oscuro / `#e4e4e7` en claro): Divisores internos de fila, bordes de tarjetas informativas en reposo y separadores de sección.
- **Strong Frame** (`#32343a` en oscuro / `#d4d4d8` en claro): Bordes estructurales del tablero interactivo, ventana panorámica, botones secundarios y campos de formulario.

### Named Rules
**The Single-Volt Conversion Rule.** El relleno sólido **Signal Volt** (`#c1f429`) pertenece exclusivamente a los botones de conversión primaria (`.btn-volt`) y al enlace de salto de accesibilidad (`.skip-link`). Los botones de simulación dentro de tableros usan un tinte translúcido (`rgba(193, 244, 41, 0.12)`) en reposo y solo encienden el relleno sólido en `:hover`, evitando que los controles de demostración compitan con el CTA comercial.

**The Semantic Tri-State Rule.** Todo estado del gimnasio se codifica con exactamente tres colores semánticos: **Verified Mint** (`#18ffc8`) para habilitación y cupo libre, **Pending Amber** (`#fbbf24`) para deuda parcial o últimos lugares sin bloqueo de acceso, y **Alert Coral** (`#ff6d6d`) para cupo lleno o anulación contable. Nunca se usan colores decorativos fuera de esta terna para insignias de estado.

## Typography

**Display Font:** `Bricolage Grotesque` (weights `600`, `700`; fallback `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** `Onest` (weights `400`, `500`, `600`; fallback `'DM Sans', ui-sans-serif, system-ui, sans-serif`)
**Label/Mono Font:** `JetBrains Mono` (weights `500`, `600`; fallback `ui-monospace, 'SFMono-Regular', monospace`)

**Character:** `Bricolage Grotesque` aporta autoridad arquitectónica e impronta contemporánea en titulares cortos, `Onest` mantiene una lectura limpia y humana en explicaciones operativas, y `JetBrains Mono` convierte cada hora, cupo e importe en telemetría verificable de mostrador.

### Hierarchy
- **Display** (`700`, `clamp(2.35rem, 5vw, 3.8rem)`, `line-height: 1.07`, `letter-spacing: -0.032em`): Titular principal del hero (`h1.hero-title`), balanceado con `text-wrap: balance`.
- **Headline** (`700`, `clamp(1.75rem, 3.2vw, 2.5rem)`, `line-height: 1.12`, `letter-spacing: -0.026em`): Títulos principales de sección (`h2.section-title`) y encabezados de diapositivas operativas (`clamp(1.375rem, 2.2vw, 1.75rem)`).
- **Title** (`600`, `1.25rem` / `1.0625rem`, `line-height: 1.25–1.3`, `letter-spacing: -0.018em`): Títulos de tarjetas de escena (`.scene-title`), tarjetas de rol (`.role-panel-title`), modalidades de plan (`.modality-name`) y encabezados internos del tablero (`.cockpit-card-title`).
- **Body** (`400` / `500`, `1rem` base y `clamp(1.0625rem, 1.4vw, 1.1875rem)` para leads, `line-height: 1.6` en oscuro / `1.55` en claro): Párrafos explicativos, respuestas de FAQ y descripciones de rol, con ancho de línea acotado entre `58ch` y `66ch` y `text-wrap: pretty`.
- **Label** (`600`, `0.8125rem` / `0.75rem`, `letter-spacing: -0.015em`, `font-variant-numeric: tabular-nums`): Horarios de turno (`18:00`), fracciones de cupo (`14/16`), créditos (`2 / 3`), importes en pesos (`$ 48.000`), contadores de carrusel (`1 / 4`) e insignias de estado (`.badge`).

### Named Rules
**The Tabular Telemetry Rule.** Todo número que represente tiempo, capacidad, créditos, fechas de vigencia o dinero debe renderizarse en `JetBrains Mono` con `font-variant-numeric: tabular-nums` (`.tabular-nums`). Cuando un cupo cambia de `14/16` a `15/16` en vivo, el ancho de los caracteres permanece inmóvil sin desplazar el layout.

**The No-Kicker Rule.** Los encabezados de sección (`h1`, `h2`) entran directo con una afirmación operativa en `Bricolage Grotesque` sin cejas ni *eyebrow labels* en mayúsculas encima del título. Si un componente necesita contexto técnico, lo muestra en una barra de telemetría inferior o lateral, nunca como adorno sobre el titular.

## Layout

El sistema espacial se organiza sobre un contenedor fluido centrado (`.container`) con `max-width: 1240px` y un relleno horizontal de `20px` en mobile que se expande a `32px` a partir de `768px`. El ritmo vertical entre secciones principales es de `72px` en mobile y `96px` en desktop (`>= 960px`), separando bloques temáticos con una línea estructural superior de `1px solid var(--border-subtle)` (`.divider-top`).

En el primer viewport, el texto del hero (`.hero-copy`, `max-width: 840px`) se centra sobre una ventana fotográfica panorámica (`aspect-ratio: 16 / 9`, `max-height: 460px`). El tablero interactivo `.cockpit-shell` (`max-width: 1120px`) se encastra sobre el borde inferior de la fotografía mediante margen negativo (`margin-top: -40px` en mobile; `margin-top: -104px` en `>= 960px`), creando un puente físico entre el gimnasio y la interfaz.

Las grillas de contenido adaptan su densidad en tres puntos de quiebre principales:
- **Escenas y Modalidades (`.scenes-grid`, `.modality-grid`):** `1` columna en mobile (`gap: 16px–20px`) → `3` columnas iguales (`repeat(3, 1fr)`) a partir de `860px`.
- **Comparativa de Roles (`.roles-grid`):** Grilla abierta `1` columna en mobile → `2×2` (`repeat(2, 1fr)`) a partir de `860px`, permitiendo comparar permisos y límites de privacidad sin ocultar información detrás de pestañas.
- **Tablero y Demostraciones (`.cockpit-grid`, `.ops-slide-grid`, `.demo-layout`):** `1` columna en mobile → `2` columnas asimétricas (`1.5fr 1fr` en el tablero a `>= 960px`; `1fr 1.15fr` en el carrusel y formulario a `>= 900px`).

## Elevation & Depth

Centris aplica el modelo **"Structural Dock + Flat Tactile Cards"**: la profundidad mediante sombras proyectadas se reserva exclusivamente para el tablero operativo que flota encastrado sobre la fotografía panorámica del hero y para la cabecera fija con desenfoque de cristal (`backdrop-filter: blur(12px)`). Todo el resto de la interfaz permanece plano en reposo y construye su jerarquía mediante cuatro niveles tonales de superficie (`Recessed Well #0d0e10` → `Carbon Canvas #09090b` → `Workbench Surface #111214` → `Elevated Slate #18191c`) delimitados por bordes nítidos de `1px`.

### Shadow Vocabulary
- **Hero Cockpit Structural Dock (`--shadow-dock-dark`)** (`box-shadow: 0 24px 56px rgba(0, 0, 0, 0.50)`): Uso exclusivo en `.cockpit-shell` en modo oscuro para despegar el tablero interactivo del borde inferior de la fotografía panorámica.
- **Hero Cockpit Daylight Dock (`--shadow-dock-light`)** (`box-shadow: 0 20px 48px rgba(9, 9, 11, 0.14)`): Equivalente en modo claro (`html.light .cockpit-shell`) para asentar la tarjeta blanca sobre el lienzo diurno.

### Named Rules
**The No-Nested-Card Rule.** Nunca se coloca una tarjeta con borde y fondo elevado dentro de otra tarjeta con borde. Dentro de `.cockpit-shell`, `.ops-viewport` o `.role-card`, las sub-regiones se separan mediante bordes divisorios simples de `1px solid var(--border-subtle)` (`.class-row`, `.desk-athlete-card`, `.rule-strip-row`) o pozos hundidos sin borde exterior redundante (`.live-log`).

**The Dual-Mode Panorama Vignette Rule.** La ventana fotográfica del hero utiliza un velo `.hero-panorama-frame::after` que funde su borde inferior con el color exacto del lienzo activo (`rgba(9, 9, 11, 0.86)` en modo oscuro y `rgba(244, 244, 245, 0.92)` en modo claro), garantizando que el encastre del tablero nunca deje una franja negra artificial en el tema diurno.

## Shapes

El lenguaje formal utiliza una escala de cuatro radios con propósito semántico fijo:
- **Contenedores estructurales y escénicos (`24px` — `--radius-hero`):** Aplicado a la ventana panorámica (`.hero-panorama-frame`), el tablero principal (`.cockpit-shell`), el visor del carrusel operativo (`.ops-viewport`) y el bloque de conversión final (`.demo-layout`). En el interior del tablero, el marco del celular simulado (`.phone-frame`) baja un escalón a `20px` para mantener concentricidad óptica.
- **Tarjetas de módulo y escenas (`16px` — `--radius-card`):** Aplicado a `.scene-card`, `.role-card`, `.modality-card` y `.faq-item`, con `overflow: hidden` cuando alojan imágenes al corte en su cabecera.
- **Controles táctiles e inputs (`12px` — `--radius-control`):** Aplicado a campos de formulario (`.field input`, `select`, `textarea`), consolas `.live-log`, contenedores de tabla (`.table-wrap`) y **botones utilitarios de solo ícono de `44×44px`** (`#theme-toggle` y `#mobile-menu-toggle`), dándoles silueta de tecla física (*squircle*).
- **Píldoras de acción, navegación y estado (`9999px` — `--radius-pill`):** Aplicado a todos los botones de acción con texto (`.btn`, `.sim-action-btn`, `.att-btn`), pestañas de navegación (`.cockpit-tab`, `.ops-pillar-btn`) e insignias de estado (`.badge`).

## Components

### Buttons
Botones táctiles y directos, con altura mínima obligatoria de `44px` en todos los tamaños para garantizar precisión en pantallas táctiles.
- **Shape:** Píldora completa (`9999px`) para botones con etiqueta de texto; tecla *squircle* (`12px`) de `44×44px` exactos para controles utilitarios de solo ícono (`.theme-toggle-btn`, `.mobile-menu-btn`).
- **Primary (`.btn-volt`):** Fondo **Signal Volt** (`#c1f429`), texto negro (`#000000`), `padding: 0 20px` (`0 16px` en `.btn-sm`), `font-weight: 600`.
- **Hover / Focus:** En `:hover`, `.btn-volt` cambia a `#aedf1b` con una micro-elevación `transform: translateY(-1px)` (`160ms cubic-bezier(0.16, 1, 0.3, 1)`). Todo foco de teclado aplica `:focus-visible` con `outline: 2px solid var(--accent-border)` y `outline-offset: 2px`.
- **Secondary / Ghost (`.btn-ghost`) & Simulation (`.sim-action-btn`):** `.btn-ghost` usa fondo `Workbench Surface` (`#111214`), texto primario y borde `1px solid #32343a`, pasando a `#18191c` y borde `#464952` en `:hover`. Los botones de simulación interactiva `.sim-action-btn.is-primary` reposan en tinte voltio (`rgba(193, 244, 41, 0.12)`) con borde y texto `#c1f429`, encendiendo el relleno sólido `#c1f429` con texto negro al pasar el cursor.

### Chips
Insignias compactas de telemetría (`.badge`) que comunican disponibilidad, vigencia o estado contable de un vistazo.
- **Style:** `border-radius: 9999px`, `min-height: 26px`, `padding: 3px 10px`, `font-size: 0.75rem`, `font-weight: 600`, con fondo translúcido al `10%–12%` y borde al `24%–28%` del tono semántico.
- **State:** Cuatro variantes cerradas: `.badge-mint` (habilitado / al día / con lugar), `.badge-amber` (moroso / pago parcial / últimos lugares), `.badge-coral` (completo / pago anulado) y `.badge-zinc` (metadato neutro como `Datos ilustrativos`).

### Cards / Containers
Contenedores sobrios y sin anidamiento que priorizan la comparación limpia de reglas y escenas.
- **Corner Style:** `16px` (`--radius-card`) en tarjetas de módulo y `24px` (`--radius-hero`) en contenedores protagonistas.
- **Background:** `Workbench Surface` (`#111214` en oscuro / `#ffffff` en claro) con barras de telemetría o cabeceras en `Recessed Well` (`#0d0e10` / `#f8f9fa`).
- **Shadow Strategy:** Planas por defecto (`box-shadow: none`); únicamente `.cockpit-shell` proyecta sombra estructural.
- **Border:** `1px solid var(--border-subtle)` (`#232428` / `#e4e4e7`) para tarjetas informativas; `1px solid var(--border-strong)` (`#32343a` / `#d4d4d8`) para contenedores interactivos.
- **Internal Padding:** `24px` estándar en tarjetas (`.role-card`, `.modality-card`, `.scene-body`), escalando a `36px–40px` en contenedores de sección ancha en desktop (`.ops-slide`, `.demo-layout`).

### Inputs / Fields
Campos de formulario robustos diseñados para evitar zoom involuntario en dispositivos móviles y dar respuesta inmediata de validación.
- **Style:** `min-height: 46px`, `padding: 10px 14px`, `border-radius: 12px` (`--radius-control`), borde `1px solid var(--border-strong)` y fondo hundido `var(--bg-inset)` (`#0d0e10` / `#f8f9fa`), con `font-size: 1rem` (`16px`) obligatorio.
- **Focus:** Transición a fondo `var(--bg-surface)` y borde `var(--accent-border)` (`#c1f429` en oscuro / `#3f6212` en claro).
- **Error / Disabled:** Cuando `aria-invalid="true"`, el borde cambia a **Alert Coral** (`var(--coral)`) y despliega un mensaje `.field-error` (`0.8125rem`) debajo del campo que se limpia automáticamente en el evento `input` / `change`.

### Navigation
Cabecera fija (`.site-header`) de `72px` de altura mínima con fondo translúcido (`rgba(9, 9, 11, 0.88)` en oscuro / `rgba(244, 244, 245, 0.90)` en claro), `backdrop-filter: blur(12px)` y borde inferior `1px solid var(--border-subtle)`.
- **Desktop (`>= 1024px`):** Isologotipo SVG adaptable a la izquierda (`.logo-ink` + `.logo-core`), lista horizontal de enlaces (`.nav-links a`, `min-height: 44px`, `0.9375rem`, color secundario que pasa a primario en `:hover`), tecla *squircle* `#theme-toggle` (`44×44px`) y CTA `.btn-volt.btn-sm` a la derecha.
- **Mobile (`< 1024px`) & Tablists:** Los enlaces se repliegan en un cajón `.mobile-drawer` controlado por `#mobile-menu-toggle` (`44×44px`, cierre con `Escape`, clic exterior o cambio de breakpoint). Los selectores internos (`.cockpit-tabs` y `#ops-rail`) implementan el patrón WAI-ARIA `role="tablist"` con `tabindex` rotativo y soporte completo de `ArrowLeft`, `ArrowRight`, `Home` y `End`.

### Panoramic Cockpit Dock & Scene Cards
- **Panoramic Cockpit Dock (`.hero-panorama-stage` + `.cockpit-shell`):** El componente insignia del primer viewport. Muestra una fotografía real del box en proporción `16:9` y ancla sobre su tercio inferior el tablero interactivo de 3 pestañas (*Clases y cupos*, *Caja y morosos*, *Celular del atleta*) con estado sincronizado en vivo entre mostrador y teléfono móvil.
- **Documentary Scene Cards (`.scene-card`):** Tarjeta compuesta por una fotografía documental `16:10` (`.scene-media`), una franja intermedia de telemetría (`.scene-telemetry` en `#0d0e10` con rol e insignia semántica) y un cuerpo conciso (`.scene-body` con título `Bricolage Grotesque` y descripción de máximo 2 oraciones).

## Do's and Don'ts

### Do:
- **Do** reservar el fondo sólido **Signal Volt** (`#c1f429`) con texto negro (`#000000`) exclusivamente para los botones de conversión primaria (`.btn-volt`) y el `.skip-link`.
- **Do** aplicar `.tabular-nums` (`JetBrains Mono`, `font-variant-numeric: tabular-nums`) en cada horario (`18:00`), cupo (`14/16`), saldo (`$ 28.000`), crédito (`2 / 3`) y vigencia (`01/11 – 30/11`).
- **Do** mantener un área táctil mínima de `44×44px` en todo botón, pestaña, enlace de navegación y control de formulario, y `font-size: 1rem` (`16px`) en todos los `<input>`, `<select>` y `<textarea>`.
- **Do** sincronizar el estado entre las vistas interactivas cuando representen la misma entidad operativa (como la reserva de Sofía Peralta en `18:00 Funcional` entre recepción y el celular del atleta).
- **Do** embeber la procedencia (`impeccable embed-prompt`) en cada activo fotográfico dentro de `assets/` y verificar que ningún texto de interfaz esté horneado dentro de los píxeles JPEG/PNG.

### Don't:
- **Don't** anidar tarjetas con borde y fondo propio dentro de otras tarjetas con borde (`nested-cards`); usá divisores horizontales/verticales de `1px solid var(--border-subtle)` o pozos tonales (`var(--bg-inset)`).
- **Don't** agregar *eyebrows* o *kickers* en mayúsculas encima de los titulares `h1` y `h2`.
- **Don't** ocultar información comparativa clave (como los 4 roles del sistema) detrás de pestañas cuando puede mostrarse en una grilla abierta 2×2 (`.roles-grid`).
- **Don't** prometer ni sugerir en interfaz o copy funciones fuera del alcance deliberado de Centris (pasarelas de cobro automático, listas de espera automáticas o pizarras sociales de WODs/PRs), ni inventar testimonios o métricas de clientes inexistentes.
