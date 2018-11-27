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
    "esta sexta-feira",
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
  ],
  _randomColor = () => colors[Math.floor(Math.random() * colors.length)];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgColor: _randomColor(),
      cha: this._horaDoCha(moment())
    };
  }
  _horaDoCha(cha) {
    const toCalc =
      parseInt(cha.format("DM"), 10) /
      (Math.PI * parseInt(cha.format("M"), 10));

    cha.add(toCalc, "minutes");

    if (cha.hour() < 15) {
      cha.set("hour", 15);
    }

    return cha;
  }

  handleChangeColor(e) {
    e.preventDefault();
    this.setState({ bgColor: _randomColor() });
  }

  render() {
    const { bgColor, cha } = this.state,
      frase =
        cha.hour() > 18
          ? "Ihhh rapaz, está meio tarde para o chá :("
          : `Para ${nomeDoDia[diaDaSemana]}, o horário do chá é às
    ${cha.format("HH:mm")}`;
    return (
      <div className="root" style={{ backgroundColor: bgColor }}>
        <div class="git-flag">
          <a
            href="https://github.com/webdthiago/horadocha.online"
            title="GitHub"
          >
            <svg viewBox="0 0 512 512">
              <path d="M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389.4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6.2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z" />
            </svg>
          </a>
        </div>
        <div className="App">
          <Typing hideCursor={true} speed={50}>
            <h1>{frase}</h1>
          </Typing>
          <p>
            <button onClick={this.handleChangeColor.bind(this)}>
              não gostou da cor do chá?
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
