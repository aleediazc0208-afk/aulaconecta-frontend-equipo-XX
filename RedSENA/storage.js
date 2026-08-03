/*==========================================================
    REDSENA — STORAGE.JS
==========================================================*/

const KEYS = {
    publicaciones: "rs_publicaciones",
    usuario:       "rs_usuario"
};

/* ── INICIALIZAR ── */
function inicializarStorage() {
    if (!localStorage.getItem(KEYS.publicaciones)) {
        localStorage.setItem(KEYS.publicaciones, JSON.stringify([]));
    }
}

/* ── PUBLICACIONES ── */
function obtenerPublicaciones() {
    return JSON.parse(localStorage.getItem(KEYS.publicaciones)) || [];
}

function guardarPublicaciones(lista) {
    localStorage.setItem(KEYS.publicaciones, JSON.stringify(lista));
}

/* ── USUARIO ── */
function obtenerUsuarioStorage() {
    return JSON.parse(localStorage.getItem(KEYS.usuario));
}

function guardarUsuarioStorage(usuario) {
    localStorage.setItem(KEYS.usuario, JSON.stringify(usuario));
}
