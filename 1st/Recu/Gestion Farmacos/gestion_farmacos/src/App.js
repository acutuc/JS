import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component } from 'react';
import { Toast, ToastHeader, ToastBody, Input} from 'reactstrap';
import Farmacos from './components/Farmacos';
import Gestion from './components/Gestion';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicamentosIncluidos : [],
      medicamentosExcluidos : [],
    }
  }

  anadirMedicamentoIncluido(medicamento){
    let copia = this.state.medicamentosIncluidos;

    copia.push(medicamento);

    this.setState({medicamentosIncluidos : copia});
  }

  eliminarMedicamentosIncluidos(){
    let copia = this.state.medicamentosIncluidos;

    copia = "";

    this.setState({medicamentosIncluidos : copia});
  }

  anadirMedicamentoExcluido(medicamento){
    let copia = this.state.medicamentosExcluidos;

    copia.push(medicamento);

    this.setState({medicamentosExcluidos : copia});
  }

  eliminarMedicamentosExcluidos(){
    let copia = this.state.medicamentosExcluidos;

    copia = "";

    this.setState({medicamentosExcluidos : copia});
  }


  render() {
    return (
      <div className="App">
        <Gestion medicamentosIncluidos={this.state.medicamentosIncluidos} anadirMedicamentoIncluido={(medicamento) => this.anadirMedicamentoIncluido(medicamento)} eliminarMedicamentosIncluidos={() => this.eliminarMedicamentosIncluidos()} medicamentosExcluidos={this.state.medicamentosExcluidos} anadirMedicamentoExcluido={(medicamento) => this.anadirMedicamentoExcluido(medicamento)} eliminarMedicamentosExcluidos={() => this.eliminarMedicamentosExcluidos()}/>
      </div>
    )

  }

}

export default App;
