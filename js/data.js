// ===========================================
// Datos Simulados
// Lucas Maulen
// Sin backend ni base de datos: todo vive en arrays y objetos.
// ===============================

// Las categorias van en un array aparte para poder generar el filtro y el select del formulario dinamicamente.

const categorias = [
  { id: "libros", nombre: "Libros" },
  { id: "tecnologia", nombre: "Tecnología" },
  { id: "accesorios", nombre: "Accesorios" },
  { id: "instrumentos", nombre: "Instrumentos" },
  { id: "deportes", nombre: "Deportes" },
];

// Contrato acordado con el equipo para cada producto:
// id, nombre, precio, categoria, descripcion, imagen,
// vendedor { nombre, carrera, contacto }, favorito

const productos = [
  {
    id: 1,
    nombre: "Libro de Stewart, 8va edicion",
    precio: 25000,
    categoria: "libros",
    descripcion:
      "Libro de calculo en buen estado, con anotaciones a lapiz en los primeros capitulos.",
    imagen: "img/libro1.webp",
    vendedor: {
      nombre: "Camila Rojas",
      carrera: "Ingenieria Civil",
      contacto: "camila.rojas@alumnos.cl",
      favorito: false,
    },
  },
  {
    id: 2,
    nombre: "Fisica Universitaria Sears, Volumen 1",
    precio: 32000,
    categoria: "libros",
    descripcion:
      "Edicion de tapa dura, sin rayas ni hojas sueltas. Ideal para primer año.",
    imagen: "img/libro2.webp",
    vendedor: {
      nombre: "Carlos Mendoza",
      carrera: "Ingenieria Fisica",
      contacto: "carlos.mendoza@alumnos.cl",
      favorito: false,
    },
  },
  {
    id: 3,
    nombre: "Diccionario Oxford Ingles-Espanol",
    precio: 15000,
    categoria: "libros",
    descripcion:
      "Diccionario de bolsillo usado, tapa algo gastada pero completo y legible.",
    imagen: "img/libro3.webp",
    vendedor: {
      nombre: "Diego Fuentes",
      carrera: "Ingenieria Comercial",
      contacto: "diego.fuentes@alumnos.cl",
      favorito: false,
    },
  },
  {
    id: 4,
    nombre: "Notebook Lenovo IdeaPad3",
    precio: 420000,
    categoria: "tecnologia",
    descripcion:
      "Notebook de 8GB de Ram y 256 GB SSD, bateria con buena duracion. Incluye cargador.",
    imagen: "img/notebook1.jpeg",
    vendedor: {
      nombre: "Fernanda Lagos",
      carrera: "Enfermeía",
      contacto: "fernanda.lagos@alumnos.cl",
      favorito: false,
    },
  },
  {
    id: 5,
    nombre: "Monitor LG de 24 pulgadas",
    precio: 95000,
    categoria: "tecnologia",
    descripcion:
      "Monitor de 24 pulgadas, ideal para trabajo y entretenimiento.",
    imagen: "img/monitor1.avif",
    vendedor: {
      nombre: "Diego Fuentes",
      carrera: "Ingenieria Comercial",
      contacto: "diego.fuentes@alumnos.cl",
      favorito: false,
    },
  },
  // Agregar más productos según sea necesario
];

//========================================
// Funciones de acceso a los datos
// El resto del equipo siempre usa estas funciones, nunca
// las variables de arriba directamente.
// ========================================

// Devuelve el array completo de productos
const obtenerProductos = () => productos;

// Devuelve el array completo de categorias
const obtenerCategorias = () => categorias;

// Busca un producto por su id. Devuelve undefined si no existe.
const buscarProductoPorId = (id) => productos.find((p) => p.id === Number(id));

// Traduce el id de una categoria a su nombre visible
const nombreCategoria = (idCategoria) => {
  const cat = categorias.find((c) => c.id === idCategoria);
  return cat ? cat.nombre : "Sin categoría";
};

// Agrega un producto nuevo al array y devuelve el objeto creado.
// La usa formulario.js (HU-09)
const agregarProducto = (datos) => {
  const idsActuales = productos.map((p) => p.id);
  const nuevoId = idsActuales.length > 0 ? Math.max(...idsActuales) + 1 : 1;
  const nuevo = {
    id: nuevoId,
    nombre: datos.nombre,
    precio: Number(datos.precio),
    categoria: datos.categoria,
    descripcion: datos.descripcion,
    // Si no llega la imagen, se usa la de la categoria correspondiente.
    vendedor: {
      nombre: datos.vendedor,
      carrera: datos.carrera,
      contacto: datos.contacto,
    },
    favorito: false,
  };
  productos.push(nuevo);
  return nuevo;
};

// Elimina un producto por id. Devuelve trus si lo encontro y lo borro.
// La usa formulario.js (HU-10)
const eliminarProducto = (id) => {
    const indice = productos.findIndex((p) => p.id === Number(id));
    if (indice === -1) {
      return false; // No se encontró el producto
    }
    productos.splice(indice, 1);
    return true; // Producto eliminado exitosamente
  };
