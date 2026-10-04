# INVERTU LANDING PAGE

Landing page de InvertU, plataforma web de gestión financiera para estudiantes universitarios.

## Estructura del proyecto

```
invertu-landing-page/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── img/
    └── js/
        ├── lang-es.js
        ├── lang-en.js
        └── main.js
```

| Archivo | Propósito |
|---------|-----------|
| `index.html` | Estructura de la landing page |
| `assets/css/styles.css` | Hoja de estilos única del proyecto |
| `assets/js/lang-es.js` | Textos en español (claves `data-i18n`) |
| `assets/js/lang-en.js` | Textos en inglés (mismas claves que `lang-es.js`) |
| `assets/js/main.js` | Interactividad: idiomas, menú móvil, asistente, carrusel de testimonios y animaciones |
| `assets/img/` | Recursos gráficos locales (logo, mascota, imágenes) |

Los scripts se cargan en este orden al final de `index.html`: `lang-es.js`, `lang-en.js` y `main.js`.

---

## Cómo visualizar el proyecto

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` directamente en tu navegador.

> No requiere servidor local ni proceso de build.

---

## Publicación en GitHub Pages

1. Sube los cambios a la rama `main` del repositorio en GitHub.
2. En el repositorio, entra a **Settings → Pages**.
3. En **Build and deployment**, elige **Source: Deploy from a branch**.
4. Selecciona la rama `main` y la carpeta `/ (root)`, y pulsa **Save**.
5. Después de unos minutos, la página queda publicada en `https://<usuario>.github.io/<repositorio>/`.

Cada nuevo push a `main` actualiza la página publicada automáticamente.

---

## Reglas del equipo

Para mantener el proyecto ordenado y consistente, todos los integrantes deben seguir estas reglas:

### Organización de archivos
- **No crear carpetas nuevas** sin avisar antes al equipo.
- Usar **minúsculas y guiones** en los nombres de archivos.  
  Correcto: `hero-banner.webp`  
  Incorrecto: `HeroBanner.png`, `hero_banner.webp`

### Textos e idiomas
- Todo texto visible va en `lang-es.js` y en `lang-en.js`, con la misma clave en ambos archivos.

### Estilos
- **Nada de estilos inline** (`style="..."`) ni etiquetas `<style>` dentro del HTML.
- Todos los estilos van en `assets/css/styles.css`.

### Íconos
- Usar **Font Awesome** (ya está enlazado en `index.html`).
- **No descargar íconos** ni agregar librerías externas sin consultar.

### Comunicación
- Cualquier cambio estructural (nuevas carpetas, dependencias, etc.) debe **avisarse al equipo** primero.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome (íconos)

---

## Convenciones de código

- **HTML**: indentación de 4 espacios, etiquetas semánticas.
- **CSS**: nombres de clases en `kebab-case` (ej. `.hero-section`).
- **JS**: nombres de variables en `camelCase`, funciones descriptivas.

---

## Contacto

invertuoficial@gmail.com
