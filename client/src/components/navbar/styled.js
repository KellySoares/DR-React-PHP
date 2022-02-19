import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';


export const NavbarStyle = styled(Navbar)`
    
    .navbar-toggler {
        background-color: #0dcaf0;
    }
`;
export const ContainerStyle = styled(Container)`
    margin: auto;
`;

export const LinkStyle = styled(Link)`
    margin-left: 5em;
    margin-right: 5em;
    text-decoration: none;
`;
