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
  constructor(props) {
    super(props);
    this.state = {
      showAllAvailableUEs: true,
      containsWord: ""
    }
  }

  toggle(checked) {
    this.setState({ showAllAvailableUEs: checked });
  }

  filter(e) {
    this.setState({ containsWord: e.target.value });
  }

  checkVisibility(ue) {
    if (!this.state.showAllAvailableUEs) return false;
    if (this.state.containsWord && !ue.codename.includes(this.state.containsWord.toUpperCase())) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <Form>
        <FormGroup row className="my-3">
          <Label for="UEInput" sm={2}>UE code:</Label>
          <Col sm={2}>
            <Input type="text" id="UEInput" name="UEInput" onChange={this.filter.bind(this)} />
          </Col>
          <FormText color="muted" className="sm-2">
            Par example: <i>MATH01, LO07, etc.</i>
          </FormText>
        </FormGroup>
        <FormGroup className="my-1">
          <Label check>
            <Input type="checkbox" checked={this.state.showAllAvailableUEs} onChange={e => this.toggle(e.target.checked)} />
            Afficher tous les UEs ouvertes
          </Label>
        </FormGroup>
        <FormGroup row className="my-3 availableUEs">
          {this.props.availableUEs.map(ue =>
            <UETag ue={ue} key={ue.codename} onAddUE={this.props.onAddUE} onRemoveUE={this.props.onRemoveUE}
              selected={this.props.chosenUEs.includes(ue)} visible={this.checkVisibility(ue)} />)}
        </FormGroup>
      </Form>
    );
  }
}

class UETag extends React.Component {
  toggle() {
    if (this.props.selected) {
      this.props.onRemoveUE(this.props.ue);
    } else {
      this.props.onAddUE(this.props.ue);
    }
  }

  render() {
    return (
      this.props.visible ?
        <Button outline={!this.props.selected} color={this.props.selected ? "primary" : "secondary"} className="m-1" onClick={this.toggle.bind(this)}>
          {this.props.ue.codename}
        </Button>
        : null
    );
  }
}