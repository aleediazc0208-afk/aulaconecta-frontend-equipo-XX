const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(e){

    // Evita que el formulario se envíe
    e.preventDefault();

    // Obtener datos
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validar que los campos no estén vacíos
    if(correo === "" || password === ""){
        alert("Por favor complete todos los campos.");
        return;
    }

    // Aquí después irá la validación con base de datos

    // Redireccionar a la página de roles
    window.location.href = "roles.html";

});