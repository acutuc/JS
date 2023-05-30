import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import AppLogin from './components/AppLogin';
import Almacen from './components/Almacen';
import Opciones from './components/Opciones';
import Logout from './components/Logout';
import { PHPLOGIN } from './components/Datos'
import axios from 'axios';

const baseURL = "http://localhost/PHP/REACT/servicios_rest";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opcionesItem: undefined,
      info: "",
      logged: false,
      titulo: "",
      productos: []
    }
  }

  componentDidMount() {
    axios.get(baseURL + "/obtener_productos").then(res => {
      const productos = res.data;
      this.setState({ productos: productos.productos })
    })
  }

  actualizarProductos = async (productos) => {
    try {
      await axios.put(baseURL + "/actualizarProductos", { productos });
      console.log("Datos de productos actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los datos de los productos:", error);
    }
  };

  changeOpciones(item) {
    this.setState({ opcionesItem: item })
  }

  userLogin(telefono, password) {
    axios.post(PHPLOGIN, JSON.stringify({
      telefono: telefono,
      password: password
    })).then(res => {
      if (res.data.usuario !== undefined) {
        this.setState({ logged: true })
      }
      this.setState({ info: res.data.mensaje })
    }
    );
  }
  setInfo(i) {
    this.setState({ info: i })
  }
  setTitulo(t) {
    this.setState({ titulo: t })
  }

  mostrarProductos() {
    for (let i = 0; i < this.state.productos.length; i++) {
      console.log(this.state.productos[i])
    }
  }

  render() {
    let obj = [];
    if (!this.state.logged) {
      obj.push(
        <AppLogin setInfo={(i) => this.setInfo(i)} userLogin={(telefono, password) => this.userLogin(telefono, password)} info={this.state.info} />
      )
    } else {
      obj.push(
        <Opciones opcionesItem={this.state.opcionesItem} changeOpciones={(item) => this.changeOpciones(item)} />
      )
      if (this.state.opcionesItem === "Almacen") obj.push(<Almacen productos={this.state.productos} actualizarProductos={(productos) => this.setState({ productos })} />);
      if (this.state.opcionesItem === "Menu") obj.push(<Menu productos={this.state.productos}/>)
      if (this.state.opcionesItem === "Logout") obj.push(<AppLogin setInfo={() => this.setInfo("")} userLogin={() => this.userLogin("")} info={this.state.info} />)

    }
    return (
      <div className="App">
        {obj}
      </div>
    );
  }
}

export default App;