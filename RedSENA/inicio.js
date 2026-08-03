// ========= SALUDO SEGÚN LA HORA =========

const saludo = document.getElementById("saludo");

const hora = new Date().getHours();

if (hora >= 6 && hora < 12) {

    saludo.innerHTML = "🌞 Buenos días, Sara";

} else if (hora >= 12 && hora < 18) {

    saludo.innerHTML = "☀️ Buenas tardes, Sara";

} else {

    saludo.innerHTML = "🌙 Buenas noches, Sara";

}



// ========= NOTIFICACIÓN =========

const campana = document.querySelector(".notificacion");

campana.addEventListener("click",()=>{

    alert(
`🔔 Notificaciones

• Bienvenido a RedSENA.

• Hay nuevas noticias disponibles.

• Revisa el menú de Cafetería.

• Consulta los nuevos emprendimientos.`
    );

});


// ========= EFECTO EN LAS NOTICIAS =========

const noticias = document.querySelectorAll(".cardNoticia");

noticias.forEach((noticia)=>{

    noticia.addEventListener("click",()=>{

        const titulo = noticia.querySelector("h4").textContent;

        alert("📰 " + titulo + "\n\nEsta noticia estará disponible próximamente.");

    });

});