/**
 * PREDIMNSR-10 | LÓGICA DE CÁLCULO Y PREDIMENSIONAMIENTO
 * Desarrollado para el proyecto académico de Jose
 * Estudiante de Ingeniería Civil - 8vo Semestre
 * Universidad de la Costa (CUC) - Barranquilla, Atlántico, Colombia
 * Basado en la NSR-10 (Norma Sismo Resistente de Colombia)
 */

// ====================================================================
// 1. BASE DE DATOS DE MUNICIPIOS COLOMBIANOS (NSR-10 APÉNDICE A-4)
// ====================================================================
const CIUDADES_COLOMBIA = [
  { nombre: "Barranquilla (Atlántico)", depto: "Atlántico", Aa: 0.10, Av: 0.10, amenaza: "Intermedia", disipDefecto: "DMO", nota: "Ciudad sede CUC. Zona costera con ambiente marino moderado." },
  { nombre: "Soledad (Atlántico)", depto: "Atlántico", Aa: 0.10, Av: 0.10, amenaza: "Intermedia", disipDefecto: "DMO", nota: "Área metropolitana de Barranquilla." },
  { nombre: "Puerto Colombia (Atlántico)", depto: "Atlántico", Aa: 0.10, Av: 0.10, amenaza: "Intermedia", disipDefecto: "DMO", nota: "Zona costera directa, alta exposición a cloruros." },
  { nombre: "Cartagena (Bolívar)", depto: "Bolívar", Aa: 0.10, Av: 0.10, amenaza: "Intermedia", disipDefecto: "DMO", nota: "Zona costera caribeña." },
  { nombre: "Santa Marta (Magdalena)", depto: "Magdalena", Aa: 0.15, Av: 0.15, amenaza: "Intermedia", disipDefecto: "DMO", nota: "Cercanía a la Sierra Nevada, mayor aceleración que Barranquilla." },
  { nombre: "Valledupar (Cesar)", depto: "Cesar", Aa: 0.10, Av: 0.15, amenaza: "Intermedia", disipDefecto: "DMO", nota: "Valle del Cesar." },
  { nombre: "Montería (Córdoba)", depto: "Córdoba", Aa: 0.10, Av: 0.15, amenaza: "Intermedia", disipDefecto: "DMO", nota: "Región del Sinú." },
  { nombre: "Sincelejo (Sucre)", depto: "Sucre", Aa: 0.10, Av: 0.15, amenaza: "Intermedia", disipDefecto: "DMO", nota: "Sabanas de Sucre." },
  { nombre: "Bogotá D.C.", depto: "Cundinamarca", Aa: 0.15, Av: 0.20, amenaza: "Intermedia / Alta", disipDefecto: "DMO", nota: "Por altura de edificios y suelo blando frecuentemente se diseña DMO o DES." },
  { nombre: "Medellín (Antioquia)", depto: "Antioquia", Aa: 0.15, Av: 0.20, amenaza: "Intermedia / Alta", disipDefecto: "DMO", nota: "Valle de Aburrá. Microzonificación sísmica activa." },
  { nombre: "Cali (Valle del Cauca)", depto: "Valle", Aa: 0.25, Av: 0.25, amenaza: "Alta", disipDefecto: "DES", nota: "Falla de Romeral / subducción Pacífica. Obligatorio DES." },
  { nombre: "Bucaramanga (Santander)", depto: "Santander", Aa: 0.25, Av: 0.25, amenaza: "Alta", disipDefecto: "DES", nota: "Nido sísmico de Bucaramanga. Obligatorio DES." },
  { nombre: "Pereira (Risaralda)", depto: "Risaralda", Aa: 0.25, Av: 0.25, amenaza: "Alta", disipDefecto: "DES", nota: "Eje Cafetero. Falla activa. Obligatorio DES." },
  { nombre: "Manizales (Caldas)", depto: "Caldas", Aa: 0.25, Av: 0.25, amenaza: "Alta", disipDefecto: "DES", nota: "Eje Cafetero. Alta sismicidad y laderas complejas. DES." },
  { nombre: "Armenia (Quindío)", depto: "Quindío", Aa: 0.25, Av: 0.25, amenaza: "Alta", disipDefecto: "DES", nota: "Zona de alta sismicidad histórica (Sismo 1999). DES." },
  { nombre: "Cúcuta (Norte de Santander)", depto: "Norte de Santander", Aa: 0.35, Av: 0.30, amenaza: "Alta", disipDefecto: "DES", nota: "Falla de Boconó. Una de las zonas más sísmicas de Colombia." },
  { nombre: "Pasto (Nariño)", depto: "Nariño", Aa: 0.25, Av: 0.25, amenaza: "Alta", disipDefecto: "DES", nota: "Cercanía al volcán Galeras y fosa del Pacífico. DES." },
  { nombre: "Villavicencio (Meta)", depto: "Meta", Aa: 0.35, Av: 0.30, amenaza: "Alta", disipDefecto: "DES", nota: "Piedemonte llanero, falla frontal de la cordillera Oriental. DES." },
  { nombre: "Ibague (Tolima)", depto: "Tolima", Aa: 0.20, Av: 0.20, amenaza: "Intermedia / Alta", disipDefecto: "DMO", nota: "Cordillera Central." },
  { nombre: "Neiva (Huila)", depto: "Huila", Aa: 0.25, Av: 0.25, amenaza: "Alta", disipDefecto: "DES", nota: "Valle del Magdalena superior. DES." },
  { nombre: "Quibdó (Chocó)", depto: "Chocó", Aa: 0.35, Av: 0.35, amenaza: "Alta", disipDefecto: "DES", nota: "Zona de subducción del Pacífico, sismicidad muy alta. DES." },
  { nombre: "Leticia (Amazonas)", depto: "Amazonas", Aa: 0.05, Av: 0.05, amenaza: "Baja", disipDefecto: "DMI", nota: "Cuenca amazónica estable. Permite DMI." },
  { nombre: "Mitú (Vaupés)", depto: "Vaupés", Aa: 0.05, Av: 0.05, amenaza: "Baja", disipDefecto: "DMI", nota: "Escudo guayanés. Baja amenaza sísmica (DMI)." },
  { nombre: "San Andrés Isla", depto: "San Andrés", Aa: 0.10, Av: 0.10, amenaza: "Baja / Intermedia", disipDefecto: "DMI", nota: "Archipiélago caribeño." }
];

// Estado global de la aplicación
const AppState = {
  ciudad: CIUDADES_COLOMBIA[0],
  disipacion: "DMO", // DMI, DMO, DES
  grupoUso: "I",     // I, II, III, IV
  coefImportancia: 1.0,
  
  // Resultados actuales para el informe de impresión
  viga: {},
  columna: {},
  losaMaciza: {},
  losaAligerada: {}
};

// ====================================================================
// 2. INICIALIZACIÓN DEL APLICATIVO
// ====================================================================
document.addEventListener("DOMContentLoaded", () => {
  initCiudadesSelect();
  initTabs();
  initSlidersSync();
  initEventListeners();
  
  // Establecer fecha de reporte
  const dateEl = document.getElementById("print-date");
  if (dateEl) {
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString("es-CO", { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // Ejecución inicial de cálculos
  updateSeismicStatus();
  recalcViga();
  recalcColumna();
  recalcLosaMaciza();
  recalcLosaAligerada();
});

// Inicializar desplegable de ciudades
function initCiudadesSelect() {
  const sel = document.getElementById("select-ciudad");
  if (!sel) return;
  sel.innerHTML = "";
  
  CIUDADES_COLOMBIA.forEach((c, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = `${c.nombre} (Aa=${c.Aa.toFixed(2)}, Av=${c.Av.toFixed(2)})`;
    if (c.nombre.includes("Barranquilla")) {
      opt.selected = true;
    }
    sel.appendChild(opt);
  });
}

// Inicializar pestañas de navegación
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");
      
      // Remover clase activa de botones
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Ocultar todos los paneles y mostrar el seleccionado
      document.querySelectorAll(".tab-panel").forEach(panel => {
        panel.classList.remove("active");
      });
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add("active");
      }
    });
  });
}

// Helper global para botones de chips rápidos
window.setSlider = function(id, val) {
  const input = document.getElementById(id);
  if (input) {
    input.value = val;
    input.dispatchEvent(new Event("input"));
  }
};

// Sincronizar todos los range sliders con sus etiquetas numéricas
function initSlidersSync() {
  const sliders = [
    { id: "viga-luz", label: "viga-luz-val", fmt: (v) => parseFloat(v).toFixed(2), cb: recalcViga },
    { id: "viga-h-user", label: "viga-h-user-val", fmt: (v) => parseInt(v), cb: recalcViga },
    { id: "viga-b-user", label: "viga-b-user-val", fmt: (v) => parseInt(v), cb: recalcViga },

    { id: "col-pisos", label: "col-pisos-val", fmt: (v) => parseInt(v), cb: recalcColumna },
    { id: "col-area-trib", label: "col-area-trib-val", fmt: (v) => parseFloat(v).toFixed(1), cb: recalcColumna },
    { id: "col-c1-user", label: "col-c1-user-val", fmt: (v) => parseInt(v), cb: recalcColumna },
    { id: "col-c2-user", label: "col-c2-user-val", fmt: (v) => parseInt(v), cb: recalcColumna },

    { id: "losa-m-lx", label: "losa-m-lx-val", fmt: (v) => parseFloat(v).toFixed(2), cb: recalcLosaMaciza },
    { id: "losa-m-ly", label: "losa-m-ly-val", fmt: (v) => parseFloat(v).toFixed(2), cb: recalcLosaMaciza },
    { id: "losa-m-h-user", label: "losa-m-h-user-val", fmt: (v) => parseInt(v), cb: recalcLosaMaciza },

    { id: "losa-a-luz", label: "losa-a-luz-val", fmt: (v) => parseFloat(v).toFixed(2), cb: recalcLosaAligerada },
    { id: "losa-a-h-user", label: "losa-a-h-user-val", fmt: (v) => parseInt(v), cb: recalcLosaAligerada },
    { id: "losa-a-hf-user", label: "losa-a-hf-user-val", fmt: (v) => parseFloat(v).toFixed(1), cb: recalcLosaAligerada },
    { id: "losa-a-bw-user", label: "losa-a-bw-user-val", fmt: (v) => parseInt(v), cb: recalcLosaAligerada },
    { id: "losa-a-s-user", label: "losa-a-s-user-val", fmt: (v) => parseInt(v), cb: recalcLosaAligerada }
  ];

  sliders.forEach(s => {
    const el = document.getElementById(s.id);
    const lbl = document.getElementById(s.label);
    if (el && lbl) {
      el.addEventListener("input", (e) => {
        lbl.textContent = s.fmt(e.target.value);
        if (s.cb) s.cb();
      });
    }
  });
}

// Event Listeners generales
function initEventListeners() {
  // Cambio de ciudad
  const selCiudad = document.getElementById("select-ciudad");
  if (selCiudad) {
    selCiudad.addEventListener("change", (e) => {
      const idx = parseInt(e.target.value);
      AppState.ciudad = CIUDADES_COLOMBIA[idx];
      
      // Ajustar automáticamente la disipación recomendada
      const selDisip = document.getElementById("select-disipacion");
      if (selDisip) {
        selDisip.value = AppState.ciudad.disipDefecto;
        AppState.disipacion = AppState.ciudad.disipDefecto;
      }
      updateSeismicStatus();
      recalcAll();
    });
  }

  // Cambio manual de capacidad de disipación
  const selDisip = document.getElementById("select-disipacion");
  if (selDisip) {
    selDisip.addEventListener("change", (e) => {
      AppState.disipacion = e.target.value;
      updateSeismicStatus();
      recalcAll();
    });
  }

  // Grupo de Uso
  const selUso = document.getElementById("select-uso");
  if (selUso) {
    selUso.addEventListener("change", (e) => {
      AppState.grupoUso = e.target.value;
      const factores = { "I": 1.0, "II": 1.10, "III": 1.25, "IV": 1.50 };
      AppState.coefImportancia = factores[AppState.grupoUso] || 1.0;
      updateSeismicStatus();
      recalcAll();
    });
  }

  // Selects de Vigas
  ["viga-apoyo", "viga-fc", "viga-fy", "viga-particion"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", recalcViga);
  });

  // Selects de Columnas
  ["col-tipo", "col-carga-piso", "col-fc", "col-forma"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", () => {
      if (id === "col-forma") toggleColumnaFormaInputs();
      recalcColumna();
    });
  });

  // Selects de Losa Maciza
  ["losa-m-apoyo", "losa-m-fc", "losa-m-fy"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", recalcLosaMaciza);
  });

  // Selects de Losa Aligerada
  ["losa-a-apoyo", "losa-a-aligerante"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", recalcLosaAligerada);
  });

  // Botón Exportar Informe / Imprimir
  const btnPrint = document.getElementById("btn-print-summary");
  if (btnPrint) {
    btnPrint.addEventListener("click", generatePrintReport);
  }
}

function recalcAll() {
  recalcViga();
  recalcColumna();
  recalcLosaMaciza();
  recalcLosaAligerada();
}

// Actualizar barra de estado sísmico
function updateSeismicStatus() {
  const lblCiudad = document.getElementById("lbl-ciudad-nombre");
  const lblParams = document.getElementById("lbl-seismic-params");
  const badgeDot = document.querySelector("#seismic-status-badge .badge-indicator");
  
  if (lblCiudad) lblCiudad.textContent = AppState.ciudad.nombre;
  if (lblParams) {
    lblParams.textContent = `Aa = ${AppState.ciudad.Aa.toFixed(2)} | Av = ${AppState.ciudad.Av.toFixed(2)} | Amenaza ${AppState.ciudad.amenaza} | Sistema: ${AppState.disipacion} (I = ${AppState.coefImportancia.toFixed(2)})`;
  }

  if (badgeDot) {
    badgeDot.className = "badge-indicator";
    if (AppState.disipacion === "DMI") badgeDot.classList.add("dmi-bg");
    else if (AppState.disipacion === "DMO") badgeDot.classList.add("dmo-bg");
    else badgeDot.classList.add("des-bg");
  }

  const printSeismic = document.getElementById("print-seismic-info");
  if (printSeismic) {
    printSeismic.textContent = `${AppState.ciudad.nombre} • ${AppState.disipacion} (Aa=${AppState.ciudad.Aa.toFixed(2)}, Av=${AppState.ciudad.Av.toFixed(2)}, Grupo ${AppState.grupoUso})`;
  }
}

// Ocultar o mostrar inputs de columna según forma
function toggleColumnaFormaInputs() {
  const forma = document.getElementById("col-forma").value;
  const c2Container = document.getElementById("col-c2-container");
  const lblC1 = document.querySelector("label[for='col-c1-user']");
  
  if (forma === "cuadrada") {
    if (c2Container) c2Container.style.display = "none";
    if (lblC1) lblC1.textContent = "Lado Adoptado (c):";
  } else if (forma === "rectangular") {
    if (c2Container) c2Container.style.display = "flex";
    if (lblC1) lblC1.textContent = "Dimensión c₁ (b):";
  } else if (forma === "circular") {
    if (c2Container) c2Container.style.display = "none";
    if (lblC1) lblC1.textContent = "Diámetro Adoptado (D):";
  }
}

// ====================================================================
// 3. MÓDULO 1: PREDIMENSIONAMIENTO DE VIGAS
// ====================================================================
function recalcViga() {
  const luz = parseFloat(document.getElementById("viga-luz").value); // metros
  const factorApoyo = parseFloat(document.getElementById("viga-apoyo").value);
  const fc = parseFloat(document.getElementById("viga-fc").value);
  const fy = parseFloat(document.getElementById("viga-fy").value);
  const particion = document.getElementById("viga-particion").value;

  const hUser = parseInt(document.getElementById("viga-h-user").value); // cm
  const bUser = parseInt(document.getElementById("viga-b-user").value); // cm

  // 1. Peralte mínimo normativo según Tabla C.9.5(a)
  // Para fy != 420 MPa, multiplicar por (0.4 + fy / 700)
  const factorFy = (fy === 420) ? 1.0 : (0.4 + (fy / 700));
  const hMinNormaM = (luz / factorApoyo) * factorFy; // en metros
  const hMinNormaCm = hMinNormaM * 100;

  // 2. Peralte práctico recomendado para Colombia (control de fisuración en mampostería)
  let hSugCm = Math.ceil(hMinNormaCm / 5) * 5; // Múltiplo de 5 cm superior
  if (particion === "fragil") {
    // Para particiones de mampostería en Colombia se sugiere peralte entre L/10 y L/12
    const hFragilMin = (luz / 12) * 100;
    const hFragilSug = Math.ceil(hFragilMin / 5) * 5;
    hSugCm = Math.max(hSugCm, hFragilSug);
  }

  // 3. Base mínima según grado de disipación sísmica (NSR-10 C.21)
  let bMinCm = 20.0;
  let artNorma = "NSR-10 C.9";
  let disipTag = AppState.disipacion;

  if (AppState.disipacion === "DMI") {
    bMinCm = 15.0; // Práctica constructiva común mínima
    artNorma = "NSR-10 Título C.9";
  } else if (AppState.disipacion === "DMO") {
    bMinCm = 20.0; // NSR-10 C.21.3.5.1
    artNorma = "NSR-10 C.21.3.5.1 (bw ≥ 200 mm)";
  } else if (AppState.disipacion === "DES") {
    bMinCm = 25.0; // NSR-10 C.21.5.1.1
    artNorma = "NSR-10 C.21.5.1.1 (bw ≥ 250 mm)";
  }

  // Base sugerida por relación de aspecto b ≈ h / 2 o b ≈ 0.5 * h
  let bSugCm = Math.max(bMinCm, Math.ceil((hSugCm * 0.5) / 5) * 5);
  // Verificar que cumpla relación bw / h >= 0.30
  if (bSugCm / hSugCm < 0.30) {
    bSugCm = Math.ceil((hSugCm * 0.30) / 5) * 5;
  }

  // Actualizar KPIs en interfaz
  document.getElementById("res-viga-hmin").textContent = `${hMinNormaCm.toFixed(1)} cm`;
  document.getElementById("res-viga-hmin-formula").textContent = `L / ${factorApoyo}` + (factorFy !== 1 ? ` × factor fy` : "");
  document.getElementById("res-viga-hsug").textContent = `${hSugCm.toFixed(0)} cm`;
  document.getElementById("res-viga-bmin").textContent = `${bMinCm.toFixed(1)} cm`;
  document.getElementById("res-viga-disip-tag").textContent = disipTag;
  document.getElementById("res-viga-bmin-articulo").textContent = artNorma;
  document.getElementById("res-viga-bsug").textContent = `${bSugCm.toFixed(0)} cm`;

  // Evaluaciones de Cumplimiento
  const checks = [];
  const checksEl = document.getElementById("viga-checks-list");

  // Check 1: Peralte adoptado vs norma
  if (hUser >= hMinNormaCm) {
    checks.push({
      status: "pass",
      icon: "✓",
      msg: `<strong>Peralte Suficiente:</strong> h = ${hUser} cm ≥ ${hMinNormaCm.toFixed(1)} cm mínimo reglamentario (NSR-10 Tabla C.9.5(a)). Controla deflexiones elásticas.`
    });
  } else {
    checks.push({
      status: "fail",
      icon: "✕",
      msg: `<strong>Peralte Insuficiente:</strong> h = ${hUser} cm < ${hMinNormaCm.toFixed(1)} cm mínimo. Puede presentar deflexiones excesivas y agrietamiento.`
    });
  }

  // Check 2: Base adoptada vs requerimiento sísmico C.21
  if (bUser >= bMinCm) {
    checks.push({
      status: "pass",
      icon: "✓",
      msg: `<strong>Ancho Conforme (${disipTag}):</strong> bw = ${bUser} cm ≥ ${bMinCm.toFixed(0)} cm exigido por la NSR-10 (${artNorma}).`
    });
  } else {
    checks.push({
      status: "fail",
      icon: "✕",
      msg: `<strong>Ancho No Conforme (${disipTag}):</strong> bw = ${bUser} cm es menor a los ${bMinCm.toFixed(0)} cm mínimos obligatorios para ${disipTag} (${artNorma}).`
    });
  }

  // Check 3: Relación de aspecto bw / h >= 0.30
  const relacionAspecto = bUser / hUser;
  if (relacionAspecto >= 0.30) {
    checks.push({
      status: "pass",
      icon: "✓",
      msg: `<strong>Relación geométrica adecuada:</strong> bw / h = ${relacionAspecto.toFixed(2)} ≥ 0.30 (Evita pandeo lateral del alma).`
    });
  } else {
    checks.push({
      status: "warn",
      icon: "⚠",
      msg: `<strong>Sección muy esbelta:</strong> bw / h = ${relacionAspecto.toFixed(2)} < 0.30. La NSR-10 C.21.3.5 / C.21.5.1 exige relación mínima de 0.30 en DMO y DES.`
    });
  }

  // Check 4: Verificación luz libre ln >= 4d
  const dEstimado = hUser - 5; // asumiendo recubrimiento de 5cm
  const luzCm = luz * 100;
  if (luzCm >= 4 * dEstimado) {
    checks.push({
      status: "pass",
      icon: "✓",
      msg: `<strong>Comportamiento a flexión pura:</strong> Luz libre ln ≈ ${luzCm.toFixed(0)} cm ≥ 4d (${(4 * dEstimado).toFixed(0)} cm). El elemento actúa como viga esbelta y no como viga de gran peralte.`
    });
  } else {
    checks.push({
      status: "warn",
      icon: "⚠",
      msg: `<strong>Alerta Viga de Gran Peralte:</strong> ln < 4d. Debe diseñarse bajo los requisitos de vigas de gran peralte (NSR-10 C.10.7 o Apéndice C-A Bielas y Tirantes).`
    });
  }

  renderChecks(checksEl, checks);

  // Consejos Constructivos
  const adviceEl = document.getElementById("viga-advice-box");
  const pesoPropioViga = (bUser / 100) * (hUser / 100) * 24; // kN/m
  adviceEl.innerHTML = `
    <div class="advice-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      Recomendaciones Constructivas para ${AppState.ciudad.nombre}
    </div>
    <div class="advice-text">
      • <strong>Peso propio estimado:</strong> ≈ <strong>${pesoPropioViga.toFixed(2)} kN/m</strong> (concreto densidad 24 kN/m³).<br>
      • <strong>Recubrimiento mínimo libre (NSR-10 C.7.7):</strong> En vigas no expuestas al intemperie: 4.0 cm. Para exteriores en la costa (ambiente salino en Barranquilla): mínimo 5.0 cm a los estribos.<br>
      • <strong>Encuentro Viga-Columna:</strong> El ancho de la viga (${bUser} cm) no debe exceder el ancho de la columna de apoyo más 0.75h a cada lado (NSR-10 C.21).
    </div>
  `;

  // Renderizar esquema SVG
  drawSvgViga(bUser, hUser);

  // Guardar estado para reporte
  AppState.viga = {
    luz, factorApoyo, hMinNormaCm, hSugCm, bMinCm, bSugCm, hUser, bUser,
    cumple: hUser >= hMinNormaCm && bUser >= bMinCm,
    pesoPropioViga
  };
}

// Dibujar corte transversal de la viga en SVG
function drawSvgViga(b, h) {
  const svg = document.getElementById("svg-viga");
  if (!svg) return;

  const maxW = 320, maxH = 220;
  const paddingX = 65, paddingY = 35;
  const availW = maxW - 2 * paddingX;
  const availH = maxH - 2 * paddingY;

  // Escalar para que quepa bien en el viewport
  const scale = Math.min(availW / b, availH / h);
  const drawW = b * scale;
  const drawH = h * scale;
  const startX = (maxW - drawW) / 2 + 10;
  const startY = (maxH - drawH) / 2 - 5;

  // Recubrimiento gráfico a escala
  const rec = Math.max(4, 4 * scale);

  svg.innerHTML = `
    <!-- Fondo suave -->
    <rect width="${maxW}" height="${maxH}" fill="#f8fafc" rx="8" />

    <!-- Sección de concreto -->
    <rect x="${startX}" y="${startY}" width="${drawW}" height="${drawH}" 
          fill="#cbd5e1" stroke="#334155" stroke-width="2" rx="2" />

    <!-- Trama o achurado simbólico de concreto -->
    <rect x="${startX + 2}" y="${startY + 2}" width="${drawW - 4}" height="${drawH - 4}" 
          fill="rgba(148, 163, 184, 0.25)" />

    <!-- Estribo cerrado -->
    <rect x="${startX + rec}" y="${startY + rec}" width="${Math.max(1, drawW - 2 * rec)}" height="${Math.max(1, drawH - 2 * rec)}" 
          fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="0" rx="3" />

    <!-- Barras longitudinales en esquinas (círculos) -->
    <circle cx="${startX + rec + 4}" cy="${startY + rec + 4}" r="3.5" fill="#1e3a8a" />
    <circle cx="${startX + drawW - rec - 4}" cy="${startY + rec + 4}" r="3.5" fill="#1e3a8a" />
    <circle cx="${startX + rec + 4}" cy="${startY + drawH - rec - 4}" r="4" fill="#1e3a8a" />
    <circle cx="${startX + drawW - rec - 4}" cy="${startY + drawH - rec - 4}" r="4" fill="#1e3a8a" />
    <!-- Barras inferiores intermedias si el ancho es amplio -->
    ${b >= 35 ? `<circle cx="${startX + drawW / 2}" cy="${startY + drawH - rec - 4}" r="4" fill="#1e3a8a" />` : ""}

    <!-- Cota horizontal (Base bw) -->
    <line x1="${startX}" y1="${startY + drawH + 15}" x2="${startX + drawW}" y2="${startY + drawH + 15}" stroke="#1e293b" stroke-width="1.5" />
    <line x1="${startX}" y1="${startY + drawH + 10}" x2="${startX}" y2="${startY + drawH + 20}" stroke="#1e293b" stroke-width="1.5" />
    <line x1="${startX + drawW}" y1="${startY + drawH + 10}" x2="${startX + drawW}" y2="${startY + drawH + 20}" stroke="#1e293b" stroke-width="1.5" />
    <text x="${startX + drawW / 2}" y="${startY + drawH + 28}" font-size="11" font-family="'JetBrains Mono', monospace" font-weight="700" fill="#0f172a" text-anchor="middle">b = ${b} cm</text>

    <!-- Cota vertical (Peralte h) -->
    <line x1="${startX - 18}" y1="${startY}" x2="${startX - 18}" y2="${startY + drawH}" stroke="#1e293b" stroke-width="1.5" />
    <line x1="${startX - 23}" y1="${startY}" x2="${startX - 13}" y2="${startY}" stroke="#1e293b" stroke-width="1.5" />
    <line x1="${startX - 23}" y1="${startY + drawH}" x2="${startX - 13}" y2="${startY + drawH}" stroke="#1e293b" stroke-width="1.5" />
    <text x="${startX - 26}" y="${startY + drawH / 2 + 4}" font-size="11" font-family="'JetBrains Mono', monospace" font-weight="700" fill="#0f172a" text-anchor="end">h = ${h} cm</text>
  `;
}

// ====================================================================
// 4. MÓDULO 2: PREDIMENSIONAMIENTO DE COLUMNAS
// ====================================================================
function recalcColumna() {
  const tipo = document.getElementById("col-tipo").value; // interior, borde, esquina
  const numPisos = parseInt(document.getElementById("col-pisos").value);
  const areaTrib = parseFloat(document.getElementById("col-area-trib").value); // m2
  const cargaPiso = parseFloat(document.getElementById("col-carga-piso").value); // kN/m2
  const fc = parseFloat(document.getElementById("col-fc").value); // MPa
  const forma = document.getElementById("col-forma").value; // cuadrada, rectangular, circular

  const c1User = parseInt(document.getElementById("col-c1-user").value); // cm
  const c2User = parseInt(document.getElementById("col-c2-user").value); // cm

  // 1. Carga axial de servicio acumulada en la base de la columna (Ps)
  // Ps = Atrib * q_piso * N_pisos
  const psKn = areaTrib * cargaPiso * numPisos;
  const psTon = psKn / 9.80665;

  // 2. Coeficiente de predimensionamiento sísmico (k)
  // Ag_req = Ps / (k * f'c)
  // Depende de la ubicación (excentricidad/momentos sísmicos) y del grado de disipación
  let kFact = 0.38; // Por defecto DMO interior
  if (AppState.disipacion === "DMI") {
    if (tipo === "interior") kFact = 0.45;
    else if (tipo === "borde") kFact = 0.35;
    else kFact = 0.28; // esquina
  } else if (AppState.disipacion === "DMO") {
    if (tipo === "interior") kFact = 0.38;
    else if (tipo === "borde") kFact = 0.30;
    else kFact = 0.24; // esquina
  } else if (AppState.disipacion === "DES") {
    // En DES la demanda sísmica y los momentos biaxiales son severos
    if (tipo === "interior") kFact = 0.30;
    else if (tipo === "borde") kFact = 0.25;
    else kFact = 0.20; // esquina
  }

  // Si el grupo de uso es esencial (III o IV), castigar ligeramente la sección por importancia
  const kAjustado = kFact / Math.sqrt(AppState.coefImportancia);

  // 3. Área gruesa requerida Ag_req (cm²)
  // Ps en kN -> 1 MPa = 0.1 kN/cm² => fc en kN/cm² = fc * 0.1
  const fcKnCm2 = fc * 0.1;
  const agReqCm2 = psKn / (kAjustado * fcKnCm2);

  // 4. Dimensiones mínimas reglamentarias según NSR-10 Título C.21
  let dimMinNormaCm = 20.0;
  let areaMinNormaCm2 = 400.0;
  let artNormaCol = "NSR-10 C.10.8";

  if (AppState.disipacion === "DMI") {
    dimMinNormaCm = 20.0;
    areaMinNormaCm2 = 400.0;
    artNormaCol = "NSR-10 C.10.8 (dim ≥ 20 cm, Ag ≥ 400 cm²)";
  } else if (AppState.disipacion === "DMO") {
    dimMinNormaCm = 25.0;
    areaMinNormaCm2 = 625.0; // 25x25 cm
    artNormaCol = "NSR-10 C.21.3.6.1 (dim ≥ 25 cm, Ag ≥ 625 cm²)";
  } else if (AppState.disipacion === "DES") {
    dimMinNormaCm = 30.0;
    areaMinNormaCm2 = 900.0; // 30x30 cm
    artNormaCol = "NSR-10 C.21.6.1 (dim ≥ 30 cm, Ag ≥ 900 cm², b/h ≥ 0.4)";
  }

  // 5. Sección sugerida comercial (redondeada a múltiplos de 5 cm)
  let seccSugTexto = "";
  let areaPropuestaCm2 = 0;

  if (forma === "cuadrada") {
    const ladoCalc = Math.sqrt(Math.max(agReqCm2, areaMinNormaCm2));
    const ladoSug = Math.max(dimMinNormaCm, Math.ceil(ladoCalc / 5) * 5);
    areaPropuestaCm2 = ladoSug * ladoSug;
    seccSugTexto = `${ladoSug} × ${ladoSug} cm`;
  } else if (forma === "rectangular") {
    // Ancho mínimo normativo y largo según Ag
    const bSug = dimMinNormaCm;
    const hCalc = Math.max(agReqCm2, areaMinNormaCm2) / bSug;
    const hSug = Math.max(dimMinNormaCm, Math.ceil(hCalc / 5) * 5);
    areaPropuestaCm2 = bSug * hSug;
    seccSugTexto = `${bSug} × ${hSug} cm`;
  } else if (forma === "circular") {
    const diamCalc = Math.sqrt((4 * Math.max(agReqCm2, areaMinNormaCm2)) / Math.PI);
    const diamSug = Math.max(dimMinNormaCm, Math.ceil(diamCalc / 5) * 5);
    areaPropuestaCm2 = Math.PI * Math.pow(diamSug / 2, 2);
    seccSugTexto = `Ø = ${diamSug} cm`;
  }

  // Datos adoptados por el usuario
  let areaAdoptadaCm2 = 0;
  let dimMenorUser = c1User;

  if (forma === "cuadrada") {
    areaAdoptadaCm2 = c1User * c1User;
    dimMenorUser = c1User;
  } else if (forma === "rectangular") {
    areaAdoptadaCm2 = c1User * c2User;
    dimMenorUser = Math.min(c1User, c2User);
  } else if (forma === "circular") {
    areaAdoptadaCm2 = Math.PI * Math.pow(c1User / 2, 2);
    dimMenorUser = c1User;
  }

  // Actualizar KPIs en interfaz
  document.getElementById("res-col-ps").textContent = `${psKn.toFixed(0)} kN`;
  document.getElementById("res-col-ps-ton").textContent = `≈ ${psTon.toFixed(1)} tonf`;
  document.getElementById("res-col-ag").textContent = `${Math.ceil(agReqCm2)} cm²`;
  document.getElementById("res-col-ag-formula").textContent = `k = ${kAjustado.toFixed(2)} (Zona ${AppState.disipacion})`;
  document.getElementById("res-col-secc-sug").textContent = seccSugTexto;
  document.getElementById("res-col-area-prop").textContent = `Área = ${Math.round(areaPropuestaCm2)} cm²`;
  document.getElementById("res-col-dim-min").textContent = `${dimMinNormaCm.toFixed(1)} cm`;
  document.getElementById("res-col-norma-art").textContent = artNormaCol;

  // Evaluaciones de Cumplimiento
  const checks = [];
  const checksEl = document.getElementById("col-checks-list");

  // Check 1: Área adoptada vs requerida por carga
  if (areaAdoptadaCm2 >= agReqCm2) {
    checks.push({
      status: "pass",
      icon: "✓",
      msg: `<strong>Capacidad Axial Suficiente:</strong> Ag = ${Math.round(areaAdoptadaCm2)} cm² ≥ ${Math.round(agReqCm2)} cm² requeridos para soportar la carga axial de ${numPisos} pisos más el sismo.`
    });
  } else {
    checks.push({
      status: "fail",
      icon: "✕",
      msg: `<strong>Área Insuficiente por Carga Axial:</strong> Ag adoptada (${Math.round(areaAdoptadaCm2)} cm²) es menor a los ${Math.round(agReqCm2)} cm² requeridos. Riesgo de aplastamiento o falla por compresión.`
    });
  }

  // Check 2: Dimensión mínima de lado vs norma
  if (dimMenorUser >= dimMinNormaCm) {
    checks.push({
      status: "pass",
      icon: "✓",
      msg: `<strong>Dimensión Mínima Conforme:</strong> Dimensión menor = ${dimMenorUser} cm ≥ ${dimMinNormaCm} cm exigidos para ${AppState.disipacion} (${artNormaCol}).`
    });
  } else {
    checks.push({
      status: "fail",
      icon: "✕",
      msg: `<strong>Violación de Dimensión Mínima (${AppState.disipacion}):</strong> La dimensión de ${dimMenorUser} cm es inferior al mínimo estricto de ${dimMinNormaCm} cm de la NSR-10 (${artNormaCol}).`
    });
  }

  // Check 3: Área mínima normativa
  if (areaAdoptadaCm2 >= areaMinNormaCm2) {
    checks.push({
      status: "pass",
      icon: "✓",
      msg: `<strong>Área Mínima Conforme:</strong> Ag = ${Math.round(areaAdoptadaCm2)} cm² ≥ ${areaMinNormaCm2} cm² requeridos normativamente.`
    });
  } else {
    checks.push({
      status: "fail",
      icon: "✕",
      msg: `<strong>Área Mínima No Conforme:</strong> Ag = ${Math.round(areaAdoptadaCm2)} cm² < ${areaMinNormaCm2} cm² mínimos requeridos para ${AppState.disipacion}.`
    });
  }

  // Check 4: En DES verificar relación de aspecto b/h >= 0.40
  if (forma === "rectangular" && AppState.disipacion === "DES") {
    const bRel = Math.min(c1User, c2User) / Math.max(c1User, c2User);
    if (bRel >= 0.40) {
      checks.push({
        status: "pass",
        icon: "✓",
        msg: `<strong>Relación de aspecto DES Conforme:</strong> b/h = ${bRel.toFixed(2)} ≥ 0.40 (NSR-10 C.21.6.1).`
      });
    } else {
      checks.push({
        status: "fail",
        icon: "✕",
        msg: `<strong>Relación de aspecto No Conforme en DES:</strong> b/h = ${bRel.toFixed(2)} < 0.40. Las columnas en zonas de amenaza alta no pueden ser excesivamente alargadas tipo muro.`
      });
    }
  }

  renderChecks(checksEl, checks);

  // Recomendaciones constructivas
  const adviceEl = document.getElementById("col-advice-box");
  adviceEl.innerHTML = `
    <div class="advice-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      Criterios Clave NSR-10 para Columnas (${AppState.ciudad.nombre})
    </div>
    <div class="advice-text">
      • <strong>Criterio de Columna Fuerte - Viga Débil (NSR-10 C.21):</strong> Para garantizar ductilidad, en los nudos la suma de momentos resistentes de las columnas debe superar al menos en un 20% a los de las vigas ($\sum M_{nc} \ge 1.2 \sum M_{nb}$). <em>No reduzca excesivamente la columna frente a la viga</em>.<br>
      • <strong>Cuantía de Acero Longitudinal (NSR-10 C.21):</strong> Debe oscilar entre el <strong>1.0% y 4.0%</strong> de $A_g$ (el límite superior en obra suele limitarse al 3% para evitar congestión en los nudos).<br>
      • <strong>Confinamiento de Estribos:</strong> En zonas DMO y DES, los extremos de la columna requieren estribos cerrados de confinamiento con espaciamientos estrechos ($s \approx 7.5 \text{ a } 10\text{ cm}$) en la zona de plastificación.
    </div>
  `;

  // Renderizar esquema SVG de columna
  drawSvgColumna(forma, c1User, c2User);

  // Guardar estado
  AppState.columna = {
    tipo, numPisos, areaTrib, cargaPiso, psKn, agReqCm2,
    forma, c1User, c2User, areaAdoptadaCm2, dimMinNormaCm,
    cumple: areaAdoptadaCm2 >= agReqCm2 && dimMenorUser >= dimMinNormaCm
  };
}

// Dibujar esquema de columna en SVG
function drawSvgColumna(forma, c1, c2) {
  const svg = document.getElementById("svg-columna");
  if (!svg) return;

  const maxW = 320, maxH = 220;
  const padding = 35;
  const availW = maxW - 2 * padding;
  const availH = maxH - 2 * padding;

  if (forma === "circular") {
    const diam = c1;
    const scale = Math.min(availW / diam, availH / diam);
    const r = (diam * scale) / 2;
    const cx = maxW / 2;
    const cy = maxH / 2 - 5;
    const rec = Math.max(4, 4 * scale);

    svg.innerHTML = `
      <rect width="${maxW}" height="${maxH}" fill="#f8fafc" rx="8" />
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#cbd5e1" stroke="#334155" stroke-width="2" />
      <circle cx="${cx}" cy="${cy}" r="${Math.max(2, r - rec)}" fill="none" stroke="#dc2626" stroke-width="2" />
      <!-- Barras longitudinales circulares (6 barras) -->
      ${[0, 60, 120, 180, 240, 300].map(ang => {
        const rad = (ang * Math.PI) / 180;
        const bx = cx + (r - rec - 4) * Math.cos(rad);
        const by = cy + (r - rec - 4) * Math.sin(rad);
        return `<circle cx="${bx}" cy="${by}" r="3.5" fill="#1e3a8a" />`;
      }).join("")}
      <!-- Cota Diámetro -->
      <line x1="${cx - r}" y1="${cy + r + 15}" x2="${cx + r}" y2="${cy + r + 15}" stroke="#1e293b" stroke-width="1.5" />
      <line x1="${cx - r}" y1="${cy + r + 10}" x2="${cx - r}" y2="${cy + r + 20}" stroke="#1e293b" stroke-width="1.5" />
      <line x1="${cx + r}" y1="${cy + r + 10}" x2="${cx + r}" y2="${cy + r + 20}" stroke="#1e293b" stroke-width="1.5" />
      <text x="${cx}" y="${cy + r + 28}" font-size="11" font-family="'JetBrains Mono', monospace" font-weight="700" fill="#0f172a" text-anchor="middle">Ø = ${diam} cm</text>
    `;
    return;
  }

  // Cuadrada o rectangular
  const w = (forma === "cuadrada") ? c1 : c1;
  const h = (forma === "cuadrada") ? c1 : c2;

  const scale = Math.min(availW / w, availH / h);
  const drawW = w * scale;
  const drawH = h * scale;
  const startX = (maxW - drawW) / 2 + 10;
  const startY = (maxH - drawH) / 2 - 5;
  const rec = Math.max(4, 4 * scale);

  svg.innerHTML = `
    <rect width="${maxW}" height="${maxH}" fill="#f8fafc" rx="8" />
    <rect x="${startX}" y="${startY}" width="${drawW}" height="${drawH}" fill="#cbd5e1" stroke="#334155" stroke-width="2" rx="2" />
    <rect x="${startX + rec}" y="${startY + rec}" width="${Math.max(1, drawW - 2 * rec)}" height="${Math.max(1, drawH - 2 * rec)}" fill="none" stroke="#dc2626" stroke-width="2" rx="3" />
    
    <!-- Barras en 4 esquinas -->
    <circle cx="${startX + rec + 4}" cy="${startY + rec + 4}" r="3.5" fill="#1e3a8a" />
    <circle cx="${startX + drawW - rec - 4}" cy="${startY + rec + 4}" r="3.5" fill="#1e3a8a" />
    <circle cx="${startX + rec + 4}" cy="${startY + drawH - rec - 4}" r="3.5" fill="#1e3a8a" />
    <circle cx="${startX + drawW - rec - 4}" cy="${startY + drawH - rec - 4}" r="3.5" fill="#1e3a8a" />
    <!-- Barras intermedias -->
    ${w >= 35 ? `<circle cx="${startX + drawW / 2}" cy="${startY + rec + 4}" r="3.5" fill="#1e3a8a" /><circle cx="${startX + drawW / 2}" cy="${startY + drawH - rec - 4}" r="3.5" fill="#1e3a8a" />` : ""}
    ${h >= 35 ? `<circle cx="${startX + rec + 4}" cy="${startY + drawH / 2}" r="3.5" fill="#1e3a8a" /><circle cx="${startX + drawW - rec - 4}" cy="${startY + drawH / 2}" r="3.5" fill="#1e3a8a" />` : ""}

    <!-- Cota horizontal -->
    <line x1="${startX}" y1="${startY + drawH + 15}" x2="${startX + drawW}" y2="${startY + drawH + 15}" stroke="#1e293b" stroke-width="1.5" />
    <line x1="${startX}" y1="${startY + drawH + 10}" x2="${startX}" y2="${startY + drawH + 20}" stroke="#1e293b" stroke-width="1.5" />
    <line x1="${startX + drawW}" y1="${startY + drawH + 10}" x2="${startX + drawW}" y2="${startY + drawH + 20}" stroke="#1e293b" stroke-width="1.5" />
    <text x="${startX + drawW / 2}" y="${startY + drawH + 28}" font-size="11" font-family="'JetBrains Mono', monospace" font-weight="700" fill="#0f172a" text-anchor="middle">c₁ = ${w} cm</text>

    <!-- Cota vertical -->
    <line x1="${startX - 18}" y1="${startY}" x2="${startX - 18}" y2="${startY + drawH}" stroke="#1e293b" stroke-width="1.5" />
    <line x1="${startX - 23}" y1="${startY}" x2="${startX - 13}" y2="${startY}" stroke="#1e293b" stroke-width="1.5" />
    <line x1="${startX - 23}" y1="${startY + drawH}" x2="${startX - 13}" y2="${startY + drawH}" stroke="#1e293b" stroke-width="1.5" />
    <text x="${startX - 26}" y="${startY + drawH / 2 + 4}" font-size="11" font-family="'JetBrains Mono', monospace" font-weight="700" fill="#0f172a" text-anchor="end">c₂ = ${h} cm</text>
  `;
}

// ====================================================================
// 5. MÓDULO 3: PREDIMENSIONAMIENTO DE LOSA MACIZA
// ====================================================================
function recalcLosaMaciza() {
  const lx = parseFloat(document.getElementById("losa-m-lx").value);
  const ly = parseFloat(document.getElementById("losa-m-ly").value);
  const apoyo = document.getElementById("losa-m-apoyo").value;
  const fc = parseFloat(document.getElementById("losa-m-fc").value);
  const fy = parseFloat(document.getElementById("losa-m-fy").value);
  const hUser = parseInt(document.getElementById("losa-m-h-user").value);

  // Determinar si trabaja en 1 o 2 direcciones
  const lMayor = Math.max(lx, ly);
  const lMenor = Math.min(lx, ly);
  const relacionLuz = lMayor / lMenor;
  const esDosDirecciones = relacionLuz <= 2.0;

  const infoTipo = document.getElementById("losa-m-tipo-comportamiento");
  if (infoTipo) {
    if (esDosDirecciones) {
      infoTipo.innerHTML = `Comportamiento: <strong>Losa en Dos Direcciones</strong> (Ly / Lx = ${relacionLuz.toFixed(2)} ≤ 2.0). Trabaja a flexión en ambos sentidos.`;
      infoTipo.className = "alert-info-box";
    } else {
      infoTipo.innerHTML = `Comportamiento: <strong>Losa en Una Dirección</strong> (Ly / Lx = ${relacionLuz.toFixed(2)} > 2.0). La carga se transmite hacia la luz corta (${lMenor.toFixed(2)} m).`;
      infoTipo.className = "alert-info-box";
    }
  }

  // Factores según condición de apoyo para 1 dirección (Tabla C.9.5(a))
  const factores1D = {
    "simplemente": 20.0,
    "un-continuo": 24.0,
    "ambos-continuos": 28.0,
    "voladizo": 10.0
  };

  const factorFy = (fy === 420) ? 1.0 : (0.4 + (fy / 700));

  let hCalcCm = 10.0;
  let formulaTexto = "";

  if (!esDosDirecciones || apoyo === "voladizo") {
    // Losa en una dirección (se usa la luz corta lMenor)
    const factorApoyo = factores1D[apoyo] || 24.0;
    hCalcCm = (lMenor / factorApoyo) * factorFy * 100;
    formulaTexto = `L corta / ${factorApoyo} (Tabla C.9.5(a))`;
  } else {
    // Losa en dos direcciones apoyada sobre vigas en los 4 bordes (NSR-10 C.9.5.3)
    // Criterio de predimensionamiento práctico: Perímetro / 180 (para bordes discontinuos) o Perímetro / 200
    const perimetroM = 2 * (lx + ly);
    let divisor = 180;
    if (apoyo === "ambos-continuos") divisor = 200;
    else if (apoyo === "simplemente") divisor = 160;
    
    hCalcCm = (perimetroM / divisor) * factorFy * 100;
    formulaTexto = `Perímetro / ${divisor}`;
  }

  // Mínimo constructivo recomendado en Colombia para entrepisos residenciales/comerciales
  const hMinConstructivo = 10.0; // cm
  const hSugCm = Math.max(hMinConstructivo, Math.ceil(hCalcCm));

  // Peso propio (concreto reforzado = 24 kN/m³)
  const pesoPropioKnM2 = (hUser / 100) * 24;

  // Acero de retracción y temperatura mínimo (NSR-10 C.7.12)
  // As_min = 0.0018 * b * h (para b = 100 cm = 1 m)
  const asMinCm2M = 0.0018 * 100 * hUser;

  // Actualizar interfaz
  document.getElementById("res-losa-m-hcalc").textContent = `${hCalcCm.toFixed(1)} cm`;
  document.getElementById("res-losa-m-formula").textContent = formulaTexto;
  document.getElementById("res-losa-m-hsug").textContent = `${hSugCm.toFixed(0)} cm`;
  document.getElementById("res-losa-m-peso").textContent = `${pesoPropioKnM2.toFixed(2)} kN/m²`;
  document.getElementById("res-losa-m-asmin").textContent = `${asMinCm2M.toFixed(2)} cm²/m`;

  // Evaluaciones de Cumplimiento
  const checks = [];
  const checksEl = document.getElementById("losa-m-checks-list");

  // Check 1: Espesor adoptado vs teórico
  if (hUser >= hCalcCm) {
    checks.push({
      status: "pass",
      icon: "✓",
      msg: `<strong>Espesor Suficiente:</strong> h = ${hUser} cm ≥ ${hCalcCm.toFixed(1)} cm calculado para control de deflexiones.`
    });
  } else {
    checks.push({
      status: "fail",
      icon: "✕",
      msg: `<strong>Espesor Insuficiente:</strong> h = ${hUser} cm < ${hCalcCm.toFixed(1)} cm. La losa puede presentar flexiones excesivas, fisuración y vibraciones molestas.`
    });
  }

  // Check 2: Mínimo constructivo
  if (hUser >= 10) {
    checks.push({
      status: "pass",
      icon: "✓",
      msg: `<strong>Espesor Constructivo Adecuado:</strong> h = ${hUser} cm ≥ 10 cm (Permite garantizar recubrimientos de 2.0 cm y el paso de tuberías eléctricas/sanitarias sin debilitar la sección).`
    });
  } else {
    checks.push({
      status: "warn",
      icon: "⚠",
      msg: `<strong>Espesor muy delgado (h < 10 cm):</strong> Difícil colocación de refuerzo doble y cruce de tuberías embebidas.`
    });
  }

  renderChecks(checksEl, checks);

  // Consejos constructivos
  const adviceEl = document.getElementById("losa-m-advice-box");
  adviceEl.innerHTML = `
    <div class="advice-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      Criterios de Diseño en Losa Maciza (NSR-10)
    </div>
    <div class="advice-text">
      • <strong>Armadura de Retracción y Fraguado (NSR-10 C.7.12):</strong> Mínimo <strong>${asMinCm2M.toFixed(2)} cm²/m</strong> en ambas direcciones (ej. Malla electrosoldada o varillas #3 c/20 cm).<br>
      • <strong>Recubrimiento Mínimo (NSR-10 C.7.7.1):</strong> 2.0 cm para losas no expuestas al intemperie.<br>
      • <strong>Comparación económica:</strong> Para luces mayores a 4.5 m, las losas macizas suelen resultar muy pesadas (${pesoPropioKnM2.toFixed(2)} kN/m²). En Barranquilla y Colombia se prefiere típicamente la <em>losa aligerada</em> para reducir masa sísmica en la estructura.
    </div>
  `;

  // Renderizar esquema SVG
  drawSvgLosaMaciza(hUser);

  // Guardar estado
  AppState.losaMaciza = {
    lx, ly, lMayor, lMenor, esDosDirecciones, apoyo, hCalcCm, hSugCm, hUser,
    pesoPropioKnM2, asMinCm2M,
    cumple: hUser >= hCalcCm && hUser >= 10
  };
}

// Dibujar corte transversal de la losa maciza
function drawSvgLosaMaciza(h) {
  const svg = document.getElementById("svg-losa-maciza");
  if (!svg) return;

  const maxW = 320, maxH = 180;
  const drawW = 240;
  const scale = 2.5;
  const drawH = Math.max(25, Math.min(65, h * scale));
  const startX = (maxW - drawW) / 2 + 10;
  const startY = (maxH - drawH) / 2;

  svg.innerHTML = `
    <rect width="${maxW}" height="${maxH}" fill="#f8fafc" rx="8" />
    <!-- Concreto de losa -->
    <rect x="${startX}" y="${startY}" width="${drawW}" height="${drawH}" fill="#cbd5e1" stroke="#334155" stroke-width="2" rx="1" />
    
    <!-- Armadura inferior longitudinal (puntos azules) -->
    ${[30, 60, 90, 120, 150, 180, 210].map(xOffset => 
      `<circle cx="${startX + xOffset}" cy="${startY + drawH - 8}" r="3" fill="#1e3a8a" />`
    ).join("")}
    
    <!-- Línea de acero transversal -->
    <line x1="${startX + 10}" y1="${startY + drawH - 12}" x2="${startX + drawW - 10}" y2="${startY + drawH - 12}" stroke="#dc2626" stroke-width="1.5" />
    <!-- Línea de acero superior por retracción -->
    <line x1="${startX + 10}" y1="${startY + 8}" x2="${startX + drawW - 10}" y2="${startY + 8}" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,3" />

    <!-- Cota de espesor -->
    <line x1="${startX - 18}" y1="${startY}" x2="${startX - 18}" y2="${startY + drawH}" stroke="#1e293b" stroke-width="1.5" />
    <line x1="${startX - 23}" y1="${startY}" x2="${startX - 13}" y2="${startY}" stroke="#1e293b" stroke-width="1.5" />
    <line x1="${startX - 23}" y1="${startY + drawH}" x2="${startX - 13}" y2="${startY + drawH}" stroke="#1e293b" stroke-width="1.5" />
    <text x="${startX - 26}" y="${startY + drawH / 2 + 4}" font-size="11" font-family="'JetBrains Mono', monospace" font-weight="700" fill="#0f172a" text-anchor="end">h = ${h} cm</text>
    
    <!-- Etiqueta de longitud representativa -->
    <text x="${startX + drawW / 2}" y="${startY + drawH + 20}" font-size="10" font-family="'Inter', sans-serif" fill="#64748b" text-anchor="middle">Tramo continuo de losa maciza</text>
  `;
}

// ====================================================================
// 6. MÓDULO 4: PREDIMENSIONAMIENTO DE LOSA ALIGERADA (NERVADA)
// ====================================================================
function recalcLosaAligerada() {
  const luz = parseFloat(document.getElementById("losa-a-luz").value);
  const factorApoyo = parseFloat(document.getElementById("losa-a-apoyo").value);
  const aligerante = document.getElementById("losa-a-aligerante").value;

  const hUser = parseInt(document.getElementById("losa-a-h-user").value);
  const hfUser = parseFloat(document.getElementById("losa-a-hf-user").value);
  const bwUser = parseInt(document.getElementById("losa-a-bw-user").value);
  const sUser = parseInt(document.getElementById("losa-a-s-user").value); // intereje

  // 1. Peralte total normativo según Tabla C.9.5(a) para nervaduras
  const hMinNormaCm = (luz / factorApoyo) * 100;
  // Redondeo comercial a múltiplo de 5 cm (alturas comerciales de formaleta: 25, 30, 35, 40 cm)
  const hSugCm = Math.max(25, Math.ceil(hMinNormaCm / 5) * 5);

  // 2. Espesor mínimo de la loseta superior (torta de compresión) (NSR-10 C.8.13.5.2)
  // hf >= 50 mm (5 cm) Y hf >= S_libre / 12
  const sLibreCm = sUser - bwUser; // Distancia libre entre caras de nervios
  const hfNormaMinCm = Math.max(5.0, sLibreCm / 12);
  const hfSugCm = Math.max(5.0, Math.ceil(hfNormaMinCm * 2) / 2); // múltiplos de 0.5 cm

  // 3. Riostras transversales (viguetas de repartición) según NSR-10 C.8.13.3.1
  let numRiostras = 0;
  let riostrasTexto = "No requerida";
  let riostrasSub = `Luz libre = ${luz.toFixed(2)} m ≤ 4.0 m`;

  if (luz > 6.0) {
    numRiostras = 2;
    riostrasTexto = "2 riostras intermedias";
    riostrasSub = `Obligatorias para L > 6.0 m (a los tercios)`;
  } else if (luz > 4.0) {
    numRiostras = 1;
    riostrasTexto = "1 riostra central";
    riostrasSub = `Obligatoria para L > 4.0 m (en el centro)`;
  }

  // 4. Peso propio aproximado del sistema aligerado
  // Área tributaria de un metro cuadrado:
  // Concreto: torta superior + nervios
  const volTortaM3M2 = hfUser / 100;
  const numNerviosPorMetro = 100 / sUser;
  const alturaNervioM = (hUser - hfUser) / 100;
  const anchoNervioM = bwUser / 100;
  const volNerviosM3M2 = numNerviosPorMetro * anchoNervioM * alturaNervioM;
  const volConcretoTotal = volTortaM3M2 + volNerviosM3M2;
  const pesoConcretoKn = volConcretoTotal * 24;

  let pesoAligeranteKn = 0.15; // icopor
  if (aligerante === "bloque") pesoAligeranteKn = 1.0;
  else if (aligerante === "guadua") pesoAligeranteKn = 0.35;
  else if (aligerante === "metalico") pesoAligeranteKn = 0.0;

  const pesoTotalKnM2 = pesoConcretoKn + pesoAligeranteKn;

  // Actualizar KPIs en interfaz
  document.getElementById("res-losa-a-hmin").textContent = `${hMinNormaCm.toFixed(1)} cm`;
  document.getElementById("res-losa-a-hsug").textContent = `${hSugCm.toFixed(0)} cm`;
  document.getElementById("res-losa-a-hfmin").textContent = `${hfNormaMinCm.toFixed(1)} cm`;
  document.getElementById("res-losa-a-riostras").textContent = riostrasTexto;
  document.getElementById("res-losa-a-riostras-sub").textContent = riostrasSub;

  // Evaluaciones de Cumplimiento
  const checks = [];
  const checksEl = document.getElementById("losa-a-checks-list");

  // Check 1: Altura total adoptada
  if (hUser >= hMinNormaCm) {
    checks.push({
      status: "pass",
      icon: "✓",
      msg: `<strong>Peralte Conforme:</strong> h = ${hUser} cm ≥ ${hMinNormaCm.toFixed(1)} cm mínimo (Tabla C.9.5(a)). Controla deflexiones elásticas y a largo plazo.`
    });
  } else {
    checks.push({
      status: "fail",
      icon: "✕",
      msg: `<strong>Peralte Insuficiente:</strong> h = ${hUser} cm < ${hMinNormaCm.toFixed(1)} cm. Riesgo alto de vibraciones molestas de entrepiso y flecha diferida excesiva.`
    });
  }

  // Check 2: Torta de compresión hf
  if (hfUser >= hfNormaMinCm) {
    checks.push({
      status: "pass",
      icon: "✓",
      msg: `<strong>Torta de Compresión Conforme:</strong> hf = ${hfUser.toFixed(1)} cm ≥ ${hfNormaMinCm.toFixed(1)} cm (NSR-10 C.8.13.5.2: mínimo 5.0 cm y S_libre/12 = ${(sLibreCm / 12).toFixed(1)} cm).`
    });
  } else {
    checks.push({
      status: "fail",
      icon: "✕",
      msg: `<strong>Torta de Compresión No Conforme:</strong> hf = ${hfUser.toFixed(1)} cm < ${hfNormaMinCm.toFixed(1)} cm requeridos (NSR-10 C.8.13.5.2). Puede fisurarse por flexión local de cargas concentradas.`
    });
  }

  // Check 3: Ancho del nervio bw >= 10 cm (NSR-10 C.8.13.2)
  if (bwUser >= 10) {
    checks.push({
      status: "pass",
      icon: "✓",
      msg: `<strong>Ancho de Nervio Adecuado:</strong> bw = ${bwUser} cm ≥ 10 cm reglamentarios (NSR-10 C.8.13.2).`
    });
  } else {
    checks.push({
      status: "fail",
      icon: "✕",
      msg: `<strong>Ancho de Nervio No Conforme:</strong> bw = ${bwUser} cm < 10 cm mínimos obligatorios según NSR-10 C.8.13.2.`
    });
  }

  // Check 4: Separación libre entre nervios S_libre <= 75 cm (NSR-10 C.8.13.1.1)
  if (sLibreCm <= 75) {
    checks.push({
      status: "pass",
      icon: "✓",
      msg: `<strong>Separación Libre Conforme:</strong> Distancia libre entre nervios = ${sLibreCm} cm ≤ 75 cm permitidos (NSR-10 C.8.13.1.1).`
    });
  } else {
    checks.push({
      status: "warn",
      icon: "⚠",
      msg: `<strong>Separación Excesiva:</strong> Distancia libre = ${sLibreCm} cm > 75 cm. Excede el límite de losa nervada estándar de la NSR-10 C.8.13.1.1.`
    });
  }

  renderChecks(checksEl, checks);

  // Consejos constructivos
  const adviceEl = document.getElementById("losa-a-advice-box");
  adviceEl.innerHTML = `
    <div class="advice-title">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      Práctica Constructiva en la Región Caribe (${AppState.ciudad.nombre})
    </div>
    <div class="advice-text">
      • <strong>Peso del Sistema Aligerado:</strong> ≈ <strong>${pesoTotalKnM2.toFixed(2)} kN/m²</strong> (¡Ahorro de ~${((1 - pesoTotalKnM2 / ((hUser/100)*24)) * 100).toFixed(0)}% de peso frente a losa maciza de igual peralte!).<br>
      • <strong>Malla de Refuerzo en la Torta:</strong> Colocar malla electrosoldada (ej. XX-106 o XX-159) en el tercio superior de la loseta de ${hfUser} cm para controlar fisuración por temperatura.<br>
      • <strong>Casetón de Poliestireno (Icopor):</strong> Es la opción más empleada en Barranquilla por su facilidad de izaje, ligereza y excelente comportamiento térmico ante el calor tropical.
    </div>
  `;

  // Renderizar esquema SVG
  drawSvgLosaAligerada(hUser, hfUser, bwUser, sUser);

  // Guardar estado
  AppState.losaAligerada = {
    luz, factorApoyo, aligerante, hUser, hfUser, bwUser, sUser, sLibreCm,
    hMinNormaCm, hSugCm, hfNormaMinCm, numRiostras, riostrasTexto,
    pesoTotalKnM2,
    cumple: hUser >= hMinNormaCm && hfUser >= hfNormaMinCm && bwUser >= 10 && sLibreCm <= 75
  };
}

// Dibujar corte transversal del sistema aligerado en SVG
function drawSvgLosaAligerada(h, hf, bw, s) {
  const svg = document.getElementById("svg-losa-aligerada");
  if (!svg) return;

  const maxW = 340, maxH = 190;
  const scale = 2.4;
  const drawH = Math.min(100, Math.max(35, h * scale));
  const drawHf = Math.max(8, (hf / h) * drawH);
  const drawBw = Math.max(12, bw * scale);
  const drawS = Math.min(130, s * scale);

  const startY = 30;
  const startX = 25;

  svg.innerHTML = `
    <rect width="${maxW}" height="${maxH}" fill="#f8fafc" rx="8" />

    <!-- Torta de compresión superior continua -->
    <rect x="${startX}" y="${startY}" width="${drawS * 2}" height="${drawHf}" fill="#cbd5e1" stroke="#334155" stroke-width="1.5" />

    <!-- Nervio 1 (izquierdo) -->
    <rect x="${startX}" y="${startY + drawHf}" width="${drawBw}" height="${drawH - drawHf}" fill="#cbd5e1" stroke="#334155" stroke-width="1.5" />
    <!-- Nervio 2 (central) -->
    <rect x="${startX + drawS - drawBw / 2}" y="${startY + drawHf}" width="${drawBw}" height="${drawH - drawHf}" fill="#cbd5e1" stroke="#334155" stroke-width="1.5" />
    <!-- Nervio 3 (derecho) -->
    <rect x="${startX + 2 * drawS - drawBw}" y="${startY + drawHf}" width="${drawBw}" height="${drawH - drawHf}" fill="#cbd5e1" stroke="#334155" stroke-width="1.5" />

    <!-- Aligeramientos (Casetones) -->
    <rect x="${startX + drawBw + 2}" y="${startY + drawHf + 2}" width="${drawS - 1.5 * drawBw - 4}" height="${drawH - drawHf - 4}" 
          fill="#f1f5f9" stroke="#94a3b8" stroke-dasharray="3,3" stroke-width="1" />
    <text x="${startX + drawBw / 2 + drawS / 2}" y="${startY + drawHf + (drawH - drawHf) / 2 + 4}" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="'Inter', sans-serif">CASETON</text>

    <rect x="${startX + drawS + drawBw / 2 + 2}" y="${startY + drawHf + 2}" width="${drawS - 1.5 * drawBw - 4}" height="${drawH - drawHf - 4}" 
          fill="#f1f5f9" stroke="#94a3b8" stroke-dasharray="3,3" stroke-width="1" />
    <text x="${startX + drawS + drawBw / 2 + (drawS - 1.5 * drawBw) / 2}" y="${startY + drawHf + (drawH - drawHf) / 2 + 4}" font-size="9" fill="#94a3b8" text-anchor="middle" font-family="'Inter', sans-serif">CASETON</text>

    <!-- Acero en los nervios -->
    <circle cx="${startX + drawBw / 2}" cy="${startY + drawH - 6}" r="3" fill="#1e3a8a" />
    <circle cx="${startX + drawS}" cy="${startY + drawH - 6}" r="3" fill="#1e3a8a" />
    <circle cx="${startX + 2 * drawS - drawBw / 2}" cy="${startY + drawH - 6}" r="3" fill="#1e3a8a" />
    
    <!-- Malla de retracción en la torta -->
    <line x1="${startX + 5}" y1="${startY + drawHf / 2}" x2="${startX + 2 * drawS - 5}" y2="${startY + drawHf / 2}" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,2" />

    <!-- Cotas -->
    <!-- Altura total h -->
    <line x1="${startX - 12}" y1="${startY}" x2="${startX - 12}" y2="${startY + drawH}" stroke="#1e293b" stroke-width="1" />
    <text x="${startX - 16}" y="${startY + drawH / 2 + 3}" font-size="10" font-family="'JetBrains Mono', monospace" font-weight="700" fill="#0f172a" text-anchor="end">h=${h}</text>

    <!-- Torta hf -->
    <line x1="${startX + 2 * drawS + 8}" y1="${startY}" x2="${startX + 2 * drawS + 8}" y2="${startY + drawHf}" stroke="#1e293b" stroke-width="1" />
    <text x="${startX + 2 * drawS + 12}" y="${startY + drawHf / 2 + 3}" font-size="9" font-family="'JetBrains Mono', monospace" fill="#0f172a">hf=${hf}cm</text>

    <!-- Ancho nervio bw -->
    <line x1="${startX}" y1="${startY + drawH + 12}" x2="${startX + drawBw}" y2="${startY + drawH + 12}" stroke="#1e293b" stroke-width="1" />
    <text x="${startX + drawBw / 2}" y="${startY + drawH + 24}" font-size="9" font-family="'JetBrains Mono', monospace" fill="#0f172a" text-anchor="middle">bw=${bw}</text>

    <!-- Intereje S -->
    <line x1="${startX + drawBw / 2}" y1="${startY + drawH + 34}" x2="${startX + drawS}" y2="${startY + drawH + 34}" stroke="#1e293b" stroke-width="1" />
    <line x1="${startX + drawBw / 2}" y1="${startY + drawH + 30}" x2="${startX + drawBw / 2}" y2="${startY + drawH + 38}" stroke="#1e293b" stroke-width="1" />
    <line x1="${startX + drawS}" y1="${startY + drawH + 30}" x2="${startX + drawS}" y2="${startY + drawH + 38}" stroke="#1e293b" stroke-width="1" />
    <text x="${startX + drawBw / 2 + (drawS - drawBw / 2) / 2}" y="${startY + drawH + 46}" font-size="10" font-family="'JetBrains Mono', monospace" font-weight="700" fill="#0f172a" text-anchor="middle">S = ${s} cm</text>
  `;
}

// ====================================================================
// 7. HELPER: RENDERIZAR ITEMS DE CHECKLIST
// ====================================================================
function renderChecks(container, checks) {
  if (!container) return;
  container.innerHTML = "";
  checks.forEach(c => {
    const item = document.createElement("div");
    item.className = `check-item ${c.status}`;
    item.innerHTML = `<span class="check-icon">${c.icon}</span><span>${c.msg}</span>`;
    container.appendChild(item);
  });
}

// ====================================================================
// 8. GENERADOR DE INFORME IMPRIMIBLE (FICHA TÉCNICA CUC)
// ====================================================================
function generatePrintReport() {
  const contentBody = document.getElementById("print-content-body");
  if (!contentBody) return;

  const v = AppState.viga;
  const c = AppState.columna;
  const lm = AppState.losaMaciza;
  const la = AppState.losaAligerada;

  contentBody.innerHTML = `
    <div class="print-section-title">1. Parámetros Sísmicos de Localización (NSR-10)</div>
    <table class="print-table">
      <tr>
        <th>Municipio / Ciudad:</th>
        <td>${AppState.ciudad.nombre}</td>
        <th>Amenaza Sísmica:</th>
        <td>${AppState.ciudad.amenaza}</td>
      </tr>
      <tr>
        <th>Aceleración Aa:</th>
        <td>${AppState.ciudad.Aa.toFixed(2)}</td>
        <th>Velocidad Av:</th>
        <td>${AppState.ciudad.Av.toFixed(2)}</td>
      </tr>
      <tr>
        <th>Capacidad de Disipación:</th>
        <td><strong>${AppState.disipacion}</strong></td>
        <th>Grupo de Uso / Coef. I:</th>
        <td>Grupo ${AppState.grupoUso} (I = ${AppState.coefImportancia.toFixed(2)})</td>
      </tr>
    </table>

    <div class="print-section-title">2. Resumen de Predimensionamiento por Elemento Estructural</div>
    <table class="print-table">
      <thead>
        <tr>
          <th>Elemento</th>
          <th>Luz / Carga Principal</th>
          <th>Mínimo NSR-10</th>
          <th>Dimensión Sugerida</th>
          <th>Dimensión Adoptada</th>
          <th>Estado NSR-10</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Viga Principal</strong></td>
          <td>L = ${v.luz.toFixed(2)} m</td>
          <td>h ≥ ${v.hMinNormaCm.toFixed(1)} cm<br>bw ≥ ${v.bMinCm} cm</td>
          <td>${v.bsug || (v.hSugCm * 0.5).toFixed(0)} × ${v.hSugCm} cm</td>
          <td><strong>${v.bUser} × ${v.hUser} cm</strong></td>
          <td>${v.cumple ? "✓ Cumple Requisitos" : "✕ Requiere Ajuste"}</td>
        </tr>
        <tr>
          <td><strong>Columna ${c.tipo.toUpperCase()}</strong></td>
          <td>${c.numPisos} pisos • At = ${c.areaTrib} m²<br>Ps = ${c.psKn.toFixed(0)} kN</td>
          <td>Dim ≥ ${c.dimMinNormaCm} cm<br>Ag ≥ ${Math.round(c.agReqCm2)} cm²</td>
          <td>Secc. comercial</td>
          <td><strong>${c.forma === "circular" ? "Ø " + c.c1User : c.c1User + " × " + (c.forma === "cuadrada" ? c.c1User : c.c2User)} cm</strong></td>
          <td>${c.cumple ? "✓ Cumple Requisitos" : "✕ Requiere Ajuste"}</td>
        </tr>
        <tr>
          <td><strong>Losa Maciza</strong></td>
          <td>Lx = ${lm.lx} m, Ly = ${lm.ly} m<br>(${lm.esDosDirecciones ? "2 direcciones" : "1 dirección"})</td>
          <td>h ≥ ${lm.hCalcCm.toFixed(1)} cm<br>(mín. constr. 10 cm)</td>
          <td>h = ${lm.hSugCm} cm</td>
          <td><strong>h = ${lm.hUser} cm</strong></td>
          <td>${lm.cumple ? "✓ Cumple Requisitos" : "✕ Requiere Ajuste"}</td>
        </tr>
        <tr>
          <td><strong>Losa Aligerada</strong></td>
          <td>L = ${la.luz.toFixed(2)} m<br>Casetón: ${la.aligerante}</td>
          <td>h ≥ ${la.hMinNormaCm.toFixed(1)} cm<br>hf ≥ ${la.hfNormaMinCm.toFixed(1)} cm</td>
          <td>h = ${la.hSugCm} cm<br>hf = 5.0 cm</td>
          <td><strong>h = ${la.hUser} cm, hf = ${la.hfUser} cm<br>bw = ${la.bwUser} cm, S = ${la.sUser} cm</strong></td>
          <td>${la.cumple ? "✓ Cumple Requisitos" : "✕ Requiere Ajuste"}</td>
        </tr>
      </tbody>
    </table>

    <div class="print-section-title">3. Observaciones y Recomendaciones de Ingeniería (NSR-10)</div>
    <ul style="font-size: 9.5pt; line-height: 1.5; padding-left: 20px;">
      <li><strong>Riostras en Losa Aligerada:</strong> ${la.riostrasTexto} (${la.riostrasSub}).</li>
      <li><strong>Criterio Columna Fuerte - Viga Débil:</strong> En pórticos resistentes a momentos para ${AppState.disipacion}, la columna adoptada debe ser revisada para garantizar que desarrolle mayor capacidad a flexión que las vigas concurrentes.</li>
      <li><strong>Durabilidad y Recubrimientos:</strong> Por encontrarse en Barranquilla (ambiente costero/marino), se deben aplicar recubrimientos libres mínimos de 4.0 a 5.0 cm en vigas y columnas de concreto reforzado (NSR-10 C.7.7).</li>
    </ul>
  `;

  // Invocar diálogo de impresión del navegador
  window.print();
}
