// Camilo Ramírez (363781) Noelia López (358582)
window.addEventListener("load",config);

var seccionActual = "datos_seccion";

function config(){
  // eventos
  document.getElementById("boton_datos").addEventListener("click", cambiarSeccionDatos);
  document.getElementById("boton_estadisticas").addEventListener("click", cambiarSeccionEstadisticas);

}

// Darle una vuelta
function cambiarSeccionDatos() {
  if (seccionActual !== "datos_seccion") {
    document.getElementById("datos_seccion").classList.remove("oculto");
    document.getElementById("boton_datos").classList.add("activo");
    document.getElementById("estadisticas_seccion").classList.add("oculto");
    document.getElementById("boton_estadisticas").classList.remove("activo");
    seccionActual = "datos_seccion";
  }
}

function cambiarSeccionEstadisticas() {
  if (seccionActual !== "estadisticas_seccion") {
    document.getElementById("estadisticas_seccion").classList.remove("oculto");
    document.getElementById("boton_estadisticas").classList.add("activo");
    document.getElementById("datos_seccion").classList.add("oculto");
    document.getElementById("boton_datos").classList.remove("activo");
    seccionActual = "estadisticas_seccion";
  }
}
