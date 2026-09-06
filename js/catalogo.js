// ============================================================
// js/catalogo.js  -  Render del catalogo y ordenamiento (HU-03)
// Persona A - Lucas
// Todo se construye con createElement + textContent.
// No se usa innerHTML en ningun punto del archivo.
// ============================================================

// Formatea un numero a pesos chilenos: 25000 -> "$25.000"
const formatearPrecio = (precio) =>
  precio.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

// Construye la tarjeta de UN producto y devuelve la columna lista para insertar.
const crearTarjeta = (producto) => {
  // Grilla: 1 columna en movil, 2 en tablet, 3 en escritorio
  const columna = document.createElement("div");
  columna.className = "col-12 col-md-6 col-lg-4";

  // <article> porque cada producto es contenido autonomo
  const tarjeta = document.createElement("article");
  tarjeta.className = "product-card";

  const imagen = document.createElement("img");
  imagen.className = "product-image";
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre; // alt descriptivo, no "imagen"
  imagen.loading = "lazy";
  // Si la foto no existe, cae a la generica en vez de mostrar el icono roto
  imagen.addEventListener("error", () => {
    imagen.src = "img/default.webp";
  });

  const cuerpo = document.createElement("div");
  cuerpo.className = "product-body";

  const categoria = document.createElement("span");
  categoria.className = "product-category";
  categoria.textContent = nombreCategoria(producto.categoria);

  const titulo = document.createElement("h3");
  titulo.className = "product-title";
  titulo.textContent = producto.nombre;

  const descripcion = document.createElement("p");
  descripcion.className = "product-description";
  descripcion.textContent = producto.descripcion;

  const precio = document.createElement("p");
  precio.className = "product-price";
  precio.textContent = formatearPrecio(producto.precio);

  const vendedor = document.createElement("p");
  vendedor.className = "product-seller";
  vendedor.textContent = producto.vendedor.nombre + " - " + producto.vendedor.carrera;

  const libres = producto.stock - unidadesEnCarrito(producto.id);

  const stock = document.createElement("p");
  stock.className = "product-stock";
  stock.textContent = libres > 0 ? "Quedan " + libres + (libres === 1 ? " unidad" : " unidades") : "Sin stock disponible";

  // --- Botones ---
  const acciones = document.createElement("div");
  acciones.className = "product-actions";

  const btnFavorito = document.createElement("button");
  btnFavorito.type = "button";
  btnFavorito.className = "btn btn-small btn-favorite";
  btnFavorito.dataset.id = producto.id;
  btnFavorito.dataset.accion = "favorito";
  btnFavorito.setAttribute("aria-label", producto.favorito ? "Quitar " + producto.nombre + " de favoritos" : "Agregar " + producto.nombre + "a favoritos");
  if (producto.favorito) {
    btnFavorito.classList.add("active");
  }
  const iconoFavorito = document.createElement("i");
  iconoFavorito.className = producto.favorito ? "bi bi-heart-fill" : "bi bi-heart";
  btnFavorito.appendChild(iconoFavorito);

  const btnCarrito = document.createElement("button");
  btnCarrito.type = "button";
  btnCarrito.className = "btn btn-cart";
  btnCarrito.dataset.id = producto.id;
  btnCarrito.dataset.accion = "carrito";
  btnCarrito.textContent = "Agregar";
  btnCarrito.disabled = libres <= 0;

  const btnEliminar = document.createElement("button");
  btnEliminar.type = "button";
  btnEliminar.className = "btn btn-small btn-delete";
  btnEliminar.dataset.id = producto.id;
  btnEliminar.dataset.accion = "eliminar";
  btnEliminar.setAttribute("aria-label", "Eliminar " + producto.nombre);
  const iconoEliminar = document.createElement("i");
  iconoEliminar.className = "bi bi-trash";
  btnEliminar.appendChild(iconoEliminar);

  const btnDetalle = document.createElement("button");
  btnDetalle.type = "button";
  btnDetalle.className = "btn btn-small btn-detalle";
  btnDetalle.dataset.id = producto.id;
  btnDetalle.dataset.accion = "detalle";
  btnDetalle.setAttribute("aria-label", "Ver detalle de " + producto.nombre);
  const iconoDetalle = document.createElement("i");
  iconoDetalle.className = "bi bi-eye";
  btnDetalle.appendChild(iconoDetalle);

  acciones.append(btnFavorito, btnCarrito, btnDetalle, btnEliminar);
  cuerpo.append(categoria, titulo, descripcion, precio, stock, vendedor, acciones);
  tarjeta.append(imagen, cuerpo);
  columna.appendChild(tarjeta);

  return columna;
};

// Pinta la lista completa. Vacia el contenedor antes, para no duplicar tarjetas.
const renderProductos = (lista) => {
  const contenedor = document.getElementById("catalogo-productos");
  const contador = document.getElementById("contador-resultados");
  const mensajeVacio = document.getElementById("sin-resultados");

  contenedor.textContent = ""; // vacia el contenedor sin usar innerHTML

  lista.forEach((producto) => {
    contenedor.appendChild(crearTarjeta(producto));
  });

  contador.textContent =
    lista.length === 1 ? "1 producto encontrado" : lista.length + " productos encontrados";

  // Muestra el mensaje de vacio solo cuando no hay resultados
  mensajeVacio.classList.toggle("d-none", lista.length > 0);
};

// Devuelve una COPIA ordenada. Nunca modifica el array que recibe.
const ordenarProductos = (lista, criterio) => {
  const copia = [...lista];

  switch (criterio) {
    case "precio-menor":
      return copia.sort((a, b) => a.precio - b.precio);
    case "precio-mayor":
      return copia.sort((a, b) => b.precio - a.precio);
    case "nombre":
      return copia.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    default:
      return copia.sort((a, b) => a.id - b.id); // relevancia: orden original
  }
};

// Calcula los tres contadores del hero a partir del array, no a mano.
const actualizarEstadisticas = () => {
  const lista = obtenerProductos();
  const vendedoresUnicos = new Set(lista.map((p) => p.vendedor.nombre));

  document.getElementById("total-productos").textContent = lista.length;
  document.getElementById("total-categorias").textContent = obtenerCategorias().length;
  document.getElementById("total-vendedores").textContent = vendedoresUnicos.size;
};

// ============================================================
// Vista detallada del producto
// Reutiliza el modal de Bootstrap que vive en index.html.
// ============================================================

// Se guarda la instancia para no crear una nueva en cada apertura.
let modalDetalle = null;

const mostrarDetalleProducto = (id) => {
  const producto = buscarProductoPorId(id);
  if (!producto) {
    return;
  }

  document.getElementById("detalle-titulo").textContent = producto.nombre;
  document.getElementById("detalle-categoria").textContent = nombreCategoria(producto.categoria);
  document.getElementById("detalle-precio").textContent = formatearPrecio(producto.precio);
  document.getElementById("detalle-descripcion").textContent = producto.descripcion;
  document.getElementById("detalle-vendedor").textContent = producto.vendedor.nombre;
  document.getElementById("detalle-carrera").textContent = producto.vendedor.carrera;
  document.getElementById("detalle-contacto").textContent = producto.vendedor.contacto;

  const imagen = document.getElementById("detalle-imagen");
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;

  // El boton del pie necesita saber que producto se esta viendo.
  document.getElementById("detalle-agregar").dataset.id = producto.id;

  const libresDetalle = producto.stock - unidadesEnCarrito(producto.id);
  document.getElementById("detalle-stock").textContent = libresDetalle > 0 ? "Disponibles: " + libresDetalle + " de " + producto.stock : "Sin stock disponible";
  document.getElementById("detalle-agregar").disabled = libresDetalle <= 0;

  if (!modalDetalle) {
    modalDetalle = new bootstrap.Modal(document.getElementById("modal-detalle"));
  }
  modalDetalle.show();
};
