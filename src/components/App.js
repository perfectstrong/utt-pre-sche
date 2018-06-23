import React, { Component } from 'react';
import { Navbar, NavbarBrand, Container } from "reactstrap";
import UVChooser from './UVChooser';
import UVPreviewer from './UVPreviewer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar dark color="dark">
          <Container className="App-header">
            <NavbarBrand href="/">UTT Schedule Preview</NavbarBrand>
          </Container>
        </Navbar>
        <Container className="App-content">
          <UVChooser />
          <UVPreviewer />
        </Container>
      </div>
    );
  }
}

export default App;
