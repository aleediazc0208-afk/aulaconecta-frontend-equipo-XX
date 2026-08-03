/*==========================================================
    REDSENA — EVENTOS.JS
==========================================================*/

let tipoPublicacion = "texto";
let modalBS;

/* ── INICIAR ── */
function iniciarEventos() {

    /* Modal Bootstrap */
    modalBS = new bootstrap.Modal(
        document.getElementById("modalPublicacion")
    );

    /* Abrir modal */
    document.getElementById("abrirPublicacion")
        .addEventListener("click", () => abrirModal("texto"));

    document.getElementById("btnFoto")
        .addEventListener("click", () => abrirModal("foto"));

    document.getElementById("btnVideo")
        .addEventListener("click", () => abrirModal("video"));

    document.getElementById("btnEvento")
        .addEventListener("click", () => abrirModal("evento"));

    /* Publicar */
    document.getElementById("btnGuardarPublicacion")
        .addEventListener("click", publicar);
}

/* ── ABRIR MODAL ── */
function abrirModal(tipo) {
    tipoPublicacion = tipo;
    limpiarFormulario();

    const archivo      = document.getElementById("archivo");
    const camposEvento = document.getElementById("camposEvento");

    /* Reset visibilidad */
    archivo.style.display      = "none";
    camposEvento.style.display = "none";

    const titulos = {
        texto:  ["Nueva publicación", "Publicación"],
        foto:   ["Nueva foto",        "Foto"],
        video:  ["Nuevo video",       "Video"],
        evento: ["Nuevo evento",      "Evento"]
    };

    document.getElementById("tituloModal").textContent    = titulos[tipo][0];
    document.getElementById("tipoPublicacion").textContent = titulos[tipo][1];

    if (tipo === "foto")   { archivo.style.display = "block"; archivo.accept = "image/*"; }
    if (tipo === "video")  { archivo.style.display = "block"; archivo.accept = "video/*"; }
    if (tipo === "evento") {
        archivo.style.display      = "block";
        archivo.accept             = "image/*";
        camposEvento.style.display = "block";
    }

    modalBS.show();
}

/* ── PUBLICAR ── */
function publicar() {

    const descripcion = document.getElementById("descripcion").value;
    const archivo     = document.getElementById("archivo").files[0];

    /* Validar descripción */
    const vDesc = validarDescripcion(descripcion);
    if (!vDesc.valido) { mostrarMensaje(vDesc.mensaje); return; }

    /* Validar archivo */
    const vArch = validarArchivo(archivo, tipoPublicacion);
    if (!vArch.valido) { mostrarMensaje(vArch.mensaje); return; }

    /* Validar evento */
    if (tipoPublicacion === "evento") {
        const ev = {
            titulo: document.getElementById("tituloEvento").value,
            fecha:  document.getElementById("fechaEvento").value,
            hora:   document.getElementById("horaEvento").value,
            lugar:  document.getElementById("lugarEvento").value
        };
        const vEv = validarEvento(ev);
        if (!vEv.valido) { mostrarMensaje(vEv.mensaje); return; }
    }

    const usuario = obtenerUsuarioActivo();

    if (archivo) {
        const lector    = new FileReader();
        lector.onload   = e => _guardar(usuario, descripcion, e.target.result);
        lector.readAsDataURL(archivo);
    } else {
        _guardar(usuario, descripcion, "");
    }
}

/* ── GUARDAR (interna) ── */
function _guardar(usuario, descripcion, archivoBase64) {

    const pub = {
        id:          generarId(),
        tipo:        tipoPublicacion,
        usuario:     usuario,
        descripcion: limpiarTexto(descripcion),
        archivo:     archivoBase64,
        fecha:       new Date(),
        likes:       [],
        comentarios: [],
        compartidos: 0,
        guardados:   []
    };

    if (tipoPublicacion === "evento") {
        pub.evento = {
            titulo: limpiarTexto(document.getElementById("tituloEvento").value),
            fecha:  document.getElementById("fechaEvento").value,
            hora:   document.getElementById("horaEvento").value,
            lugar:  limpiarTexto(document.getElementById("lugarEvento").value)
        };
    }

    crearPublicacion(pub);
    mostrarPublicaciones();
    limpiarFormulario();
    modalBS.hide();
}

/* ── LIMPIAR ── */
function limpiarFormulario() {
    ["descripcion","tituloEvento","fechaEvento","horaEvento","lugarEvento"]
        .forEach(id => { document.getElementById(id).value = ""; });
    document.getElementById("archivo").value = "";
}

/* ── ACCIÓN LIKE ── */
function accionLike(id) {
    const usuario = obtenerUsuarioActivo();
    if (!usuario) return;

    cambiarLike(id, usuario.id);
    mostrarPublicaciones();
}

/* ── ACCIÓN COMENTAR (placeholder) ── */
function accionComentar(id) {
    mostrarMensaje("Los comentarios estarán disponibles próximamente.");
}

/* ── ACCIÓN COMPARTIR ── */
function accionCompartir(id) {
    if (navigator.share) {
        navigator.share({ title: "RedSENA", text: "Mira esta publicación en RedSENA" });
    } else {
        mostrarMensaje("Función de compartir no disponible en este dispositivo.");
    }
}
