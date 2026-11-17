# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Comprador y decisor principal (audiencia del sitio comercial):** Dueños, socios y coordinadores generales de boxes de CrossFit, centros de entrenamiento funcional y gimnasios boutique (especialmente centros en crecimiento de ~50 a 200+ atletas o con más de una sede en Argentina y el mercado hispanohablante) que necesitan dejar atrás la gestión manual con cuadernos, planillas de Excel y reservas por WhatsApp.
- **Usuarios operativos dentro del sistema Centris (cuatro roles combinables bajo una sola cuenta por persona):**
  - **Administrador (Dueño o coordinador):** Configura el box (zona horaria, reglas de anticipación y cancelación), define el catálogo de planes, tipos de clase y horarios recurrentes, administra afiliaciones/permisos del equipo, ejecuta bajas anticipadas y audita o anula cobros con motivo obligatorio.
  - **Recepcionista (Atención en mostrador):** Resuelve el flujo diario de puerta y mostrador; da de alta atletas, asigna y renueva membresías sin solapar fechas, registra pagos totales o parciales, suma créditos extra puntuales, controla el listado de morosos y anota reservas espontáneas en mostrador sin editar precios base ni borrar cobros anteriores.
  - **Coach (Piso de entrenamiento):** Consulta desde el celular o tablet únicamente sus clases asignadas y la nómina de inscriptos, marca presentes/ausentes en un toque y corrige asistencias dentro de las 24 horas posteriores al fin de la clase, sin acceso a precios, saldos ni caja.
  - **Atleta (Autogestión desde el navegador móvil):** Activa su contraseña en el primer ingreso con su email (sin instalar aplicaciones nativas), consulta cupos reales en la grilla, reserva o cancela clases según la ventana configurada y revisa sus créditos disponibles, vigencia e historial de pagos.

## Product Purpose

Centris es el sistema operativo diario para boxes y centros de entrenamiento que unifica en un solo flujo los horarios recurrentes, las reservas de atletas con control estricto de cupo, la asistencia del coach en piso y la caja auditable del mostrador.

Este repositorio (`centris-landing`) es el sitio comercial público de Centris. Su propósito es demostrar con claridad y prueba interactiva cómo funciona la operación real del sistema y convertir el interés de dueños de boxes en una solicitud de demostración guiada de 20 minutos con acompañamiento de puesta en marcha.

## Positioning

Centris resuelve la fricción real del mostrador y la hora pico en gimnasios de entrenamiento por turnos mediante cuatro mecanismos operativos que lo diferencian de planillas improvisadas o software genérico de gimnasios:

1. **Habilitación deportiva desacoplada del saldo contable:** La posibilidad de reservar y asistir a clase depende de tener una membresía vigente con créditos disponibles, no de haber saldado el 100% del pago en ese instante. La deuda queda registrada en Caja y en el listado de morosos para cobrarla en mostrador sin frenar al atleta habitual en la puerta.
2. **Caja inmutable y auditable sin borrados silenciosos:** Ningún recepcionista ni administrador puede editar ni eliminar un cobro registrado. Cualquier corrección por error de carga requiere una anulación ejecutada por un Administrador con motivo obligatorio y rastro de autoría, recalculando el saldo automáticamente.
3. **Cuatro roles separados y componibles con privacidad financiera:** Una misma persona usa una única cuenta por email (incluso entre múltiples sedes/boxes) y puede combinar roles (ej. Administrador + Coach en un box chico, o Coach + Atleta), pero un Coach puro jamás ve precios, saldos ni movimientos de caja al tomar asistencia.
4. **Reglas horarias y vigencias exactas en la hora local del box:** Las membresías congelan las reglas vigentes al momento de asignarse, las renovaciones se encadenan al día siguiente del vencimiento sin huecos ni superposiciones, las bajas anticipadas liberan reservas futuras en cascada y la suspensión de una clase restituye automáticamente los créditos consumidos.

## Operating Context

- **Ritmo diario de un box:** Horas pico de tarde/noche (ej. turnos de 18:00, 19:00, 20:00) con cupos físicos estrictos por sala, equipamiento o tarimas (ej. 12 a 16 atletas por turno).
- **Mostrador y piso en simultáneo:** Recepción atiende llegadas espontáneas, altas rápidas y cobros en efectivo, transferencia o posnet mientras el coach pasa lista desde el celular en el piso de entrenamiento.
- **Corte semanal y ventanas:** Períodos semanales de lunes a domingo en la zona horaria local del box (ej. `America/Argentina/Buenos_Aires`, GMT-3), con anticipación máxima de reserva y ventana de cancelación sin cargo configurables en minutos/días, más ventana de 24 horas post-clase para rectificar asistencia.
- **Puesta en marcha acompañada:** El alta de un box nuevo se realiza de forma asistida a partir de una demo de 20 minutos donde se modela la grilla y los planes reales del centro.

## Capabilities and Constraints

- **Tres modalidades de planes:**
  - *Semanal:* Cupo fijo de créditos por semana (lunes a domingo) sin acumulación entre semanas.
  - *Vigencia Total:* Bolsa fija de créditos para consumir libremente durante toda la vigencia del plan.
  - *Ilimitada:* Pase libre dentro de la vigencia, bloqueando únicamente reservas en horarios superpuestos.
- **Alcance funcional deliberado (lo que Centris NO hace y no debe prometerse):**
  - **Sin pasarela de cobro automático:** Los pagos se registran en mostrador (efectivo, transferencia, posnet/tarjeta) sin débitos automáticos ni comisiones por transacción.
  - **Sin listas de espera automáticas:** El cupo se asigna en tiempo real por orden de reserva; cuando alguien cancela, el lugar queda libre al instante en la grilla.
  - **Sin red social ni pizarra deportiva de WODs/PRs:** Centris no registra cargas, tiempos ni rankings de entrenamiento; su foco exclusivo es la operación de clases, cupos, membresías, asistencia y caja.
- **Restricciones comerciales y técnicas de la landing (`centris-landing`):**
  - Conversión centrada exclusivamente en solicitar una demo acompañada (`#pedir-demo`), sin tabla de precios públicos del software ni alta self-service desatendida.
  - El formulario de solicitud de demo opera actualmente en modo demostración con validación y simulación local en el navegador (sin backend conectado todavía).
  - Sitio estático autocontenido en HTML, CSS y JavaScript vanilla (`index.html`), desplegado en Netlify (`netlify.toml`), sin paso de compilación ni dependencias externas de runtime.

## Brand Commitments

- **Nombre:** Centris.
- **Idioma y voz:** Español rioplatense/argentino profesional, directo y operativo (`vos` / `ordená`, `probá`, `pedí`), hablado de igual a igual al dueño o coordinador de un box; evita jerga corporativa abstracta y promesas infladas.
- **Terminología del dominio a preservar:** *box*, *atleta*, *coach*, *recepcionista*, *administrador*, *mostrador*, *piso*, *grilla*, *cupo*, *créditos*, *membresía*, *vigencia*, *moroso*, *pago parcial*, *anulación con motivo*, *baja anticipada*, *cancelación en término / tardía*.
- **Activos de marca existentes:** Isologotipo vectorial SVG adaptable en `index.html` y `favicon.svg`, más íconos de aplicación (`favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `maskable-512.png`) y `site.webmanifest`.

## Evidence on Hand

- **Demostraciones interactivas reales de reglas del producto en `index.html`:**
  - Tablero operativo en el hero (`#demo-interactiva`) con tres vistas interactivas: *Clases y cupos* (simulación de reserva y liberación de cupo en mostrador + resumen de atleta con saldo pendiente habilitada para entrenar), *Caja y morosos* (tabla de estados contables con pagos al día, parciales y anulados) y *Celular del atleta* (simulación de reserva/cancelación móvil con descuento y devolución de crédito).
  - Slider operativo (`#operacion`) con cuatro micro-simulaciones de reglas: suspensión de clase con devolución automática de 14 créditos, baja anticipada con liberación de reservas futuras en cascada, toma de asistencia por coach con ventana de 24 h y rastro contable de pago anulado vs. pago firme.
  - Selector interactivo de los 4 roles (`#roles`) detallando permisos y límites de privacidad.
- **Evidencia ausente (prohibido fabricar):**
  - No existen testimonios de clientes terceros, logos de boxes clientes reales, casos de estudio, métricas comerciales de adopción ni precios públicos de suscripción. Ningún trabajo futuro debe inventarlos.

## Product Principles

1. **Demostrar reglas operativas antes que adjetivos:** Cada afirmación comercial debe apoyarse en el comportamiento verificable del sistema (qué pasa con el cupo, el crédito y el saldo en cada caso borde).
2. **Transparencia radical sobre el alcance:** Explicar con el mismo orgullo lo que Centris resuelve desde el día uno y lo que decide no hacer (sin pasarela de pago, sin lista de espera, sin pizarra de WODs) para atraer boxes alineados con el producto real.
3. **Respeto por la dinámica real del mostrador:** Priorizar flujos que no traben la puerta en hora pico (separar vigencia deportiva de deuda en caja, permitir reservas en mostrador y proteger la privacidad de caja frente al piso).
4. **Cero fricción de adopción para el equipo y el atleta:** Una sola cuenta multi-rol y multi-sede para el staff, y acceso móvil directo desde el navegador para el atleta sin exigir descargas.

## Accessibility & Inclusion

- Soporte completo de navegación por teclado, foco visible (`:focus-visible`), roles ARIA semánticos en pestañas (`role="tablist"` / `role="tab"` / `role="tabpanel"`), acordeones de preguntas frecuentes y regiones `aria-live="polite"` para anunciar cambios de simulación y validación de formulario.
- Áreas táctiles mínimas de `44x44px` en controles interactivos y tamaño mínimo de `16px` (`1rem`) en campos de formulario para prevenir zoom forzado en iOS Safari.
- Respeto por `prefers-reduced-motion: reduce` y soporte de tema oscuro (predeterminado) y tema claro de alto contraste con persistencia en `localStorage`.
