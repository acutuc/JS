import React from 'react';
import { Navbar, NavLink, NavbarBrand, Button, ButtonGroup } from 'reactstrap'

export default function Menu(props) {
    let colorUno = 'secondary';
    let colorDos = 'secondary';
    let colorTres = 'secondary';
    
    // eslint-disable-next-line default-case
    switch (props.menuItem) {
        case "UNO":
            colorUno = 'primary';
            break;
        case "DOS":
            colorDos = 'primary';
            break;
        case "TRES":
            colorTres = 'primary';
            break;

    }
    return (
        <div>
            <Navbar>
                <NavbarBrand href="/">MYFPSCHOOL</NavbarBrand>
                <NavLink>
                    <ButtonGroup>
                        <Button color={colorUno} onClick={()=>props.changeMenu("UNO")}>Almacén</Button>
                        <Button color={colorDos} onClick={()=>props.changeMenu("DOS")}>Menú</Button>
                        <Button color="danger" onClick={()=>props.changeMenu("TRES")}>Logout</Button>
                    </ButtonGroup>
                </NavLink>
            </Navbar>
        </div>

    );
}