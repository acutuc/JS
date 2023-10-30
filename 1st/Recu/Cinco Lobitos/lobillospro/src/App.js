import './App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MiBoton from './componentes/MiBoton';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pulsaciones: [0, 0, 0],
      colores: ["secondary", "secondary", "secondary"],
    };
  }

  //esta función siempre se ejecuta siempre y cuando haya un renderizado.
  componentDidMount() {
    //console.log("hola");
    let copiaState = this.state;
    for (let i = 0; i < this.state.colores.length; i++) {
      //Todos empiezan en rojo
      if (this.state.pulsaciones[i] === 0) {
        copiaState.colores[i] = "danger";
      } else {
        //Cuando se ha pulsado alguna vez, se ponen amarillos
        copiaState.colores[i] = "warning";
      }
    }
    //console.log("cambio");
    this.setState(copiaState);
  }

  //esta función se ejecuta después de un setState. onchange
  componentDidUpdate() {
    //console.log("adios");
  }

  //Función para comprobar cual es el mayor.
  comprobarMayor(pos) {
    //Hago una copia del estado COMPLETO
    let copiaState = this.state;

    //Recojo el valor de las pulsaciones:
    let valor = copiaState.pulsaciones[pos];

    //Inicializo una variable boolean
    let esMayor = true;

    for (let i = 0; i < this.state.pulsaciones.length; i++) {
      if (valor < this.state.pulsaciones[i] && pos !== i) {
        esMayor = false;
        break;
      }
    }

    if (esMayor) {
      this.todosWarning(pos);
      copiaState.colores[pos] = "success";
    } else {
      copiaState.colores[pos] = "warning";
    }
    this.setState(copiaState);

  }

  //Función que pone todos los números menores en warning
  todosWarning(pos) {
    let copiaState = this.state;
    for (let i = 0; i < this.state.pulsaciones.length; i++) {
      if (i !== pos) {
        copiaState.colores[i] = "warning";
      }
    }
    this.setState(copiaState);
  }

  sumar(pos) {
    let copiaState = this.state;
    copiaState.pulsaciones[pos]++;
    this.setState(copiaState);
    this.comprobarMayor(pos);
  }

  render() {
    return (
      <div className="App">
        <MiBoton
          pulsaciones={this.state.pulsaciones[0]}
          colores={this.state.colores[0]}
          suma={() => this.sumar(0)}
        />
        <MiBoton
          pulsaciones={this.state.pulsaciones[1]}
          colores={this.state.colores[1]}
          suma={() => this.sumar(1)}
        />
        <MiBoton
          pulsaciones={this.state.pulsaciones[2]}
          colores={this.state.colores[2]}
          suma={() => this.sumar(2)}
        />
      </div>
    );
  }

}

export default App;
