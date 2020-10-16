function pptJuego(tuEleccion) {
  /* console.log(tuEleccion);
  console.log(tuEleccion.id); */

  //?Elecciones humano, computadora y resultados
  let eleccionHumano, eleccionComputadora, resultados;
  eleccionHumano = tuEleccion.id;
  eleccionComputadora = numeroAEleccion(numeroAlAzar());

  console.log("Eleccion Humano: ", eleccionHumano);
  console.log("Eleccion Computadora: ", eleccionComputadora);

  resultados = decideGanador(eleccionHumano, eleccionComputadora);

  console.log("Resultados:", resultados);

  //[1,0] humano gano | computadora perdio
  //[0,1] humano perdio | computadora gano
  //[0.5, 0.5] empate

  //?Decidir Ganador

  //?Que mensaje mostrar deacuerdo a los resultados
  //Regresa objeto {'mensaje': 'Tu ganaste', 'color': 'green' } Tu ganaste, Tu perdiste, empate
  let mensaje = mensajeFinal(resultados);
  console.log(mensaje);

  //?Mostrar Imagenes - HUMANO - mensaje - Computadora
  muestraPantallaFinal(eleccionHumano, mensaje, eleccionComputadora);
}

//?Computadora elegir al azar
//Math.random();
//Math.random() * 3; ELEGIR ENTRE 0 - 2
//Math.floor(4.8) REDONDEAR
//Math.floor(Math.random()*3)

function numeroAlAzar() {
  return Math.floor(Math.random() * 3);
}

function numeroAEleccion(numero) {
  return ["piedra", "papel", "tijeras"][numero];
}

function decideGanador(eleccionHumano, eleccionComputadora) {
  let pequeBaseDatos = {
    piedra: { tijeras: 1, piedra: 0.5, papel: 0 },
    papel: { piedra: 1, papel: 0.5, tijeras: 0 },
    tijeras: { papel: 1, tijeras: 0.5, piedra: 0 },
  };

  let tuPuntuacion = pequeBaseDatos[eleccionHumano][eleccionComputadora]; //? 0.5
  let computadoraPuntuacion =
    pequeBaseDatos[eleccionComputadora][eleccionHumano]; //? 0.5

  return [tuPuntuacion, computadoraPuntuacion]; //?[0.5, 0.5]
}

function mensajeFinal([tuPuntuacion, computadoraPuntuacion]) {
  if (tuPuntuacion == 0) {
    return { mensaje: "Perdiste!", color: "red" };
  } else if (tuPuntuacion == 0.5) {
    return { mensaje: "Empate!", color: "yellow" };
  } else {
    return { mensaje: "Ganaste!", color: "green" };
  }
}

function muestraPantallaFinal(
  imagenEleccionHumano,
  mensaje,
  imagenEeleccionComputadora
) {
  let imagenesBaseDatos = {
    piedra: document.getElementById("piedra").src,
    papel: document.getElementById("papel").src,
    tijeras: document.getElementById("tijeras").src,
  };

  //? imagenesBaseDatos['piedra']

  //? Quitar todas las imagenesBaseDatos
  document.getElementById("piedra").remove();
  document.getElementById("papel").remove();
  document.getElementById("tijeras").remove();

  //? Mostar como se van las imagenes

  //?Crear divs para cada imagen y texto
  let humanoDiv = document.createElement("div");
  let computadoraDiv = document.createElement("div");
  let mensajeDiv = document.createElement("div");

  //?HUMANO
  //?crear una etiqueta de html
  humanoDiv.innerHTML = `<img src = ${imagenesBaseDatos[imagenEleccionHumano]} class="humano" />`;
  //?Pegar lo que creamos al div
  document.getElementById("imagenes-div").appendChild(humanoDiv);

  //?MENSAJE
  mensajeDiv.innerHTML = `<h1 style=color:${mensaje["color"]}  > ${mensaje["mensaje"]} </h1>`;
  document.getElementById("imagenes-div").appendChild(mensajeDiv);

  //?COMPUTADORA
  //?crear una etiqueta de html
  computadoraDiv.innerHTML = `<img src = ${imagenesBaseDatos[imagenEeleccionComputadora]} class="computadora"  />`;
  //?Pegar lo que creamos al div
  document.getElementById("imagenes-div").appendChild(computadoraDiv);
}
