/*==========================================================
    REDSENA — USUARIOS.JS
==========================================================*/

/* Usuario temporal hasta conectar backend */
function inicializarUsuario() {
    if (obtenerUsuarioStorage()) return;

    guardarUsuarioStorage({
        id:              1,
        nombre:          "Sara Iregui",
        foto:            "IMG/usuarios/avatar.png",
        rol:             "Aprendiz",
        centroFormacion: "SENA Regional Bogotá",
        programa:        "ADSO"
    });
}

function obtenerUsuarioActivo() {
    return obtenerUsuarioStorage();
}

function cargarUsuario() {
    const u = obtenerUsuarioActivo();
    if (!u) return;

    /* Foto del feed */
    const fFeed = document.getElementById("fotoUsuarioFeed");
    if (fFeed) { fFeed.src = u.foto; fFeed.alt = u.nombre; }

    /* Foto del modal */
    const fModal = document.getElementById("fotoUsuario");
    if (fModal) { fModal.src = u.foto; fModal.alt = u.nombre; }

    /* Nombre en modal */
    const nombre = document.getElementById("nombreUsuario");
    if (nombre) nombre.textContent = u.nombre;
}
