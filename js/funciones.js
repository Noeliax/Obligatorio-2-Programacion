// Camilo Ramírez (363781) Noelia López (358582)
window.addEventListener("load",config);
let sistema = new Sistema();
let seccionActual = "datos_seccion";

function config(){
  document.getElementById("boton_datos").addEventListener("click", cambiarSeccionDatos);
  document.getElementById("boton_estadisticas").addEventListener("click", function() {
    cambiarSeccionEstadisticas();
    actualizarEstadisticas();
  });
  document.getElementById("boton_carrera").addEventListener("click", agregarCarrera);
  document.getElementById("boton_patrocinador").addEventListener("click", agregarPatrocinador);
  document.getElementById("boton_corredor").addEventListener("click", agregarCorredor);
  document.getElementById("boton_inscripcion").addEventListener("click", agregarInscripcion);
  document.getElementById("carrera_estadistica").addEventListener("change", cambiarCarreraEstadistica);
  document.getElementById("orden_numero").addEventListener("change", cambiarCarreraEstadistica);
  document.getElementById("orden_nombre").addEventListener("change", cambiarCarreraEstadistica);
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
  let formCarrera = document.getElementById("form_carrera");
  if (formCarrera.reportValidity()) {
    let nombre = document.getElementById("nombre_carrera").value;
    let departamento = document.getElementById("departamento_carrera").value;
    let fechaString = document.getElementById("fecha_carrera").value;
    let cupo = document.getElementById("cupo").value;

    let fecha = new Date(fechaString);
    let carrera = new Carrera(nombre, departamento, fecha, cupo);
    let fueAgregada = sistema.agregarCarrera(carrera);
    if(fueAgregada){
      actualizarCarreras();
      agregarElementoCarrera(nombre);
    }
  }
}

function agregarPatrocinador() {
  let formPatrocinador = document.getElementById("form_patrocinador");
  if (formPatrocinador.reportValidity()) {
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
  let formCorredor = document.getElementById("form_corredor");
  if (formCorredor.reportValidity()) {
    let nombre = document.getElementById("nombre_corredor").value;
    let edad = document.getElementById("edad_corredor").value;
    let cedula = document.getElementById("cedula_corredor").value;
    let fechaFichaMedicaString = document.getElementById("fecha_vencimiento").value;
    let tipoDeCorredor = "";
    if (document.getElementById("elite").checked) {
      tipoDeCorredor = "Deportista de élite";
    } else {
      tipoDeCorredor = "Deportista común";
    }
    let fechaFichaMedica = new Date(fechaFichaMedicaString);
    let corredor = new Corredor(nombre, edad, cedula, fechaFichaMedica, tipoDeCorredor);
    let fueAgregado = sistema.agregarCorredor(corredor);
    if (fueAgregado) {
      actualizarCorredores();
    }
  }
}

function agregarInscripcion() {
  let formInscripcion = document.getElementById("form_inscripcion");
  if (formInscripcion.reportValidity()) {
    let corredorSeleccionado = document.getElementById("corredor_inscripcion").value;
    let carreraSeleccionada = document.getElementById("carrera_inscripcion").value;
    let corredor = sistema.corredores.find(function(cor) {
      return cor.cedula === corredorSeleccionado;
    });
    let carrera = sistema.carreras.find(function(car) {
      return car.nombre === carreraSeleccionada;
    });
    let numero = sistema.inscripciones.filter(function(ins) {
      return ins.carrera.nombre === carreraSeleccionada;
    }).length + 1;
    let yaInscrito = sistema.inscripciones.some(function(ins) {
      return ins.corredor.cedula === corredorSeleccionado && ins.carrera.nombre === carreraSeleccionada;
    });
    if (numero > carrera.cupo) {
      alert("No hay cupo disponible para esta carrera.");
    } else if (yaInscrito) {
      alert("El corredor ya está inscrito en esta carrera.");
    } else if (corredor.fechaFichaMedica <= carrera.fecha) {
      alert("La ficha médica del corredor está vencida para esta carrera.");
    } else {
      let inscripcion = new Inscripcion(numero, corredor, carrera);
      sistema.agregarInscripcion(inscripcion);
      let patrocinadores = sistema.patrocinadores.filter(function(pat) {
        return pat.carreras.includes(carreraSeleccionada);
      });
      let patrocinadoresText = patrocinadores.map(function(pat) {
        return `${pat.nombre} (${pat.rubro})`;
      }).join(", ")
      alert(`Número: ${inscripcion.numero} \nNombre: ${corredor.toString()} \nCarrera: ${carrera.toString()} \n${patrocinadoresText}`);
      crearPDF(inscripcion.numero, corredor.toString(), carrera.toString(), patrocinadoresText);
    }
  }
}

function crearPDF(numero, corredor, carrera, patrocinadores) {
  let ventana = window.open("", "", "width=600,height=400");
  // Borrar si no es necesario
  // ventana.document.head.innerHTML = "<style>@media print { p { color: blue; } }</style>"; 
  ventana.document.body.innerHTML = `
    <p>Número: ${numero}</p>
    <p>Nombre: ${corredor}</p>
    <p>Carrera: ${carrera}</p>
    <p>${patrocinadores}</p>
  `;
  ventana.focus();
  ventana.print();
  ventana.close();
}

function actualizarEstadisticas() {
  actualizarDatosGenerales();
  actualizarConsultaInscriptos();
  dibujarMapa();
}

function actualizarDatosGenerales() {
  let promedioInsEl = document.getElementById("promedio_inscriptos");
  if (!sistema.carreras.length) {
    promedioInsEl.textContent = "sin datos";
  } else {
    promedioInsEl.textContent = (sistema.inscripciones.length / sistema.carreras.length).toFixed(2)
  }
  
  let carrerasMasInscriptosEl = document.getElementById("carrera_mas_inscriptos");
  carrerasMasInscriptosEl.innerHTML = "";
  let masInscripciones = 0;
  for(let ins of sistema.inscripciones){
    if(ins.numero > masInscripciones){
      masInscripciones = ins.numero;
    }
  }
  let carrerasMasInscriptos = [];
  for(let ins of sistema.inscripciones){
    if(ins.numero === masInscripciones){
      carrerasMasInscriptos.push(ins.carrera);
    }
  }
  for(carrera of carrerasMasInscriptos){
    let li = document.createElement("li");
    li.textContent =`${carrera.toString()} inscriptos: ${masInscripciones}`;
    carrerasMasInscriptosEl.appendChild(li);
  }

  let carrerasSinInscripcionesEl = document.getElementById("carrera_sin_inscriptos");
  carrerasSinInscripcionesEl.innerHTML = "";
  let carrerasSinInscripciones = sistema.carreras.filter(function(car){
    return sistema.inscripciones.every(function(ins) {
      return ins.carrera.nombre !== car.nombre;
    })
  })
  carrerasSinInscripciones.sort(function(a, b) {
   return a.fecha - b.fecha;
  })
  for(let car of carrerasSinInscripciones){
    let li = document.createElement("li");
    li.textContent = car.toString();
    carrerasSinInscripcionesEl.appendChild(li);
  }

  let porcentajeEliteEl = document.getElementById("porcentaje_elite");
  let totalElite = sistema.corredores.filter(function(cor) {
    return cor.tipoDeCorredor === "Deportista de élite";
  }).length;
  if (sistema.corredores.length === 0) {
    porcentajeEliteEl.textContent = "sin datos";
  } else {
    porcentajeEliteEl.textContent = `${(totalElite / sistema.corredores.length * 100).toFixed(2)}%`;
  }
}

function actualizarConsultaInscriptos(){
  let selectCarrera = document.getElementById("carrera_estadistica");
  selectCarrera.innerHTML = "";
  for(let car of sistema.carreras){
    let opcion = document.createElement("option");
    opcion.value = car.nombre;
    opcion.textContent = car.nombre;
    selectCarrera.appendChild(opcion);
  }
  let ordenadoPorNumero = document.getElementById("orden_numero").checked;
  tablaInscriptos(ordenadoPorNumero);
}

function tablaInscriptos(ordenadoPorNumero = false) {
  let selectCarrera = document.getElementById("carrera_estadistica");
  let carreraSeleccionada = selectCarrera.value;
  let tablaInscriptosEl = document.getElementById("inscriptos");
  tablaInscriptosEl.innerHTML = "";
  let inscriptos = sistema.inscripciones.filter(function(ins) {
    return ins.carrera.nombre === carreraSeleccionada;
  });
  if (ordenadoPorNumero) {
    inscriptos.sort(function(a, b) {
      return a.numero - b.numero;
    });
  } else {
    inscriptos.sort(function(a, b) {
      return a.corredor.nombre.localeCompare(b.corredor.nombre);
    });
  }
  for(let ins of inscriptos) {
    let fila = tablaInscriptosEl.insertRow();
    if(ins.corredor.tipoDeCorredor === "Deportista de élite") {
      fila.classList.add("elite");
    }
    let celdaNombre = fila.insertCell();
    celdaNombre.textContent = ins.corredor.nombre;
    let celdaEdad = fila.insertCell();
    celdaEdad.textContent = ins.corredor.edad;
    let celdaCedula = fila.insertCell();
    celdaCedula.textContent = ins.corredor.cedula;
    let celdaFichaMedica = fila.insertCell();
    celdaFichaMedica.textContent = ins.corredor.obtenerFecha();
    let celdaNumero = fila.insertCell();
    celdaNumero.textContent = ins.numero;
    
  }
}

function cambiarCarreraEstadistica() {
  let ordenadoPorNumero = document.getElementById("orden_numero").checked;
  tablaInscriptos(ordenadoPorNumero);
}

google.charts.load('current', {
  'packages': ['geochart']
});

google.charts.setOnLoadCallback(configurarMapa);

function configurarMapa() {
  let formMapa = document.getElementById("form_mapa");

  formMapa.addEventListener("change", function () {
    dibujarMapa();
  });

  dibujarMapa();
}

function dibujarMapa() {
  let opcion = document.querySelector('input[name="orden_mapa"]:checked').value;

  let conteo = {};

  if (opcion === "Por carreras") {
    for (let carrera of sistema.carreras) {
      let depto = carrera.departamento;
      conteo[depto] = (conteo[depto] || 0) + 1;
    }
  } else {
    for (let inscripcion of sistema.inscripciones) {
      let depto = inscripcion.carrera.departamento;
      conteo[depto] = (conteo[depto] || 0) + 1;
    }
  }

  let datos = [['Departamento', 'Cantidad']];
  for (let depto in conteo) {
    datos.push([depto, conteo[depto]]);
  }

  let data = google.visualization.arrayToDataTable(datos);

  let options = {
    region: 'UY',
    resolution: 'provinces',
    displayMode: 'regions',
    colorAxis: { colors: ['#f0f9e8', '#0868ac'] },
    tooltip: { isHtml: true }
  };

  let chart = new google.visualization.GeoChart(document.getElementById('mapa'));
  chart.draw(data, options);
}