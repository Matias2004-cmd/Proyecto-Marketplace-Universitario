# UniMarket - Marketplace Universitario 🏪

## 📋 Descripción del Proyecto

UniMarket es un marketplace digital diseñado exclusivamente para la comunidad universitaria. Permite que estudiantes compren y vendan de forma segura productos como libros, computadoras, accesorios, instrumentos musicales, artículos deportivos y más, dentro de un entorno confiable y controlado.

### Problema que Resuelve

Actualmente, las publicaciones de compra y venta en la comunidad universitaria están dispersas en diferentes canales (redes sociales, chats, murales físicos), lo que dificulta:
- Buscar productos específicos
- Comparar precios
- Verificar disponibilidad
- Comunicarse con vendedores de forma centralizada

UniMarket centraliza todas estas transacciones en una plataforma unificada, amigable y optimizada para estudiantes.

---

## 👥 Equipo de Desarrollo

| Rol | Persona | Usuario GitHub | Responsabilidad |
|-----|---------|---|---|
| **Estructura y Catálogo** | Persona A | `Lucas Maulen` | HU-01, HU-02, HU-03, HU-11 (ampliación), HU-12 |
| **Filtros y Búsqueda** | Persona B | `Matías Catalán` | HU-04, HU-05, HU-06, HU-11 (base) |
| **Carrito y Favoritos** | Persona C | `Juan Soto` | HU-07, HU-08, HU-09, HU-10, HU-11 (base) |

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
  - Uso correcto de `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`
  - Etiquetas semánticas `<article>` para tarjetas de productos
  - Atributos `alt` descriptivos en imágenes
  - `<label>` asociados correctamente a inputs

- **CSS3**: Estilos propios y diseño responsive
  - Variables CSS en `:root` para paleta personalizada
  - Tema claro/oscuro implementado con `data-tema` attribute
  - Media queries para responsive design (mobile-first)
  - Flexbox y Grid para layouts complejos
  - Transiciones y animaciones suaves

- **JavaScript Vanilla**: Lógica de aplicación sin dependencias externas
  - Manipulación del DOM con `createElement` y `textContent`
  - Funciones puras y sin efectos secundarios
  - LocalStorage para persistencia de favoritos y carrito
  - Event listeners organizados por módulos

- **Bootstrap 5**: Framework CSS para componentes base
  - Sistema de grilla responsive
  - Navbar responsive con toggler
  - Cards, forms, alerts, badges
  - Incorporado como CDN

### Características Implementadas

#### ✅ Funcionalidad Básica
- [x] Catálogo dinámico de productos
- [x] Sistema de categorías
- [x] Buscador de texto
- [x] Filtros por categoría y rango de precio
- [x] Ordenamiento (relevancia, precio, nombre)
- [x] Carrito de compra
- [x] Sistema de favoritos
- [x] Formulario de publicación de productos
- [x] Eliminación de productos
- [x] Información del vendedor en cada producto

#### ✅ Experiencia de Usuario
- [x] Interfaz responsive (375px, 768px, 1280px)
- [x] Tema claro/oscuro con persistencia
- [x] Contador de carrito en navbar
- [x] Notificaciones de acciones
- [x] Accesibilidad (ARIA labels, focus visible, contraste)
- [x] Validación de formularios
- [x] Estadísticas dinámicas en hero section

#### 📊 Datos Simulados
- **16 productos** de ejemplo distribuidos en 5 categorías
- **Precios realistas** en pesos chilenos ($15k - $450k)
- **Vendedores únicos** con información de carrera y contacto
- **Imágenes locales** en `assets/img/` (SVG)

---

## 📁 Estructura de Carpetas

```
Proyecto-Marketplace-Universitario/
├── index.html                 # Página principal (estructura semántica)
├── css/
│   └── styles.css            # Estilos personalizados con variables CSS
├── js/
│   ├── data.js               # Datos simulados y funciones de modelo
│   ├── catalogo.js           # Renderizado dinámico de productos
│   ├── filtros.js            # Lógica de filtros y búsqueda
│   └── app.js                # Inicialización y coordinación
├── assets/
│   └── img/                  # Imágenes de productos (archivos locales)
├── README.md                 # Documentación del proyecto
└── .gitignore               # Archivos ignorados por git
```

### Descripción de Archivos

- **index.html**: Estructura HTML semántica con Bootstrap 5 CDN, navbar sticky, hero section con estadísticas dinámicas, sección de filtros, catálogo de productos, formulario de publicación y footer informativo.

- **css/styles.css**: 
  - Variables CSS en `:root` para colores, tipografía y espaciado
  - Tema oscuro en `[data-tema="oscuro"]`
  - Componentes personalizados: tarjetas, botones, hero, filtros
  - Media queries para responsive design
  - Estilos de accesibilidad: focus visible, contraste suficiente

- **js/data.js**:
  - Arrays de `productos` y `categorías`
  - Funciones de CRUD para productos
  - Sistema de favoritos con LocalStorage
  - Carrito de compra persistente
  - Funciones de búsqueda de categorías

- **js/catalogo.js**:
  - `renderProductos(lista)`: Crea tarjetas dinámicamente con `createElement`
  - `ordenarProductos(lista, criterio)`: Ordena sin mutar array original
  - `actualizarEstadisticas()`: Calcula datos dinámicos con `Set` para vendedores únicos
  - Funciones de UI: notificaciones, actualización del carrito

- **js/filtros.js**:
  - `aplicarFiltros()`: Coordina categoría, precio y búsqueda
  - Pobladores de selects de categorías
  - Event listeners para cada filtro
  - Validación en tiempo real

- **js/app.js**:
  - Inicialización en `DOMContentLoaded`
  - Sistema de tema claro/oscuro con `prefers-color-scheme`
  - Manejo del formulario de publicación
  - Funciones auxiliares para el equipo

---

## 🚀 Cómo Ejecutarlo

### Opción 1: Navegador Directo
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Matias2004-cmd/Proyecto-Marketplace-Universitario.git
   cd Proyecto-Marketplace-Universitario
   ```

2. Abrir `index.html` directamente en el navegador:
   ```bash
   # Windows
   start index.html
   
   # macOS
   open index.html
   
   # Linux
   xdg-open index.html
   ```

### Opción 2: Live Server (Recomendado)
1. Abrir VS Code
2. Instalar extensión "Live Server" (Five Server)
3. Click derecho en `index.html` → "Open with Live Server"
4. Se abrirá automáticamente en `http://localhost:5500`

### Opción 3: Python SimpleHTTPServer
```bash
python -m http.server 8000
# Luego abrir http://localhost:8000
```

---

## 📖 Estrategia de Ramas (Git Flow)

```
main (producción, con tags v1.0, v1.1...)
  ↑
develop (rama de integración)
  ↑
feature/estructura-base (HU-01, HU-02, HU-03 - Persona A)
feature/filtros         (HU-04, HU-05, HU-06 - Persona B)
feature/carrito-favoritos (HU-07, HU-08, HU-09, HU-10 - Persona C)
feature/responsive      (HU-11 - Todos)
feature/documentacion   (HU-12 - Persona A)
```

### Convención de Commits

Formato: `[HU-XX] Descripción breve - Detalles opcionales`

Ejemplos:
```bash
git commit -m "[HU-01] Crear estructura base HTML - Navbar sticky y hero section"
git commit -m "[HU-03] Renderizar catálogo dinámico - Con createElement y sin innerHTML"
git commit -m "[HU-11] Agregar tema oscuro - CSS variables y prefers-color-scheme"
```

### Flujo de Trabajo
1. Crear rama desde `develop`: `git checkout -b feature/nombre-breve`
2. Hacer commits frecuentes y bien documentados
3. Push a la rama: `git push origin feature/nombre-breve`
4. Crear Pull Request contra `develop`
5. Pedir revisión de compañero
6. Merge en `develop` (sin squash, para mantener historia)
7. Al finalizar sprint: merge `develop` → `main` con tag

---

## 🎨 Paleta de Colores

```css
/* Temas */
--color-primary: #6366f1      /* Indigo - Botones y acciones */
--color-primary-dark: #4f46e5 /* Indigo oscuro - Hover */
--color-primary-light: #818cf8 /* Indigo claro */

--color-secondary: #10b981    /* Verde - Secundario */
--color-danger: #ef4444       /* Rojo - Alertas, eliminar */
--color-warning: #f59e0b      /* Ámbar - Advertencias */

--color-text: #1f2937         /* Gris oscuro - Texto */
--color-bg: #ffffff           /* Blanco - Fondo claro */
--color-border: #e5e7eb       /* Gris muy claro - Bordes */
```

---

## ✅ Checklist de Calidad

### Funcionalidad
- [x] Buscar productos por texto
- [x] Filtrar por categoría
- [x] Filtrar por rango de precio
- [x] Ordenar catálogo
- [x] Ver detalles del producto (vendedor, carrera, contacto)
- [x] Agregar a favoritos
- [x] Agregar al carrito
- [x] Publicar nuevo producto
- [x] Eliminar productos propios
- [x] Carrito y favoritos persistentes

### Responsividad
- [x] Mobile (375px): Sin scroll horizontal
- [x] Tablet (768px): Grilla 2 columnas en catálogo
- [x] Desktop (1280px): Grilla 3 columnas en catálogo
- [x] Testeo en navegador real (DevTools)

### Accesibilidad (WCAG 2.1)
- [x] Etiquetas semánticas correctas
- [x] Todas las imágenes con `alt` descriptivo
- [x] Inputs con `<label>` asociado
- [x] Botones de ícono con `aria-label`
- [x] Focus visible en todos los elementos interactivos
- [x] Contraste de texto suficiente (4.5:1 mínimo)
- [x] Validación W3C (sin errores)

### Rendimiento
- [x] Sin errores en consola (F12)
- [x] Sin warnings de accesibilidad
- [x] LocalStorage para persistencia
- [x] Imágenes locales (no APIs externas)
- [x] CSS propio sobre Bootstrap

### Código
- [x] Sin `innerHTML` concatenado (usar `createElement`)
- [x] Arrays no mutados innecesariamente
- [x] Funciones puras donde es posible
- [x] Código comentado en secciones clave
- [x] Nombres descriptivos de variables y funciones
- [x] Modularidad: cada archivo tiene responsabilidad clara

---

## 🐛 Solución de Problemas

### Las imágenes no cargan
- Verificar que `assets/img/` existe con archivos SVG
- Revisar la ruta en `data.js` (debe ser relativa al HTML)
- Abrir DevTools (F12) → Pestaña Network → Ver errores 404

### El tema oscuro no cambia
- Verificar que `html` tiene el atributo `data-tema="claro"` o `"oscuro"`
- Revisar que Bootstrap no sobrescribe las variables CSS
- En DevTools, ir a Elementos → Ver el atributo `data-tema`

### Los filtros no funcionan
- Verificar que `data.js` se carga antes que `filtros.js`
- Revisar que `obtenerProductos()` retorna datos
- Abrir consola (F12) → Buscar errores de JavaScript

### El carrito no persiste
- Verificar que el navegador permite LocalStorage
- En navegación privada/incógnita, LocalStorage se borra al cerrar
- Revisar Application → Storage → LocalStorage en DevTools

---

## 🔄 Próximas Mejoras (Futuro)

- [ ] Backend con Node.js/Express
- [ ] Base de datos (MongoDB o PostgreSQL)
- [ ] Autenticación real con JWT
- [ ] Sistema de pagos (Stripe o Paypal)
- [ ] Chat entre usuarios
- [ ] Calificaciones y reseñas
- [ ] Notificaciones en tiempo real (WebSocket)
- [ ] App móvil con React Native

---

## 📄 Licencia

Este proyecto es de carácter académico. Todos los derechos reservados al equipo de desarrollo.

---

## 📞 Contacto y Soporte

Para dudas o problemas:
- Crear un Issue en el repositorio
- Contactar a través de los emails de los vendedores (simulados)
- Revisar la documentación de cada HU en los Issues

---

**Última actualización**: 31 de Agosto de 2026  
**Versión**: 1.0.0  
**Estado**: En desarrollo 🚧

**Hecho con ❤️ por el equipo de UniMarket**
