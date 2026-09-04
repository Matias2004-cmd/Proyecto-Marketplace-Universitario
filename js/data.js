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
    nombre: "Stewart - Calculus: Early Vectors",
    precio: 25000,
    categoria: "libros",
    descripcion:
      "Libro de cálculo en buen estado, con anotaciones a lápiz en los primeros capítulos.",
    imagen: "img/libro1.webp",
    vendedor: {
      nombre: "Camila Rojas",
      carrera: "Ingeniería Civil",
      contacto: "camila.rojas@alumnos.cl",
    },
    favorito: false,
  },
  {
    id: 2,
    nombre: "Solucionario University Physics, Volumen 1",
    precio: 32000,
    categoria: "libros",
    descripcion:
      "Student Solutions Manual de Young y Freedman, capítulos 1 al 20. Tapa blanda, sin hojas sueltas.",
    imagen: "img/libro2.webp",
    vendedor: {
      nombre: "Carlos Mendoza",
      carrera: "Ingeniería Física",
      contacto: "carlos.mendoza@alumnos.cl",
    },
    favorito: false,
  },
  {
    id: 3,
    nombre: "Pocket Oxford Spanish Dictionary",
    precio: 15000,
    categoria: "libros",
    descripcion:
      "Diccionario de bolsillo usado, tapa algo gastada pero completo y legible.",
    imagen: "img/libro3.webp",
    vendedor: {
      nombre: "Diego Fuentes",
      carrera: "Ingeniería Comercial",
      contacto: "diego.fuentes@alumnos.cl",
    },
    favorito: false,
  },
  {
    id: 4,
    nombre: "Notebook Lenovo Flex 2",
    precio: 420000,
    categoria: "tecnologia",
    descripcion:
      "Pantalla táctil reclinable, Intel Core i5 con GeForce, 8 GB de RAM y 256 GB SSD. Incluye cargador.",
    imagen: "img/notebook1.webp",
    vendedor: {
      nombre: "Fernanda Lagos",
      carrera: "Enfermería",
      contacto: "fernanda.lagos@alumnos.cl",
    },
    favorito: false,
  },
  {
    id: 5,
    nombre: "Monitor LG Flatron Wide de 24 pulgadas",
    precio: 95000,
    categoria: "tecnologia",
    descripcion:
      "Monitor panorámico con base incluida, sin píxeles muertos. Ideal como segunda pantalla.",
    imagen: "img/monitor1.webp",
    vendedor: {
      nombre: "Diego Fuentes",
      carrera: "Ingeniería Comercial",
      contacto: "diego.fuentes@alumnos.cl",
    },
    favorito: false,
  },
    {
    id: 6,
    nombre: "Calculadora Casio fx-991DE CW",
    precio: 28000,
    categoria: "tecnologia",
    descripcion:
      "Científica ClassWiz de pantalla natural, permitida en pruebas. Incluye tapa original y manual.",
    imagen: "img/calculadora1.webp",
    vendedor: {
      nombre: "Ignacio Torres",
      carrera: "Ingeniería Eléctrica",
      contacto: "ignacio.torres@alumnos.cl",
    },
    favorito: false,
  },
  {
    id: 7,
    nombre: "Mochila Quechua para notebook 15 pulgadas",
    precio: 22000,
    categoria: "accesorios",
    descripcion:
      "Compartimento acolchado para notebook, cierres en buen estado. Usada un semestre.",
    imagen: "img/mochila1.webp",
    vendedor: {
      nombre: "Valentina Pérez",
      carrera: "Diseño Gráfico",
      contacto: "valentina.perez@alumnos.cl",
    },
    favorito: false,
  },
  {
    id: 8,
    nombre: "Audífonos over-ear inalámbricos",
    precio: 39000,
    categoria: "accesorios",
    descripcion:
      "Inalámbricos con cancelación pasiva, hasta 50 horas de batería. Incluye cable de carga.",
    imagen: "img/audifonos1.webp",
    vendedor: {
      nombre: "Camila Rojas",
      carrera: "Ingeniería Civil",
      contacto: "camila.rojas@alumnos.cl",
    },
    favorito: false,
  },
  {
    id: 9,
    nombre: "Guitarra acústica Yamaha FG-331",
    precio: 145000,
    categoria: "instrumentos",
    descripcion:
      "Tapa de abeto, cuerdas nuevas y diapasón sin desgaste. Se entrega con funda blanda.",
    imagen: "img/guitarra1.webp",
    vendedor: {
      nombre: "Matías Silva",
      carrera: "Pedagogía en Música",
      contacto: "matias.silva@alumnos.cl",
    },
    favorito: false,
  },
  {
    id: 10,
    nombre: "Teclado Casio CTK-7200",
    precio: 130000,
    categoria: "instrumentos",
    descripcion:
      "61 teclas sensibles al tacto, 820 tonos y secuenciador incorporado. Incluye transformador.",
    imagen: "img/teclado1.webp",
    vendedor: {
      nombre: "Javiera Núñez",
      carrera: "Fonoaudiología",
      contacto: "javiera.nunez@alumnos.cl",
    },
    favorito: false,
  },
  {
    id: 11,
    nombre: "Bicicleta MTB Bulls Wild Cup",
    precio: 180000,
    categoria: "deportes",
    descripcion:
      "Marco de aluminio talla M, horquilla con suspensión, cambios Shimano y frenos de disco recién ajustados.",
    imagen: "img/bicicleta1.webp",
    vendedor: {
      nombre: "Tomás Herrera",
      carrera: "Kinesiología",
      contacto: "tomas.herrera@alumnos.cl",
    },
    favorito: false,
  },
  {
    id: 12,
    nombre: "Set de mancuernas ajustables 20 kg",
    precio: 45000,
    categoria: "deportes",
    descripcion:
      "Par de barras con discos intercambiables y seguros de rosca. Sin óxido ni golpes.",
    imagen: "img/mancuernas1.webp",
    vendedor: {
      nombre: "Fernanda Lagos",
      carrera: "Enfermería",
      contacto: "fernanda.lagos@alumnos.cl",
    },
    favorito: false,
  },

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
    // El formulario todavia no pide imagen: se usa la generica del catalogo.
    imagen: "img/default.webp",
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
