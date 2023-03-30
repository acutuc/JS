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
      listaColores: ["primary", "secondary", "success", "warning", "danger"],
    }
    this.carga();
  }

  carga() {
    let copiaBotones = this.state.listaBotones;

    for (let i = 0; i < copiaBotones.length; i++) {
      let aux = []
      for (let j = 0; j < copiaBotones.length; j++) {

        aux.push({ color: "info", iteracion: 0, firstPulsado: false, lastColor: "" })
      }
      copiaBotones[i] = aux;
    }
    this.setState({ listaBotones: copiaBotones })
  }

  pulsado(x, y) {
    let copiaBotones = this.state.listaBotones;

    if (copiaBotones[x][y].firstPulsado === false) {
      //Guardamos el último color en todos los objetos
      copiaBotones.map(e => e.map(e2 => e2.lastColor = copiaBotones[x][y].color))

      //Actualizamos el color actual
      copiaBotones[x][y].color = "primary";
      copiaBotones.map(e => e.map(e2 => e2.iteracion = 1))
    }

    //Cuando pulsamos aunque sea una sola vez, ponemos toda la matriz a firstpulsado = true
    copiaBotones.map(e => e.map(e2 => e2.firstPulsado = true))
    console.log(copiaBotones[x][y].iteracion)

    if (copiaBotones[x][y].iteracion === 1) {
      if (copiaBotones[x + 1][y].color === "primary" || copiaBotones[x - 1][y].color === "primary" || copiaBotones[x][y + 1].color === "primary" || copiaBotones[x][y - 1].color === "primary") {
        copiaBotones[x][y].color = "primary"
      }
    }else{
      copiaBotones.map(e => e.map(e2 => e2.iteracion++))
    }



    if (copiaBotones[x][y].iteracion === 2) {
      copiaBotones[x][y].color = "secondary"
      if (copiaBotones[x + 1][y].color === "secondary" || copiaBotones[x - 1][y].color === "secondary" || copiaBotones[x][y + 1].color === "secondary" || copiaBotones[x][y - 1].color === "secondary") {
        copiaBotones[x][y].color = "secondary"
      }
    } else if (copiaBotones[x][y].iteracion === 3) {
      copiaBotones[x][y].color = "success"
      if (copiaBotones[x + 1][y].color === "success" || copiaBotones[x - 1][y].color === "success" || copiaBotones[x][y + 1].color === "success" || copiaBotones[x][y - 1].color === "success") {
        copiaBotones[x][y].color = "success"
      }
    } else if (copiaBotones[x][y].iteracion === 4) {
      copiaBotones[x][y].color = "warning"
      if (copiaBotones[x + 1][y].color === "warning" || copiaBotones[x - 1][y].color === "warning" || copiaBotones[x][y + 1].color === "warning" || copiaBotones[x][y - 1].color === "warning") {
        copiaBotones[x][y].color = "warning"
      }
    } else if (copiaBotones[x][y].iteracion === 5) {
      copiaBotones[x][y].color = "danger"
      if (copiaBotones[x + 1][y].color === "danger" || copiaBotones[x - 1][y].color === "danger" || copiaBotones[x][y + 1].color === "danger" || copiaBotones[x][y - 1].color === "danger") {
        copiaBotones[x][y].color = "danger"
      }
    } else {

    }

    if (copiaBotones[x][y].iteracion > 5) {
      copiaBotones.map(e => e.map(e2 => e2.iteracion = 1))
    }

    console.log(copiaBotones[x][y].iteracion)

    this.setState({ listaBotones: copiaBotones });
    console.log(copiaBotones)
  }

  render() {
    return (
      <MapaBotones
        listaBotones={this.state.listaBotones}
        pulsado={(x, y) => this.pulsado(x, y)}
      />
    );
  }
}

export default App;