import {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Button} from 'reactstrap';
import GestionAlmacen from './components/GestionAlmacen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicamentosIncluidos : [],
      medicamentosExcluidos : [],
    }
  }

  //Métodos

  render() {
    return (
      <div className="App">
        <GestionAlmacen></GestionAlmacen>
      </div>
    )

  }

}

export default App;
