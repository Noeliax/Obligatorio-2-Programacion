// Camilo Ramírez (363781) Noelia López (358582)
class Sistema {
  constructor () {
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
      this.carreras.push(carrera)
    }
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
      return true;
    } else {
      return false;
    }
  }

}

class Carrera {
  constructor (nombre, departamento, fecha, cupo) {
    this.nombre = nombre;
    this.departamento = departamento;
    this.fecha = fecha;
    this.cupo = cupo;
  }
}

class Patrocinador {
  constructor (nombre, rubro, carreras) {
    this.nombre = nombre;
    this.rubro = rubro;
    this.carreras = carreras;
  }
}

class Corredor {
  constructor (nombre, edad, cedula, fechaFichaMedica, tipoDeCorredor) {
    this.nombre = nombre;
    this.edad = edad;
    this.cedula = cedula;
    this.fechaFichaMedica = fechaFichaMedica;
    this.tipoDeCorredor = tipoDeCorredor;
  }
}
class Inscripcion {

}

