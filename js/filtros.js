// ===========================================
// js/filtros.js
// Filtros y busqueda de productos
// ===========================================

// ===========================================
// Poblar categorias
// ===========================================

const cargarCategorias = () => {

    const filtroCategoria = document.getElementById("filtro-categoria");
    const categoriaFormulario = document.getElementById("producto-categoria");

    const categorias = obtenerCategorias();

    // Agregar categorias al filtro del catalogo
    categorias.forEach((categoria) => {

        const opcion = document.createElement("option");

        opcion.value = categoria.id;
        opcion.textContent = categoria.nombre;

        filtroCategoria.appendChild(opcion);
    });

    // Agregar categorias al formulario
    categorias.forEach((categoria) => {

        const opcion = document.createElement("option");

        opcion.value = categoria.id;
        opcion.textContent = categoria.nombre;

        categoriaFormulario.appendChild(opcion);
    });
};

// ===========================================
// Aplicar filtros
// ===========================================

const aplicarFiltros = () => {

    const categoria = document.getElementById("filtro-categoria").value;
    const precioMaximo = Number(
        document.getElementById("filtro-precio-max").value
    );

    const texto = document.getElementById("buscador").value
        .trim()
        .toLowerCase();

    let productos = obtenerProductos();

    // Filtro por categoria
    if (categoria !== "") {
        productos = productos.filter((producto) => {
            return producto.categoria === categoria;
        });
    }

    // Filtro por precio
    productos = productos.filter((producto) => {
        return producto.precio <= precioMaximo;
    });

    // Filtro por busqueda
    if (texto !== "") {
        productos = productos.filter((producto) => {

            return (
                producto.nombre.toLowerCase().includes(texto) ||
                producto.descripcion.toLowerCase().includes(texto) ||
                producto.vendedor.nombre.toLowerCase().includes(texto)
            );
        });
    }

    return productos;
};

// ===========================================
// Validacion del filtro de precio
// ===========================================

const validarPrecioFiltro = () => {

    const precio = document.getElementById("filtro-precio-max");
    const precioActual = document.getElementById("precio-actual");

    let valor = Number(precio.value);

    // Evita valores fuera del rango
    if (valor < 0) {
        valor = 0;
        precio.value = 0;
    }

    if (valor > 500000) {
        valor = 500000;
        precio.value = 500000;
    }

    precioActual.textContent = valor.toLocaleString("es-CL");
};

// ===========================================
// Actualizar catalogo
// ===========================================

const actualizarCatalogoConFiltros = () => {

    const filtrados = aplicarFiltros();
    const criterio = document.getElementById("selector-orden").value;

    renderProductos(
        ordenarProductos(filtrados, criterio)
    );
};

// ===========================================
// Eventos de los filtros
// ===========================================

document.addEventListener("DOMContentLoaded", () => {

    cargarCategorias();
    validarPrecioFiltro();

    const filtroCategoria =
        document.getElementById("filtro-categoria");

    const filtroPrecio =
        document.getElementById("filtro-precio-max");

    const buscador =
        document.getElementById("buscador");

    const botonLimpiar =
        document.getElementById("btn-limpiar-filtros");

    // Cambio de categoria
    filtroCategoria.addEventListener("change", () => {
        actualizarCatalogoConFiltros();
    });

    // Cambio de precio en tiempo real
    filtroPrecio.addEventListener("input", () => {

        validarPrecioFiltro();
        actualizarCatalogoConFiltros();

    });

    // Busqueda en tiempo real
    buscador.addEventListener("input", () => {
        actualizarCatalogoConFiltros();
    });

    // Limpiar filtros
    botonLimpiar.addEventListener("click", () => {

        filtroCategoria.value = "";
        filtroPrecio.value = 500000;
        buscador.value = "";

        validarPrecioFiltro();
        actualizarCatalogoConFiltros();
    });
});

