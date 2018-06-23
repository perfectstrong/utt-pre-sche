import React from "react";
import { Container, Form, Input, FormGroup, FormText, Label, Col, Button } from "reactstrap";

export default class UEChooser extends React.Component {
  render() {
    return (
      <Container id="Chooser" className="m-3">
        <span className="text-info">Prévisualiser votre calendrier lors d'inscription aux UEs.</span>
        <UEInput availableUEs={this.props.availableUEs} onAddUE={this.props.onAddUE} onRemoveUE={this.props.onRemoveUE} chosenUEs={this.props.chosenUEs} />
      </Container>
    );
  }
}

class UEInput extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup row className="my-3">
          <Label for="UEInput" sm={2}>UE code:</Label>
          <Col sm={2}>
            <Input type="text" id="UEInput" name="UEInput" />
          </Col>
          <FormText color="muted" className="sm-2">
            Par example: <i>MATH01, LO07, etc.</i>
          </FormText>
        </FormGroup>
        <FormGroup row className="my-3">
          {this.props.availableUEs.map(ue => <UETag ue={ue} key={ue.codename} onAddUE={this.props.onAddUE} onRemoveUE={this.props.onRemoveUE} />)}
        </FormGroup>
      </Form>
    );
  }
}

class UETag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }

  toggle() {
    if (this.state.selected) {
      this.setState({ selected: false });
      this.props.onRemoveUE(this.props.ue);
    } else {
      this.setState({ selected: true });
      this.props.onAddUE(this.props.ue);
    }
  }

  render() {
    return (
      <Button outline={!this.state.selected} color={this.state.selected ? "primary" : "secondary"} className="mx-1" onClick={this.toggle.bind(this)}>
        {this.props.ue.codename}
      </Button>
    );
  }
}