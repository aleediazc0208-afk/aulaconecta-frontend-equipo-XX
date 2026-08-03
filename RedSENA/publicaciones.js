/*==========================================================
    REDSENA — PUBLICACIONES.JS
==========================================================*/

/* ── CREAR ── */
function crearPublicacion(pub) {
    const lista = obtenerPublicaciones();
    lista.unshift(pub);
    guardarPublicaciones(lista);
}

/* ── OBTENER UNA ── */
function obtenerPublicacion(id) {
    return obtenerPublicaciones().find(p => p.id === id);
}

/* ── ACTUALIZAR ── */
function actualizarPublicacion(pub) {
    const lista = obtenerPublicaciones();
    const idx   = lista.findIndex(p => p.id === pub.id);
    if (idx === -1) return false;
    lista[idx] = pub;
    guardarPublicaciones(lista);
    return true;
}

/* ── ELIMINAR ── */
function eliminarPublicacion(id) {
    guardarPublicaciones(
        obtenerPublicaciones().filter(p => p.id !== id)
    );
}

/* ── LIKE ── */
function cambiarLike(id, usuarioId) {
    const pub = obtenerPublicacion(id);
    if (!pub) return;

    const idx = pub.likes.indexOf(usuarioId);
    if (idx === -1) pub.likes.push(usuarioId);
    else            pub.likes.splice(idx, 1);

    actualizarPublicacion(pub);
    return pub.likes;
}

/* ── GUARDAR EN FAVORITOS ── */
function cambiarFavorito(id, usuarioId) {
    const pub = obtenerPublicacion(id);
    if (!pub) return;

    const idx = pub.guardados.indexOf(usuarioId);
    if (idx === -1) pub.guardados.push(usuarioId);
    else            pub.guardados.splice(idx, 1);

    actualizarPublicacion(pub);
    return pub.guardados;
}
