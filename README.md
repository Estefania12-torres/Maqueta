# Maqueta
Simulación Interactiva del Sistema Solar con HTML, CSS y JavaScript
![imagen](https://github.com/user-attachments/assets/6a5fb9de-dde9-4a75-8536-987773178492)

![imagen](https://github.com/user-attachments/assets/851e49c4-2b9c-4aac-8cfc-a935440095ec)

![imagen](https://github.com/user-attachments/assets/fdc0bacd-5451-44ee-8dac-1629502220a0)

## Objetivo

Ofrecer una experiencia visual y didáctica para aprender sobre la estructura de la Vía Láctea y los planetas del Sistema Solar, con animaciones y descripciones interactivas.

---

##  ¿Cómo funciona?

### 1. Vía Láctea (Vista inicial)
- Se muestra una galaxia espiral animada con estrellas, nubes de gas y un núcleo brillante.
- Al hacer clic en la galaxia, una estrella viaja hacia la esquina inferior izquierda.
- La galaxia se desplaza hacia la izquierda y aparece el Sistema Solar.

### 2. Sistema Solar 3D
- Visualización 3D de los planetas orbitando el Sol usando Three.js.
- Cada planeta tiene su órbita y velocidad de rotación.
- Al hacer clic en un planeta, aparece una tarjeta con su nombre y una breve descripción.
- Al hacer clic en el Sol, regresas a la vista de la Vía Láctea.

### 3. Sistema Solar 2D (Alternativo)
- Para dispositivos menos potentes, se muestra una versión 2D simple del Sistema Solar usando Canvas y elementos HTML.
- Los planetas y la Luna orbitan alrededor del Sol y la Tierra, respectivamente.
- También puedes ver los nombres de los planetas.

---

## 🗂️ Estructura del Proyecto

```
Maqueta_Sistema_Solar/
│
├── index.html                # Página principal
├── main.js                   # Lógica principal y sistema solar
├── milkyway.js               # Lógica de la Vía Láctea y transición
├── styles.css                # Estilos generales
├── assets/                   # Imágenes y recursos (si los hay)
└── README.md                 # Este archivo
```

---

## Tecnologías Utilizadas

- **JavaScript** (ES6)
- **Three.js** (visualización 3D)
- **Canvas 2D** (galaxia y sistema solar simple)
- **HTML5 y CSS3**

---

##  Instalación y Uso

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/Estefania12-torres/Maqueta.git
   ```
2. **Abre el proyecto:**
   - Abre el archivo `index.html` en tu navegador.
   - O usa una extensión como Live Server en VS Code para mejor experiencia.

3. **Interacción:**
   - Haz clic en la galaxia para iniciar la transición al Sistema Solar.
   - Haz clic en el Sol para regresar a la galaxia.
   - Haz clic en los planetas para ver sus descripciones.



Este proyecto está bajo la licencia MIT.
