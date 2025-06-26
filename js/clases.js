// Camilo Ramírez (363781) Noelia López (358582)

class Sistema {
  constructor() {
    this.carreras = [];
    this.corredores = [];
    this.patrocinadores = [];
    this.inscripciones = [];
  }

  agregarCarrera(carrera) {
    let esValida = true;
    for (let car of this.carreras) {
      if (car.nombre === carrera.nombre) {
        esValida = false;
      }
    }
    if (esValida) {
      this.carreras.push(carrera);
      this.carreras.sort(function(a,b){
        return a.nombre.localeCompare(b.nombre)
      })
    }
    return esValida;
  }

  agregarPatrocinador(patrocinador) {
    let index = -1;
    for (let pat of this.patrocinadores) {
      if (pat.nombre === patrocinador.nombre) {
        index = this.patrocinadores.indexOf(pat);
      }
    }
    if (index === -1) {
      this.patrocinadores.push(patrocinador);
    } else {
      this.patrocinadores[index].rubro = patrocinador.rubro;
      this.patrocinadores[index].carreras = patrocinador.carreras;
    }
  }

  agregarCorredor(corredor) {
    let esValido = true;
    for (let cor of this.corredores) {
      if (cor.cedula === corredor.cedula) {
        esValido = false;
      }
    }
    if (esValido) {
      this.corredores.push(corredor);
      this.corredores.sort(function(a,b){
        return a.nombre.localeCompare(b.nombre)
      })
    }
    return esValido
  }

  agregarInscripcion(inscripcion) {
    this.inscripciones.push(inscripcion);
  }
}

class Carrera {
  constructor(nombre, departamento, fecha, cupo) {
    this.nombre = nombre;
    this.departamento = departamento;
    this.fecha = fecha;
    this.cupo = cupo;
  }
  obtenerFecha() {
    let dia = this.fecha.getDate();
    let mes = this.fecha.getMonth() + 1;
    let ano = this.fecha.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
  toString() {
    return `${this.nombre} en ${this.departamento} el ${this.obtenerFecha()} Cupo: ${this.cupo}`;
  }
}

class Patrocinador {
  constructor(nombre, rubro, carreras) {
    this.nombre = nombre;
    this.rubro = rubro;
    this.carreras = carreras;
  }
}

class Corredor {
  constructor(nombre, edad, cedula, fechaFichaMedica, tipoDeCorredor) {
    this.nombre = nombre;
    this.edad = edad;
    this.cedula = cedula;
    this.fechaFichaMedica = fechaFichaMedica;
    this.tipoDeCorredor = tipoDeCorredor;
  }
  obtenerFecha() {
    let dia = this.fechaFichaMedica.getDate();
    let mes = this.fechaFichaMedica.getMonth() + 1;
    let ano = this.fechaFichaMedica.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
  toString() {
    return `${this.nombre} ${this.edad} años, CI: ${this.cedula} Ficha Medica: ${this.obtenerFecha()} ${this.tipoDeCorredor}`
  }
}
class Inscripcion {
  constructor(numero, corredor, carrera){
    this.numero = numero;
    this.corredor = corredor; 
    this.carrera = carrera; 
  }
}

