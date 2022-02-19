import React from 'react';
import { Nav } from 'react-bootstrap';

import logo from "../../assets/images/logo.png";


import * as S from "./styled";

const NavBar = () => {
    return (
        <S.NavbarStyle sticky="top" collapseOnSelect expand="lg" bg="light" variant="light">
            <S.ContainerStyle>
                <S.NavbarStyle.Brand href="#home">
                    <img width="80px" src={logo} alt="Tinta" />
                </S.NavbarStyle.Brand>

                <S.NavbarStyle.Toggle aria-controls="responsive-navbar-nav" />
                <S.NavbarStyle.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <S.LinkStyle to="/">
                            Home
                        </S.LinkStyle>
                        <S.LinkStyle to="/calc">
                            Calculdora
                        </S.LinkStyle>
                    </Nav>
                </S.NavbarStyle.Collapse>
            </S.ContainerStyle>
        </S.NavbarStyle>
    )
}

export default NavBar;