const formato = /^[a-z\s]+$/;
const encriptados = ["ai", "enter", "imes", "ober", "ufat"];
const desencriptados = ["a", "e", "i", "o", "u"];
let restricciones = document.getElementById("restricciones");
let imagenSalida = document.getElementById("imagen-salida");
let contenedorSalida = document.getElementById("salida");
let textoCopiar = document.getElementById("sin-mensaje");
let cabecera = document.getElementById("header");
let botonCopiar = document.getElementById("copiar");

// Activa la animacion de error
function activarRestricciones() {
  restricciones.classList.add("error");
  setTimeout(function () {
    location.reload();
  }, 550);
}

// Asigana el texto enviado como parametro al DOM
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.getElementById(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

// Establece los cambios de los estilos del contenedor de salida

function propiedadesDeSalida() {
  if (window.innerWidth <= 900) {
    window.scrollTo({
      top: contenedorSalida.offsetTop,
      behavior: "smooth",
    });
  }
  imagenSalida.style.display = "none";
  document.getElementById("texto-usuario").value = "";
  botonCopiar.textContent = "Copiar";
}

function encriptar() {
  let textoUsuario = document.getElementById("texto-usuario").value;
  if (formato.test(textoUsuario)) {
    let arregloTexto = textoUsuario.split("");
    for (let i = 0; i < arregloTexto.length; i++) {
      for (let j = 0; j < desencriptados.length; j++) {
        if (arregloTexto[i] === desencriptados[j]) {
          arregloTexto[i] = encriptados[j];
        }
      }
    }
    propiedadesDeSalida();
    console.log(arregloTexto.join(""));
    asignarTextoElemento("sin-mensaje", arregloTexto.join(""));
  } else {
    activarRestricciones();
  }
}

function desencriptar() {
  let textoUsuario = document.getElementById("texto-usuario").value;
  if (formato.test(textoUsuario)) {
    for (let i = 0; i < encriptados.length; i++) {
      if (textoUsuario.includes(encriptados[i])) {
        textoUsuario = textoUsuario.replace(
          new RegExp(encriptados[i], "g"),
          desencriptados[i]
        );
      }
    }
    propiedadesDeSalida();
    asignarTextoElemento("sin-mensaje", textoUsuario);
  } else {
    activarRestricciones();
  }
}

function copiarTexto() {
  if (window.innerWidth <= 900) {
    window.scrollTo({
      top: cabecera.offsetTop,
      behavior: "smooth",
    });
  }
  navigator.clipboard.writeText(textoCopiar.textContent);
  botonCopiar.textContent = "Copiado";
}
