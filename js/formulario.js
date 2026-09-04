// ===========================================
// js/formulario.js
// Validacion y alta de productos
// ===========================================

// Muestra un mensaje de error debajo de un campo
const mostrarError = (campo, mensaje) => {
    let error = campo.parentElement.querySelector(".mensaje-error");

    if (!error) {
        error = document.createElement("small");
        error.className = "mensaje-error text-danger";
        campo.parentElement.appendChild(error);
    }

    error.textContent = mensaje;
};

// Elimina el mensaje de error de un campo
const limpiarError = (campo) => {
    const error = campo.parentElement.querySelector(".mensaje-error");

    if (error) {
        error.remove();
    }
};

// Valida un campo y devuelve true si es correcto
const validarCampo = (campo, mensaje) => {
    if (campo.value.trim() === "") {
        mostrarError(campo, mensaje);
        return false;
    }

    limpiarError(campo);
    return true;
};

// ===========================================
// Formulario de productos
// ===========================================

document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formulario-producto");

    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById("producto-nombre");
        const descripcion = document.getElementById("producto-descripcion");
        const precio = document.getElementById("producto-precio");
        const categoria = document.getElementById("producto-categoria");
        const vendedor = document.getElementById("producto-vendedor");
        const carrera = document.getElementById("producto-carrera");
        const contacto = document.getElementById("producto-contacto");

        let formularioValido = true;

        // Validacion del nombre
        if (!validarCampo(nombre, "Ingresa el nombre del producto.")) {
            formularioValido = false;
        }

        // Validacion de la descripcion
        if (!validarCampo(descripcion, "Ingresa una descripcion.")) {
            formularioValido = false;
        }

        // Validacion del precio
        if (precio.value.trim() === "") {
            mostrarError(precio, "Ingresa un precio.");
            formularioValido = false;
        } else if (Number(precio.value) <= 0) {
            mostrarError(precio, "El precio debe ser mayor que 0.");
            formularioValido = false;
        } else {
            limpiarError(precio);
        }

        // Validacion de categoria
        if (categoria.value === "") {
            mostrarError(categoria, "Selecciona una categoria.");
            formularioValido = false;
        } else {
            limpiarError(categoria);
        }

        // Validacion del vendedor
        if (!validarCampo(vendedor, "Ingresa tu nombre.")) {
            formularioValido = false;
        }

        // Validacion de carrera
        if (!validarCampo(carrera, "Ingresa tu carrera.")) {
            formularioValido = false;
        }

        // Validacion del contacto
        if (!validarCampo(contacto, "Ingresa un email o telefono.")) {
            formularioValido = false;
        }

        // Si hay errores, no se publica
        if (!formularioValido) {
            return;
        }

        // Datos del nuevo producto
        const datos = {
            nombre: nombre.value.trim(),
            descripcion: descripcion.value.trim(),
            precio: precio.value,
            categoria: categoria.value,
            vendedor: vendedor.value.trim(),
            carrera: carrera.value.trim(),
            contacto: contacto.value.trim()
        };

        // Agrega el producto al array
        agregarProducto(datos);

        // Actualiza el catalogo
        actualizarEstadisticas();
        refrescarCatalogo();

        // Limpia el formulario
        formulario.reset();

        // Mensaje de exito
        mostrarNotificacion("Producto publicado correctamente.", "success");
    });

    // ===========================================
    // Eliminacion de productos
    // ===========================================

    const catalogo = document.getElementById("catalogo-productos");

    catalogo.addEventListener("click", (evento) => {

        const boton = evento.target.closest('[data-accion="eliminar"]');

        if (!boton) {
            return;
        }

        const id = boton.dataset.id;
        const producto = buscarProductoPorId(id);

        if (!producto) {
            return;
        }

        const confirmar = confirm(
            "¿Seguro que quieres eliminar el producto \"" +
            producto.nombre +
            "\"?"
        );

        if (!confirmar) {
            return;
        }

        eliminarProducto(id);

        actualizarEstadisticas();
        refrescarCatalogo();

        mostrarNotificacion("Producto eliminado correctamente.", "success");
    });
});

