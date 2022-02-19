import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../components/navbar';

const Layout = ({ children }) => {
    return (<>
        <NavBar />
        <Container className="container" >
            {children}
        </Container>
    </>

    )
}

export default Layout;