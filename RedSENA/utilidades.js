/*==========================================================
    REDSENA — UTILIDADES.JS
==========================================================*/

function generarId() {
    return Date.now() + Math.floor(Math.random() * 9999);
}

function formatearFecha(fecha) {
    const f   = new Date(fecha);
    const now = new Date();
    const seg = Math.floor((now - f) / 1000);

    if (seg < 60)     return "Hace unos segundos";
    if (seg < 3600)   return `Hace ${Math.floor(seg / 60)} min`;
    if (seg < 86400)  return `Hace ${Math.floor(seg / 3600)} h`;
    if (seg < 604800) return `Hace ${Math.floor(seg / 86400)} días`;

    return f.toLocaleDateString("es-CO", {
        day: "numeric", month: "long", year: "numeric"
    });
}

function limpiarTexto(texto) {
    return (texto || "").trim();
}

function capitalizar(texto) {
    if (!texto) return "";
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function formatearNumero(n) {
    if (n >= 1000) return (n / 1000).toFixed(1) + "k";
    return n;
}
