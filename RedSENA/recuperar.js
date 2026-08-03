// Obtener el formulario
const formulario = document.querySelector("form");

// Evento al enviar el formulario
formulario.addEventListener("submit", function(event){

    // Evita que la página se recargue
    event.preventDefault();

    // Obtener el correo
    const correo = document.querySelector("input").value;

    // Validar que no esté vacío
    if(correo === ""){

        alert("Por favor ingresa tu correo electrónico.");

        return;

    }

    // Simulación del envío
    alert(
        "Se ha enviado un enlace de recuperación a:\n\n" +
        correo +
        "\n\nRevisa tu correo electrónico."
    );

    // Regresar al login después de 2 segundos
    setTimeout(function(){

        window.location.href = "index.html";

    },2000);

});