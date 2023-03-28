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

        aux.push({ color: "info", pulsado: 0, firstPulsado: false })
      }
      copiaBotones[i] = aux;
    }
    this.setState({ listaBotones: copiaBotones })
  }

  pulsado(x, y) {
    console.log(x)
    console.log(y)
    let copiaBotones = this.state.listaBotones;
    
    if(copiaBotones[x][y].firstPulsado === false){
      copiaBotones[x][y].color = "primary";
    }

    //Ponemos toda la matriz a firstpulsado = true
    copiaBotones.map(e => e.map(e2 => e2.firstPulsado = true))

    if(copiaBotones[x+1][y].color === "primary" || copiaBotones[x-1][y].color === "primary" || copiaBotones[x][y+1].color === "primary" || copiaBotones[x][y-1].color === "primary"){
      copiaBotones[x][y].color = "primary"
    }

    console.log(copiaBotones[x][y].color)
    console.log(copiaBotones[x][y].firstPulsado)

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