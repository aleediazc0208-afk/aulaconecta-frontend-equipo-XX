/*==========================================================
    REDSENA — VALIDACIONES.JS
==========================================================*/

function validarDescripcion(texto) {
    const t = limpiarTexto(texto);
    if (!t) return { valido: false, mensaje: "Escribe algo para publicar." };
    if (t.length > 1000) return { valido: false, mensaje: "Máximo 1000 caracteres." };
    return { valido: true, mensaje: "" };
}

function validarArchivo(archivo, tipo) {
    if (!archivo) return { valido: true, mensaje: "" };

    const maxPeso = 10 * 1024 * 1024;
    if (archivo.size > maxPeso) return { valido: false, mensaje: "El archivo supera 10 MB." };

    if (tipo === "foto" && !archivo.type.startsWith("image/"))
        return { valido: false, mensaje: "Selecciona una imagen válida." };

    if (tipo === "video" && !archivo.type.startsWith("video/"))
        return { valido: false, mensaje: "Selecciona un video válido." };

    return { valido: true, mensaje: "" };
}

function validarEvento(ev) {
    if (!ev) return { valido: true, mensaje: "" };
    if (!limpiarTexto(ev.titulo)) return { valido: false, mensaje: "Escribe el título del evento." };
    if (!ev.fecha) return { valido: false, mensaje: "Selecciona la fecha del evento." };
    if (!ev.hora)  return { valido: false, mensaje: "Selecciona la hora del evento." };
    if (!limpiarTexto(ev.lugar)) return { valido: false, mensaje: "Escribe el lugar del evento." };
    return { valido: true, mensaje: "" };
}

function mostrarMensaje(msg) {
    // Puedes reemplazar por un toast propio más adelante
    alert(msg);
}
