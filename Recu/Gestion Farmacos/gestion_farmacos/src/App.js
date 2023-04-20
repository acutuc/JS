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
      medicamentos : [""],
    }
  }


  render() {
    return (
      <div className="App">
        <Gestion medicamentos={this.state.medicamentos}/>
      </div>
    )

  }

}

export default App;
