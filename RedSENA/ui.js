/*==========================================================
    REDSENA — UI.JS
==========================================================*/

/* ── FEED PRINCIPAL ── */
function mostrarPublicaciones() {
    const lista = obtenerPublicaciones();
    const feed  = document.getElementById("feed");
    feed.innerHTML = "";

    if (lista.length === 0) {
        mostrarFeedVacio();
        return;
    }

    lista.forEach(pub => {
        feed.innerHTML += crearTarjeta(pub);
    });
}

/* ── FEED VACÍO ── */
function mostrarFeedVacio() {
    document.getElementById("feed").innerHTML = `
        <section class="feed-vacio">
            <i class="bi bi-chat-square-heart"></i>
            <h4>Aún no hay publicaciones</h4>
            <p>Sé la primera persona en compartir un emprendimiento, una idea o un evento.</p>
        </section>`;
}

/* ── TARJETA ── */
function crearTarjeta(pub) {
    const usuario     = obtenerUsuarioActivo();
    const yaLiked     = usuario ? pub.likes.includes(usuario.id) : false;
    const totalLikes  = pub.likes.length;
    const totalComent = pub.comentarios.length;

    return `
    <article class="card-publicacion" data-id="${pub.id}">

        <!-- Cabecera -->
        <div class="card-usuario">
            <img src="${pub.usuario.foto}" class="foto-perfil" alt="${pub.usuario.nombre}">
            <div class="card-usuario-info">
                <h5>${pub.usuario.nombre}</h5>
                <small>${formatearFecha(pub.fecha)}</small>
            </div>
            <button class="btn-mas" title="Opciones">
                <i class="bi bi-three-dots"></i>
            </button>
        </div>

        <!-- Descripción -->
        ${pub.descripcion ? `<p class="card-descripcion">${pub.descripcion}</p>` : ""}

        <!-- Multimedia -->
        ${crearMultimedia(pub)}

        <!-- Stats -->
        ${totalLikes > 0 || totalComent > 0 ? `
        <div class="card-stats">
            ${totalLikes > 0 ? `
            <span class="stat-likes">
                <i class="bi bi-heart-fill"></i>
                ${formatearNumero(totalLikes)}
            </span>` : ""}
            ${totalLikes > 0 && totalComent > 0 ? `<span class="stat-sep">·</span>` : ""}
            ${totalComent > 0 ? `<span>${formatearNumero(totalComent)} comentarios</span>` : ""}
        </div>` : ""}

        <!-- Acciones -->
        <div class="card-acciones">
            <button class="btn-accion ${yaLiked ? "liked" : ""}"
                    onclick="accionLike('${pub.id}')">
                <i class="bi bi-heart${yaLiked ? "-fill" : ""}"></i>
                Me gusta
            </button>
            <button class="btn-accion" onclick="accionComentar('${pub.id}')">
                <i class="bi bi-chat"></i>
                Comentar
            </button>
            <button class="btn-accion" onclick="accionCompartir('${pub.id}')">
                <i class="bi bi-share"></i>
                Compartir
            </button>
        </div>

    </article>`;
}

/* ── MULTIMEDIA ── */
function crearMultimedia(pub) {
    switch (pub.tipo) {

        case "foto":
            return pub.archivo
                ? `<img src="${pub.archivo}" class="imagen-post" alt="Foto">`
                : "";

        case "video":
            return pub.archivo
                ? `<video controls class="video-post">
                       <source src="${pub.archivo}">
                   </video>`
                : "";

        case "evento":
            return `
            <div class="evento-post">
                <h5>📅 ${pub.evento.titulo}</h5>
                <p><i class="bi bi-calendar3"></i> ${pub.evento.fecha}</p>
                <p><i class="bi bi-clock"></i> ${pub.evento.hora}</p>
                <p><i class="bi bi-geo-alt"></i> ${pub.evento.lugar}</p>
            </div>
            ${pub.archivo ? `<img src="${pub.archivo}" class="imagen-post" alt="Imagen del evento">` : ""}`;

        default:
            return "";
    }
}
