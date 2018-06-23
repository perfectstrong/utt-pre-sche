import React, { Component } from 'react';
import { Navbar, NavbarBrand, Container } from "reactstrap";
import UEChooser from './UEChooser';
import UEPreviewer from './UEPreviewer';
import db from "../config/db.json";
import UE from './UE';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chosenUEs: [],
      availableUEs: db.map(o => new UE(o))
    }
  }

  add(UE) {
    let newChoice = this.state.chosenUEs;
    newChoice.push(UE);
    console.debug(newChoice);
    this.setState({ chosenUEs: newChoice });
  }

  remove(UE) {
    let newChoice = this.state.chosenUEs;
    newChoice.splice(this.state.chosenUEs.indexOf(UE), 1);
    console.debug(newChoice);
    this.setState({ chosenUEs: newChoice });
  }

  render() {
    return (
      <div className="App">
        <Navbar dark color="dark">
          <Container className="App-header">
            <NavbarBrand href="/">UTT Schedule Preview</NavbarBrand>
          </Container>
        </Navbar>
        <Container className="App-content">
          <UEChooser availableUEs={this.state.availableUEs} onAddUE={this.add.bind(this)} onRemoveUE={this.remove.bind(this)} chosenUEs={this.state.chosenUEs} />
          <UEPreviewer chosenUEs={this.state.chosenUEs} />
        </Container>
      </div>
    );
  }
}

export default App;