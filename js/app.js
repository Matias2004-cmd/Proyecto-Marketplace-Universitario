// ===========================
// js.app.js - Arranque de la aplicacion y tema claro/oscuro
// Lucas
// Se carga al final: cuando corre, todo lo demas ya existe.
// ===========================

const CLAVE_TEMA = "unimarket-tema";

// punto de entrada unico del catalogo
// cadena acordada con el equipo: aplicarFiltros() -> ordenarProductos() -> renderProductos()
const refrescarCatalogo = () => {
    const criterio = document.getElementById("selector-orden").value;

    // filtros.js define aplicarFiltros() y devuelve la lista ya filtrada
    // mientras ese archivo no exista, se muestra el catalogo completo
    const filtrados = typeof aplicarFiltros === "function" ? aplicarFiltros() : obtenerProductos();

    renderProductos(ordenarProductos(filtrados, criterio));

    // muestra un aviso temporal arriba del catalogo
    // se pueden llamar carrito.js y formulario.js
    const mostrarNotificacion = (mensaje, tipo) => {
        const zona = document.getElementById("notificaciones");
        const alerta = document.createElement("div");

        alerta.className = `alert alert-` + (tipo || "success");
        alerta.setAttribute("role", "alert");
        alerta.textContent = mensaje;

        zona.appendChild(alerta);
        setTimeout(() => alerta.remove(), 3000);
    };

    // Aplica el tema al html y ajusta el icono del boton
    const aplicarTema = (tema) => {
        document.documentElement.dataset.tema = tema;

        const boton = document.getElementById("btn-tema");
        const icono = boton.querySelector("i");

        icono.className = tema === "oscuro" ? "bi bi-sun" : "bi bi-moon";
        boton.setAttribute("title", tema === "oscuro" ? "Tema claro" : "Tema oscuro");
    };
};

// prioridad: lo que el usuario eligio antes; sino, la preferencia del sistema.
const obtenerTemaInicial = () => {
    const guardado = localStorage.getItem(CLAVE_TEMA);
    if (guardado) {
        return guardado;
    }
};

// arranque: se ejecuta cuando el html ya esta completo en el dom

document.addEventListener("DOMContentLoaded", () => {
    aplicarTema(obtenerTemaInicial());

    document.getElementById("btn-tema").addEventListener("click", () => {
        const actual = document.documentElement.dataset.tema;
        const nuevo = actual === "oscuro" ? "claro" : "oscuro";
        aplicarTema(nuevo);
        localStorage.setItem(CLAVE_TEMA, nuevo);
    });
    document.getElementById("selector-orden").addEventListener("change", refrescarCatalogo);
    refrescarCatalogo();
});