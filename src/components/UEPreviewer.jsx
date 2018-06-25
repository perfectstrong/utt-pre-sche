import React from "react";
import { Container, Button, Col, Row } from "reactstrap";
import moment from "moment";

export default class UEPreviewer extends React.Component {
  render() {
    return (
      <Container id="Previewer">
        <Status chosenUEs={this.props.chosenUEs} onRemoveUE={this.props.onRemoveUE} />
        <TimeTable chosenUEs={this.props.chosenUEs} />
      </Container>
    );
  }
}

class Status extends React.Component {
  render() {
    return (
      <div className="my-3">
        <span>UE(s) chosie(s):</span>
        {this.props.chosenUEs.map(ue =>
          <Button color="primary" className="mx-1" key={ue.codename} onClick={_ => this.props.onRemoveUE(ue)}>
            {ue.codename}
          </Button>)}
      </div>
    );
  }
}

const weekdays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
const lineHeight = 30;
const lineHeightUnit = "px";

class TimeTable extends React.Component {
  render() {
    let schedule = [];
    weekdays.forEach((_, i) => schedule[i] = []);
    this.props.chosenUEs.forEach(ue => ue.classes.forEach(cl => schedule[cl.onWeekday].push(cl)));
    return (
      <Container id="TimeTable">
        <Row className="days">
          <Col className="hours">
            {" "}
          </Col>
          {weekdays.map((d, i) => i > 0 ?
            <Col key={d} className="weekday text-center px-0"><span className="text-info">{d}</span></Col>
            : null)}
        </Row>
        <Row className="clearfix">
        </Row>
        <Row>
          <Col className="hours">
            {hours.map(h => <div key={h} className="line"><span className="hour text-center text-info">{h}</span></div>)}
          </Col>
          {weekdays.map((d, i) => i > 0 ? <Day key={d} day={d} classes={schedule[i]} /> : null)}
        </Row>
      </Container>
    );
  }
}

class Day extends React.Component {
  render() {
    return (
      <Col className="weekday px-0">
        <Background />
        {console.debug(this.props.day, this.props.classes)}
        {this.props.classes.map((cl, i) => <Class class={cl} key={i} />)}
      </Col>
    );
  }
}

class Class extends React.Component {
  render() {
    let t = this.props.class.startTime.diff(moment("0800", "HHmm").day(this.props.class.onWeekday), "minutes") / 30 * lineHeight;
    let h = this.props.class.endTime.diff(this.props.class.startTime, "minutes") / 30 * lineHeight;
    let type = this.props.class.type;
    let title = this.props.class.ue;
    let subtitle = this.props.class.room + " - " + this.props.class.type;
    return (
      <div className={["class", type, this.props.class.onWeek ? this.props.class.onWeek : ""].join(' ')}
        style={{
          height: h + lineHeightUnit,
          top: t + lineHeightUnit
        }}>
        <span className="text-capitalize alert-link text-center">{title}</span>
        <span className="text-capitalize text-center">{subtitle}</span>
        {this.props.class.onWeek ? <span className="text-capitalize text-center">{this.props.class.onWeek}</span> : null}
      </div>
    );
  }
}

class Background extends React.Component {
  constructor() {
    super();
    this.state = {
      bg: []
    }
    hours.forEach((h, i) =>
      i < hours.length - 1 ?
        this.state.bg.push(<div className="bg-square" key={h + "odd"}></div>, <div className="bg-square" key={h + "even"}></div>)
        : null);
  }

  render() {
    return (
      <div className="background">
        {this.state.bg}
      </div>
    );
  }
}