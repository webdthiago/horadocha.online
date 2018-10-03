import React, { Component } from "react";
import moment from "moment";

import Typing from "react-typing-animation";

import "./App.css";

const diaDaSemana = moment().weekday(),
  nomeDoDia = [
    "este domingo",
    "esta segunda-feira",
    "esta terça-feira",
    "esta quarta-feira",
    "esta quinta-feira",
    "esta sexa-feira",
    "este sábado"
  ],
  colors = [
    "#8ca795",
    "#d8b993",
    "#bd6857",
    "#be8f85",
    "#bd4a55",
    "#5e8b65",
    "#be7f3c",
    "#402d1e"
  ];
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgColor: this._randomColor(),
      cha: moment()
    };
  }
  componentWillMount() {
    const { cha } = Object.assign({}, this.state);
    let intervalo = 5;

    cha.add(intervalo, "minutes");

    if (cha.hour() < 15) {
      cha.set("hour", 15);
    }
    if (!this._primo(cha.minute())) {
      cha.add(intervalo + 1, "minutes");
    }

    this.setState({ cha });
  }

  handleChangeColor(e) {
    e.preventDefault();
    this.setState({ bgColor: this._randomColor() });
  }

  _randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  _primo(num) {
    if (num !== 1) {
      for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
        return num !== 1;
      }
    }
  }
  render() {
    const { bgColor, cha } = this.state,
      frase =
        cha.hour() > 18
          ? "Ihhh rapaz, tá tarde para o chá :("
          : `Para ${nomeDoDia[diaDaSemana]}, o horário do chá é às
    ${cha.format("HH:mm")}`;
    return (
      <div className="root" style={{ backgroundColor: bgColor }}>
        <div className="App">
          <Typing hideCursor={true} speed={50}>
            <h1>{frase}</h1>
          </Typing>
          <p>
            <a href="" onClick={this.handleChangeColor.bind(this)}>
              não gostou da cor do chá?
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
