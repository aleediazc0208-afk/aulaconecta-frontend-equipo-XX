const usuario = JSON.parse(localStorage.getItem("rs_usuario"));

if(!usuario){

window.location.href="login.html";

}

document.getElementById("nombre").value=usuario.nombre||"";
document.getElementById("correo").value=usuario.correo||"";
document.getElementById("programa").value=usuario.programa||"";
document.getElementById("ficha").value=usuario.ficha||"";
document.getElementById("rol").value=usuario.rol||"";

document.getElementById("formConfig").addEventListener("submit",function(e){

e.preventDefault();

const nombre=document.getElementById("nombre").value.trim();

const correo=document.getElementById("correo").value.trim();

const programa=document.getElementById("programa").value.trim();

const ficha=document.getElementById("ficha").value.trim();

const rol=document.getElementById("rol").value.trim();

const expresion=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(nombre==""){

alert("Ingrese un nombre.");

return;

}

if(!expresion.test(correo)){

alert("Correo inválido.");

return;

}

usuario.nombre=nombre;
usuario.correo=correo;
usuario.programa=programa;
usuario.ficha=ficha;
usuario.rol=rol;

localStorage.setItem("rs_usuario",JSON.stringify(usuario));

const usuarios=JSON.parse(localStorage.getItem("rs_usuarios"))||[];

const indice=usuarios.findIndex(u=>u.id===usuario.id);

if(indice!=-1){

usuarios[indice]=usuario;

localStorage.setItem("rs_usuarios",JSON.stringify(usuarios));

}

alert("Datos actualizados correctamente.");

window.location.href="perfil.html";

});