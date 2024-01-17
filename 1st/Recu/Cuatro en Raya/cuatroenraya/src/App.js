//import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapaBotones from './components/MapaBotones';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listaBotones: Array(9).fill(null),
      listaColores: ["danger", "primary"],
      jugadores: ["rojo", "azul"]
    }
    this.carga()
  }

  carga() {
    let copiaBotones = this.state.listaBotones;

    for (let i = 0; i < copiaBotones.length; i++) {
      let aux = []
      for (let j = 0; j < copiaBotones.length; j++) {

        //Como empezará jugando el rojo, le damos el turno:
        aux.push({ pulsado: false, jugadores: "rojo", firstPulsado: false, colorFicha: "" })
      }
      copiaBotones[i] = aux;
    }
    this.setState({ listaBotones: copiaBotones })
  }

  pulsado(x, y) {
    let copiaBotones = this.state.listaBotones;
    //console.log("ANTES DE PULSAR:")
    //console.log(copiaBotones)
    //console.log(copiaBotones[x][y])

    //El programa sólo responderá si pulsamos en cualquier casilla de la primera fila:
    if (x === 0) {
      //Si es la primera vez que pulsamos, ponemos todos los objetos a firstPulsado : "true"
      if (copiaBotones[x][y].firstPulsado === false) {
        copiaBotones.map(element => element.map(e => e.firstPulsado = true))
      }
      //Si la columna está llena, no hacemos nada:
      if (copiaBotones[x][y].pulsado === true) {
        return;
        //Si aún pueden entrar fichas:
      } else {
        //Si pulsa el jugador rojo, pasamos el turno al azul:
        if (copiaBotones[x][y].jugadores === "rojo") {
          for (let i = 0; i < copiaBotones[x].length; i++) {
            //Cuando encontramos una ficha, ponemos una encima:
            if (copiaBotones[i][y].pulsado === true) {
              copiaBotones[i - 1][y].pulsado = true;
              copiaBotones[i - 1][y].colorFicha = "danger";
              //Pasamos el turno al azul:
              copiaBotones.map(element => element.map(e => e.jugadores = "azul"))
              //Rompemos bucle;
              break;
            }
            //Si estamos en la última iteración y no hay ficha, la ponemos:
            if (i === copiaBotones[x].length - 1 && copiaBotones[x][i].pulsado === false) {
              copiaBotones[i][y].pulsado = true;
              copiaBotones[i][y].colorFicha = "danger";
              //Pasamos el turno al azul:
              copiaBotones.map(element => element.map(e => e.jugadores = "azul"))
            }
          }//for
          //Si el que juega es el azul:
        } else {
          if (copiaBotones[x][y].jugadores === "azul") {
            for (let i = 0; i < copiaBotones[x].length; i++) {
              //Cuando encontramos una ficha, ponemos una encima:
              if (copiaBotones[i][y].pulsado === true) {
                copiaBotones[i - 1][y].pulsado = true;
                copiaBotones[i - 1][y].colorFicha = "primary";
                //Pasamos el turno al azul:
                copiaBotones.map(element => element.map(e => e.jugadores = "rojo"))
                //Rompemos bucle;
                break;
              }
              //Si estamos en la última iteración y no hay ficha, la ponemos:
              if (i === copiaBotones[x].length - 1 && copiaBotones[x][i].pulsado === false) {
                copiaBotones[i][y].pulsado = true;
                copiaBotones[i][y].colorFicha = "primary";
                //Pasamos el turno al rojo:
                copiaBotones.map(element => element.map(e => e.jugadores = "rojo"))
              }
            }
          }
        }

        //Comprobamos ganador:

        for (let i = 0; i < copiaBotones.length; i++) {
          for (let j = 0; j < copiaBotones[i].length; j++) {
            //PARA EL COLOR ROJO:
            //Comprobación vertical:
            if (i + 3 < copiaBotones.length) {
              if (copiaBotones[i][j].colorFicha === "danger" && copiaBotones[i + 1][j].colorFicha === "danger" && copiaBotones[i + 2][j].colorFicha === "danger" && copiaBotones[i + 3][j].colorFicha === "danger") {
                alert("HA GANADO ROJO")
              }
            }
            //Comprobación horizontal:
            if (j + 3 < copiaBotones[i].length) {
              if (copiaBotones[i][j].colorFicha === "danger" && copiaBotones[i][j + 1].colorFicha === "danger" && copiaBotones[i][j + 2].colorFicha === "danger" && copiaBotones[i][j + 3].colorFicha === "danger") {
                alert("HA GANADO ROJO")
              }
            }


            //PARA EL COLOR AZUL:
            //Comprobación vertical:
            if (i + 3 < copiaBotones.length) {
              if (copiaBotones[i][j].colorFicha === "primary" && copiaBotones[i + 1][j].colorFicha === "primary" && copiaBotones[i + 2][j].colorFicha === "primary" && copiaBotones[i + 3][j].colorFicha === "primary") {
                alert("HA GANADO AZUL")
                break;
              }
            }
            //Comprobación horizontal:
            if (j + 3 < copiaBotones[i].length) {
              if (copiaBotones[i][j].colorFicha === "primary" && copiaBotones[i][j + 1].colorFicha === "primary" && copiaBotones[i][j + 2].colorFicha === "primary" && copiaBotones[i][j + 3].colorFicha === "primary") {
                alert("HA GANADO AZUL")
                break;
              }
            }
          }
        }

        this.setState({ listaBotones: copiaBotones })

        //console.log("DESPUÉS DE PULSAR")
        //console.log(copiaBotones)
        //console.log(copiaBotones[x][y])
      }
    }
  }

  render() {
    return (
      <div>
        <p>
          Se pide que hagas un juego de 4 en raya. Con las siguientes reglas:
          <ol>
            <li>El tablero es un 9x9</li>
            <li>Habrá dos jugadores, uno rojo y otro azul y se irán turnando.</li>
            <li>Solamente se puede pulsar en la primera fila y se irán colocando las fichas desde abajo (como en las 4 en raya).</li>
            <li>Si la columna está llena, al pulsar sobre la primera fila de dicha columna no se consume turno.</li>
            <li>El tablero se bloquea cuando se termina el juego.</li>
            <li>El programa avisa si ganas.</li>
            <li>Solamente se comprueban las 4 en raya horizontales y verticales (no diagonales).</li>
          </ol>
        </p>

        <div className='App'>
          <MapaBotones
            listaBotones={this.state.listaBotones}
            pulsado={(x, y) => this.pulsado(x, y)}
            jugadores={this.state.jugadores}
          />
        </div>
      </div>
    );
  }
}

export default App;