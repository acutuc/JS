import React from 'react';
import { Navbar, NavLink, NavbarBrand, Button, ButtonGroup } from 'reactstrap'

export default function Opciones(props) {
    let colorAlmacen = 'secondary';
    let colorMenu = 'secondary';
    
    // eslint-disable-next-line default-case
    switch (props.opcionesItem) {
        case "Almacen":
            colorAlmacen = 'primary';
            break;
        case "Menu":
            colorMenu = 'primary';
            break;
    }
    return (
        <div>
            <Navbar>
                <NavbarBrand href="/"></NavbarBrand>
                <NavLink>
                    <ButtonGroup>
                        <Button color={colorAlmacen} onClick={()=>props.changeOpciones("Almacen")}>Almacén</Button>
                        <Button color={colorMenu} onClick={()=>props.changeOpciones("Menu")}>Menú</Button>&nbsp;
                        <Button color="danger" onClick={props.logoutUser}>Logout</Button>
                    </ButtonGroup>
                </NavLink>
            </Navbar>
        </div>

    );
}