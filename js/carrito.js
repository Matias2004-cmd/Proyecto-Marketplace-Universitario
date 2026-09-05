// js/carrito.js
//El carrito guarda objetos con: productID y cantidad.
// Los datos completos del producto siguen viviendo en data.js.

let carrito = [];
const CLAVE_CARRITO = "unimarket-carrito";

// Guarda el carrito en LocalStorage para no perderlo al recargar.
const guardarCarrito = () => {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
};
//Recupera el carrito guardado previamente.
const cargarCarrito = () => {
  const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);
  if (!carritoGuardado) {
    return;
  }
  try {
    carrito = JSON.parse(carritoGuardado);
  } catch (error) {
    // si el dato guardado esta corrupto, se reinicia el carrito.
    carrito = [];
  }
};
// Devuelve el total de productos.
const obtenerCantidadTotal = () =>
  carrito.reduce((total, item) => total + item.cantidad, 0);
//suma el precio de cada producto multiplicado por su cantidad.
const obtenerTotalCarrito = () =>
  carrito.reduce((total, item) => {
    const producto = buscarProductoPorId(item.productoId);
    //si el producto fue eliminado del catalogo, no se suma.
    if (!producto) {
      return total;
    }
    return total + producto.precio * item.cantidad;
  }, 0);
//Actualizar el numero rojo de la navbar
const actualizarContadorCarrito = () => {
  const contador = document.getElementById("carrito-contador");
  const cantidadTotal = obtenerCantidadTotal();
  contador.textContent = cantidadTotal;
  contador.classList.toggle("d-none", cantidadTotal === 0);
};
//Agrega un producto.
//si ya existe, aumente su cantidad en uno.
const agregarAlCarrito = (id) => {
  const producto = buscarProductoPorId(id);
  if (!producto) {
    return;
  }
  const itemExistente = carrito.find((item) => item.productoId === Number(id));
  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({
      productoId: Number(id),
      cantidad: 1,
    });
  }
  guardarCarrito();
  renderCarrito();
};
// Cambiar la cantidad de un producto.
// La variacion va hacer de +1 o -1.
const cambiarCantidad = (id, variacion) => {
  const item = carrito.find(
    (itemCarrito) => itemCarrito.productoId === Number(id),
  );
  if (!item) {
    return;
  }
  item.cantidad += variacion;
  //si queda en cero, se elimina del carrito.
  if (item.cantidad <= 0) {
    quitarDelCarrito(id);
    return;
  }
  guardarCarrito();
  renderCarrito();
};
//Quitar un producto sin afectar a los demas.
const quitarDelCarrito = (id) => {
  carrito = carrito.filter((item) => item.productoId !== Number(id));
  guardarCarrito();
  renderCarrito();
};
//Esta opcion se puede ocupar para eliminar productos del catalogo.
const quitarProductoEliminadoDelCarrito = (id) => {
  carrito = carrito.filter((item) => item.productoId !== Number(id));
  guardarCarrito();
  renderCarrito();
};
//vaciar todo el carrito.
const vaciarCarrito = () => {
  carrito = [];
  guardarCarrito();
  renderCarrito();
};
//crear un boton reutilizable.
const crearBoton = (texto, clases, etiquetaAria, accion) => {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = clases;
  boton.textContent = texto;
  boton.setAttribute("aria-label", etiquetaAria);
  boton.addEventListener("click", accion);
  return boton;
};
//dibuja nuevamente la lista del carrito.
const renderCarrito = () => {
  const lista = document.getElementById("lista-carrito");
  const mensajeVacio = document.getElementById("carrito-vacio");
  const totalElemento = document.getElementById("carrito-total");
  //Borra los elementos anteriores.
  lista.replaceChildren();
  //Evita que queden en el carrito preductos eliminados del catalogo.
  carrito = carrito.filter((item) => buscarProductoPorId(item.productoId));
  if (carrito.length === 0) {
    mensajeVacio.classList.remove("d-none");
  } else {
    mensajeVacio.classList.add("d-none");
  }
  carrito.forEach((item) => {
    const producto = buscarProductoPorId(item.productoId);
    const elementoLista = document.createElement("li");
    elementoLista.className =
      "list-group-item d-flex justify-content-between align-items-center gap-3";
    const informacion = document.createElement("div");
    const nombre = document.createElement("h3");
    nombre.className = "h6 mb-1";
    nombre.textContent = producto.nombre;
    const precio = document.createElement("p");
    precio.className = "mb-1 text-muted small";
    precio.textContent = `${formatearPrecio(producto.precio)} c/u`;
    const subtotal = document.createElement("p");
    subtotal.className = "mb-0 fw-semibold";
    subtotal.textContent = `Subtotal: ${formatearPrecio(producto.precio * item.cantidad)}`;
    informacion.append(nombre, precio, subtotal);
    const controles = document.createElement("div");
    controles.className = "d-flex align-items-center gap-2";
    const botonRestar = crearBoton(
      "−",
      "btn btn-outline-secondary btn-sm",
      `Restar una unidad de ${producto.nombre}`,
      () => cambiarCantidad(producto.id, -1),
    );
    const cantidad = document.createElement("span");
    cantidad.className = "fw-bold";
    cantidad.textContent = item.cantidad;
    const botonSumar = crearBoton(
      "+",
      "btn btn-outline-primary btn-sm",
      `Sumar una unidad de ${producto.nombre}`,
      () => cambiarCantidad(producto.id, 1),
    );
    const botonQuitar = crearBoton(
      "Quitar",
      "btn btn-outline-danger btn-sm",
      `Quitar ${producto.nombre} del carrito`,
      () => quitarDelCarrito(producto.id),
    );
    controles.append(botonRestar, cantidad, botonSumar, botonQuitar);
    elementoLista.append(informacion, controles);
    lista.appendChild(elementoLista);
  });
  totalElemento.textContent = formatearPrecio(obtenerTotalCarrito());
  guardarCarrito();
  actualizarContadorCarrito();
};
//se ejecuta desde la app.js cuando cargue la pagina.
const CLAVE_FAVORITOS = "unimarket-favoritos";

// guarda en localstorage los id de los productos marcados
const guardarFavoritos = () => {
  const ids = obtenerProductos()
    .filter((producto) => producto.favorito)
    .map((producto) => producto.id);
  localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(ids));
};

// vuelve a marcar los favoritos de una sesion anterior
const cargarFavoritos = () => {
    const guardado = localStorage.getItem(CLAVE_FAVORITOS);
    if (!guardado) {
        return;
    }
    let ids = [];
    try {
        ids = JSON.parse(guardado);
    } catch (error) { // si el dato esta corrupto, se ignora
        ids = [];
    }
    ids.forEach((id) => {
        const producto = buscarProductoPorId(id);
        if (producto) {
            producto.favorito = true;
        }
    });
};

// invierte el estado de favorito de un producto
const alternarFavorito = (id) => {
    const producto = buscarProductoPorId(id);
    if (!producto) {
        return;
    }
    producto.favorito = !producto.favorito;
    guardarFavoritos();
    renderFavoritos();
    refrescarCatalogo();
};

// dibuja nuevamente la lista de favoritos
const renderFavoritos = () => {
    const lista = document.getElementById("lista-favoritos");
    const mensajeVacio = document.getElementById("favoritos-vacio");
    const favoritos = obtenerProductos().filter((producto) => producto.favorito);

    lista.replaceChildren();
    mensajeVacio.classList.toggle("d-none", favoritos.length > 0);

    favoritos.forEach((producto) => {
        const elementoLista = document.createElement("li");
        elementoLista.className = "list-group-item d-flex justify-content-between align-items-center gap-3";

        const informacion = document.createElement("div");
        const nombre = document.createElement("h3");
        nombre.className = "h6 mb-1";
        nombre.textContent = producto.nombre;
        const precio = document.createElement("p");
        precio.className = "mb-0 text-muted small";
        precio.textContent = formatearPrecio(producto.precio);
        informacion.append(nombre, precio);

        const botonQuitar = crearBoton(
            "Quitar",
            "btn btn-outline-danger btn-sm",
            `Quitar ${producto.nombre} de favoritos`,
            () => alternarFavorito(producto.id)
        );

        elementoLista.append(informacion, botonQuitar);
        lista.appendChild(elementoLista);
        
    });
};

// delegacion de clicks del catalogo
// un solo listener en el contenedor, las tarjetas se
// vuelven a crear en cada render y los suyos se perderian

const inicializarAccionesCatalogo = () => {
    const catalogo = document.getElementById("catalogo-productos");

    catalogo.addEventListener("click", (evento) => {
        const boton = evento.target.closest("[data-accion]");
        if (!boton) {
            return;
        }

        const id = boton.dataset.id;

        if (boton.dataset.accion === "carrito") {
            agregarAlCarrito(id);
            mostrarNotificacion("Producto agregado al carrito.", "success");
        }

        if (boton.dataset.accion === "favorito") {
            alternarFavorito(id);
        }

        if (boton.dataset.accion === "detalle") {
            mostrarDetalleProducto(id);
        }
    });

    // El boton del pie del modal agrega al carrito el producto abierto.
    document.getElementById("detalle-agregar").addEventListener("click", (evento) => {
        agregarAlCarrito(evento.currentTarget.dataset.id);
        mostrarNotificacion("Producto agregado al carrito.", "success");
    });
};

// se ejecuta desde app cuando carga la pagina
const inicializarCarrito = () => {
    cargarCarrito();
    cargarFavoritos();
    document.getElementById("btn-vaciar-carrito").addEventListener("click", vaciarCarrito);
    inicializarAccionesCatalogo();
    renderCarrito();
    renderFavoritos();

};
