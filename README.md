# PredimNSR-10 | Herramienta Web de Predimensionamiento Estructural
**Proyecto Académico de Ingeniería Civil - 8vo Semestre**  
**Universidad de la Costa (CUC) • Barranquilla, Atlántico, Colombia**  
**Autor:** Jose  
**Normativa Técnica:** NSR-10 (Reglamento Colombiano de Construcción Sismo Resistente)

---

## 🏗️ 1. Descripción del Proyecto
**PredimNSR-10** es una aplicación web interactiva desarrollada para la estimación y predimensionamiento rápido de los cuatro elementos estructurales fundamentales en edificaciones de concreto reforzado en Colombia:
1. **Vigas Principales y Secundarias**
2. **Columnas (Interiores, Laterales y de Esquina)**
3. **Losas Macizas (1 y 2 direcciones)**
4. **Losas Aligeradas / Nervadas en una dirección**

La plataforma no solo calcula los resultados matemáticos y dimensiones mínimas reglamentarias, sino que ofrece **retroalimentación cualitativa en tiempo real**, **esquemas vectoriales SVG dinámicos**, **alertas de cumplimiento normativo** y **recomendaciones constructivas adaptadas a las tres zonas de disipación de energía sísmica de Colombia: DMI, DMO y DES**.

---

## 🇨🇴 2. Marco Normativo NSR-10 y Capacidad de Disipación de Energía

En Colombia, el diseño sismorresistente se rige por la **NSR-10 (Ley 400 de 1997 / Decreto 926 de 2010)**. El territorio nacional se clasifica según los coeficientes de aceleración horizontal pico efectiva ($A_a$) y velocidad ($A_v$) (NSR-10 Título A):

| Capacidad de Disipación | Amenaza Sísmica | Coeficientes $A_a, A_v$ | Municipios de Referencia | Requisitos Mínimos Columnas | Requisitos Mínimos Vigas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DMI** (Mínima) | Baja | $\le 0.10$ | Leticia, Mitú, San Andrés | Dim. mín. $\ge 200\text{ mm}$, $A_g \ge 400\text{ cm}^2$ | Ancho mín. $b_w \ge 150 - 200\text{ mm}$ |
| **DMO** (Moderada) | Intermedia | $0.10 < A_a, A_v \le 0.20$ | **Barranquilla**, Cartagena, Santa Marta, Valledupar | Dim. mín. $\ge 250\text{ mm}$, $A_g \ge 625\text{ cm}^2$ | $b_w \ge 200\text{ mm}$, $b_w/h \ge 0.30$, $l_n \ge 4d$ |
| **DES** (Especial) | Alta | $> 0.20$ | Bogotá*, Cali, Bucaramanga, Pereira, Cúcuta, Pasto | Dim. mín. $\ge 300\text{ mm}$, $A_g \ge 900\text{ cm}^2$, $b/h \ge 0.40$ | $b_w \ge 250\text{ mm}$, $b_w/h \ge 0.30$, $l_n \ge 4d$ |

> **Nota para Barranquilla (CUC):** Barranquilla posee $A_a = 0.10$ y $A_v = 0.10$ (Apéndice A-4), clasificándose en amenaza intermedia para pórticos de concreto, requiriendo capacidad de disipación **DMO**. Además, por ser ciudad costera con alta humedad y salinidad, se aplican criterios de recubrimiento libre estricto de $4.0\text{ a }5.0\text{ cm}$ (NSR-10 C.7.7).

---

## 📐 3. Criterios de Predimensionamiento Implementados

### A. Vigas de Concreto (NSR-10 Título C.9.5 & C.21)
- **Peralte mínimo por deflexión (Tabla C.9.5(a)):**
  - Simplemente apoyada: $h = L / 16$
  - Un extremo continuo: $h = L / 18.5$
  - Ambos extremos continuos: $h = L / 21$
  - En voladizo: $h = L / 8$
  - Modificación por fluencia para $f_y \neq 420\text{ MPa}$: $(0.4 + f_y / 700)$.
- **Control de fisuración en mampostería no confinada:** En la práctica colombiana, si soporta muros frágiles de ladrillo/bloque, se recomienda $h \approx L / 10\text{ a }L / 12$.
- **Ancho del alma ($b_w$):**
  - DMI: $b_w \ge 20\text{ cm}$.
  - DMO: $b_w \ge 200\text{ mm}$ ($20\text{ cm}$) y $b_w / h \ge 0.30$ (C.21.3.5.1).
  - DES: $b_w \ge 250\text{ mm}$ ($25\text{ cm}$) y $b_w / h \ge 0.30$ (C.21.5.1.1).

### B. Columnas (NSR-10 Título C.10.8 & C.21)
- **Carga de servicio acumulada:**
  $$P_s = A_{\text{tributaria}} \times q_{\text{piso}} \times N_{\text{pisos}}$$
- **Área gruesa requerida ($A_g$):**
  $$A_g \ge \frac{P_s}{k \cdot f'_c}$$
  Donde $k$ considera la ubicación geométrica y los momentos biaxiales por sismo:
  - **DMI:** Interior ($k=0.45$), Borde ($k=0.35$), Esquina ($k=0.28$).
  - **DMO:** Interior ($k=0.38$), Borde ($k=0.30$), Esquina ($k=0.24$).
  - **DES:** Interior ($k=0.30$), Borde ($k=0.25$), Esquina ($k=0.20$).
- **Dimensiones mínimas normativas verificadas:**
  - DMI: $\ge 20\text{ cm}$, $A_g \ge 400\text{ cm}^2$.
  - DMO: $\ge 25\text{ cm}$, $A_g \ge 625\text{ cm}^2$ (NSR-10 C.21.3.6.1).
  - DES: $\ge 30\text{ cm}$, $A_g \ge 900\text{ cm}^2$, $b/h \ge 0.40$ (NSR-10 C.21.6.1).

### C. Losas Macizas (NSR-10 Título C.9.5 & C.13)
- **1 Dirección ($L_{\text{larga}} / L_{\text{corta}} > 2$):** Tabla C.9.5(a) ($L/20, L/24, L/28, L/10$).
- **2 Direcciones ($L_{\text{larga}} / L_{\text{corta}} \le 2$):** Perímetro / 180 sobre vigas de apoyo.
- **Espesor constructivo mínimo:** $\ge 10\text{ cm}$ para entrepiso residencial/oficinas.
- **Acero mínimo de retracción y temperatura (C.7.12):** $A_{s,\min} = 0.0018 \cdot b \cdot h$.

### D. Losas Aligeradas / Nervadas (NSR-10 Título C.8.13)
- **Peralte total ($h$):** Tabla C.9.5(a) para nervaduras ($L/16, L/18.5, L/21$).
- **Torta de compresión ($h_f$):** $h_f \ge 50\text{ mm}$ y $h_f \ge S_{\text{libre}} / 12$ (C.8.13.5.2).
- **Ancho del nervio ($b_w$):** $b_w \ge 100\text{ mm}$ ($10\text{ cm}$) (C.8.13.2).
- **Separación libre entre nervios:** $\le 750\text{ mm}$ ($75\text{ cm}$) (C.8.13.1.1).
- **Riostras o viguetas transversales (C.8.13.3.1):**
  - Si $L > 4.0\text{ m}$: 1 riostra intermedia central.
  - Si $L > 6.0\text{ m}$: 2 riostras intermedias (a los tercios).

---

## 🚀 4. Cómo Abrir y Usar la Página Web

La aplicación está construida con tecnología web pura (**HTML5 semántico, CSS3 moderno y Vanilla JavaScript**), lo que significa que **no requiere instalación previa de Node.js, Python ni librerías pesadas**. Funciona de forma 100% autónoma y offline en cualquier navegador moderno (Google Chrome, Microsoft Edge, Firefox, Safari).

### Opción 1: Apertura Directa en Navegador
1. Dirígete a la carpeta del proyecto:
   `C:\Users\vlok2\.gemini\antigravity\scratch\predimensionamiento-nsr10\`
2. Haz doble clic sobre el archivo **`index.html`**.
3. Se abrirá inmediatamente en tu navegador web.

### Opción 2: Servidor Local (Opcional)
Si deseas servirlo en red local o previsualizarlo:
- En PowerShell:
  ```powershell
  cd "C:\Users\vlok2\.gemini\antigravity\scratch\predimensionamiento-nsr10"
  python -m http.server 8080
  # Luego abre http://localhost:8080 en el navegador
  ```

---

## 🖨️ 5. Exportación de Informes y Sustentación Universitaria
En la esquina superior derecha encontrarás el botón **"Exportar Informe"**:
- Genera automáticamente una **Ficha Técnica de Predimensionamiento** estructurada con membrete oficial de la **Universidad de la Costa (CUC)**, nombre del estudiante (Jose), fecha y tablas consolidadas de resultados y cumplimiento NSR-10.
- Permite guardar directamente en **PDF** o imprimir para anexar a memorias de cálculo o entregas docentes.
