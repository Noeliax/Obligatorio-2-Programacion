// Camilo Ramírez (363781) Noelia López (358582)
window.addEventListener("load",config);
let sistema = new Sistema();
let seccionActual = "datos_seccion";

function config(){
  document.getElementById("boton_datos").addEventListener("click", cambiarSeccionDatos);
  document.getElementById("boton_estadisticas").addEventListener("click", cambiarSeccionEstadisticas);
  document.getElementById("boton_carrera").addEventListener("click", agregarCarrera);
  document.getElementById("boton_patrocinador").addEventListener("click", agregarPatrocinador);
  document.getElementById("boton_corredor").addEventListener("click", agregarCorredor);
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

function agregarElementoCarrera(nombre) {
  let selectPat = document.getElementById("carreras_patrocinador");
  let opcion = document.createElement("option");
  opcion.value = nombre;
  opcion.textContent = nombre;

  selectPat.appendChild(opcion);
}

function actualizarCarreras(){
  let selectCarreraInscripcion = document.getElementById("carrera_inscripcion");
  selectCarreraInscripcion.innerHTML = ""; 
  for(let car of sistema.carreras){
    let opcion = document.createElement("option");
    opcion.value = car.nombre;
    opcion.textContent = car.nombre;
    selectCarreraInscripcion.appendChild(opcion); 
  }
}

function agregarCarrera() {
  let nombre = document.getElementById("nombre_carrera").value;
  let departamento = document.getElementById("departamento_carrera").value;
  let fecha = document.getElementById("fecha_carrera").value;
  let cupo = document.getElementById("cupo").value;
  
  let carrera = new Carrera(nombre, departamento, fecha, cupo);
  let fueAgregada = sistema.agregarCarrera(carrera);
  if(fueAgregada){
    actualizarCarreras();
    agregarElementoCarrera(nombre);
  }
}

function agregarPatrocinador() {
  let nombre = document.getElementById("nombre_patrocinador").value;
  let rubro = document.getElementById("rubro").value;
  let carreraElementos = document.getElementById("carreras_patrocinador").selectedOptions;
  let carreras = [];
  for (let elemento of carreraElementos) {
    carreras.push(elemento.value);
  }
  let patrocinador = new Patrocinador(nombre, rubro, carreras);
  sistema.agregarPatrocinador(patrocinador);
}

function actualizarCorredores() {
  let selectCorredor = document.getElementById("corredor_inscripcion");
  selectCorredor.innerHTML = "";
  for(let cor of sistema.corredores){
    let opcion = document.createElement("option");
    opcion.value = cor.cedula;
    opcion.textContent = `${cor.nombre} ${cor.cedula}`;
    selectCorredor.appendChild(opcion);
  }
 
}

function agregarCorredor() {
  let nombre = document.getElementById("nombre_corredor").value;
  let edad = document.getElementById("edad_corredor").value;
  let cedula = document.getElementById("cedula_corredor").value;
  let fechaFichaMedica = document.getElementById("fecha_vencimiento").value;
  let tipoDeCorredor = "";
  if (document.getElementById("elite").checked) {
    tipoDeCorredor = "Deportista de élite";
  } else {
    tipoDeCorredor = "Deportista común";
  }
  let corredor = new Corredor(nombre, edad, cedula, fechaFichaMedica, tipoDeCorredor);
  let fueAgregado = sistema.agregarCorredor(corredor);
  if (fueAgregado) {
    actualizarCorredores();
  }
}

// Terminar inscripción
// Todo estadisticas
