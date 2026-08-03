const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();

    const correo = document.getElementById("correo").value.trim();

    const password = document.getElementById("password").value;

    const confirmar = document.getElementById("confirmar").value;

    if(password !== confirmar){

        alert("❌ Las contraseñas no coinciden.");

        return;

    }

    alert(
`✅ Cuenta creada correctamente.

Bienvenido(a) ${nombre}

Correo: ${correo}

Ahora puedes iniciar sesión en RedSENA.`
    );

    window.location.href = "index.html";

});