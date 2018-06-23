import React from "react";
import { Container, Button } from "reactstrap";

export default class UEPreviewer extends React.Component {
  render() {
    return (
      <Container id="Previewer">
        <Status chosenUEs={this.props.chosenUEs} />
      </Container>
    );
  }
}

class Status extends React.Component {
  render() {
    console.log(this.props.chosenUEs);
    return (
      <div className="my-3">
        <span>UE(s) chosie(s):</span>
        {this.props.chosenUEs.map(ue => <Button color="link" className="mx-1" key={ue.codename}>{ue.codename}</Button>)}
      </div>
    );
  }
}