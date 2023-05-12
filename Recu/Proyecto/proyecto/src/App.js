import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import AppLogin from './components/AppLogin';
import Titulo from './components/Titulo';
import Uno from './components/Uno';
import Dos from './components/Dos';
import Tres from './components/Tres';
import { PHPLOGIN } from './components/Datos'
import axios from 'axios';

const baseURL = "http://localhost/PHP/REACT/servicios_rest";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuItem: undefined,
      info: "",
      logged: false,
      titulo: "",
      post: "",
    }
  }

  
  componentDidMount(){
    axios.get(baseURL+"/obtener_productos").then(res => {
      const productos = res.data;
      this.setState({post : productos.productos})
    })
  }

  changeMenu(item) {
    this.setState({ menuItem: item })
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

  mostrarProductos(){
    for (let i = 0; i < this.state.post.length; i++){
      console.log(this.state.post[i])
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
        <Menu menuItem={this.state.menuItem} changeMenu={(item) => this.changeMenu(item)} />
      )
      obj.push(<Titulo titulo={this.state.titulo} />)
      if (this.state.menuItem === "UNO") obj.push(<Uno setTitulo={(t) => this.setTitulo(t)} />)
      if (this.state.menuItem === "DOS") obj.push(<Dos setTitulo={(t) => this.setTitulo(t)} />)
      if (this.state.menuItem === "TRES") obj.push(<Tres setTitulo={(t) => this.setTitulo(t)} />)

    }
    return (
      <div className="App">
        {obj}
        {this.mostrarProductos()}
      </div>
    );
  }
}

export default App;