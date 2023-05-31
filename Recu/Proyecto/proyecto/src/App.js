import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import AppLogin from './components/AppLogin';
import Almacen from './components/Almacen';
import Opciones from './components/Opciones';
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

  actualizarProductos = (nuevosProductos) => {
    this.setState({ productos : nuevosProductos });
  };

  addNewItem = async (updatedProducts) => {
    try {
      await axios.put(baseURL + '/actualizarProductos', { productos: updatedProducts });
      console.log('Datos de productos actualizados correctamente');
  
      // Actualizar el estado de los productos en el componente padre
      this.setState({ productos: updatedProducts });
  
      // Realizar otras acciones después de actualizar los productos si es necesario
  
    } catch (error) {
      console.error('Error al actualizar los datos de los productos:', error);
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

  logoutUser() {
    this.setState({
      logged: false,
      info: ""
    });
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
    console.log(this.state.productos)
    if (!this.state.logged) {
      obj.push(
        <AppLogin setInfo={(i) => this.setInfo(i)} userLogin={(telefono, password) => this.userLogin(telefono, password)} info={this.state.info} />
      )
    } else {
      obj.push(
        <Opciones opcionesItem={this.state.opcionesItem} changeOpciones={(item) => this.changeOpciones(item)} logoutUser={() => this.logoutUser()}/>
      )
      if (this.state.opcionesItem === "Almacen") obj.push(<Almacen productos={this.state.productos} actualizarProductos={(nuevosProductos)=> this.actualizarProductos(nuevosProductos)} />);
      if (this.state.opcionesItem === "Menu") obj.push(<Menu productos={this.state.productos} addNewItem={this.addNewItem} actualizarProductos={this.actualizarProductos} />)
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