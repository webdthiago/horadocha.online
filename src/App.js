import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.scss";

const App = () => {
  const definitions = { day: 2, hour: 16, minute: 30 },
    [weekday, setWeekday] = useState(false),
    [part1, setPart1] = useState(""),
    [part2, setPart2] = useState("para faltar zero."),
    [left, setLeft] = useState(""),
    [sec, setSec] = useState(0);

  useEffect(() => {
    const _weekday = moment().weekday() === definitions.day,
      _part1 = _weekday
        ? `Hoje tem a hora do chá.`
        : `Que pena, hoje não tem chá.`;

    setWeekday(_weekday);
    setPart1(_part1);

    if (_weekday) {
      const timeTea = moment()
          .hour(definitions.hour)
          .minute(definitions.minute)
          .second("00"),
        _left = timeTea.diff(moment(), "minutes");
      if (_left >= 0) {
        setLeft(_left);
        setInterval(() => {
          const _sec = (moment().format("ss") - 60) * -1;
          setSec(_sec === 60 ? 0 : _sec);
        }, 1000);
      } else if (_left <= -30) {
        setWeekday(false);
        setPart1(
          `Eeeeeeeita, você perdeu a hora do chá? Pede desculpa lá no Slack vai.`
        );
      } else {
        setLeft("zero");
        setPart2(`para atrasar ${_left * -1}`);
      }
    }
  }, [weekday, part1, part2, left, sec, definitions]);

  return (
    <p>
      {part1}{" "}
      {weekday && (
        <React.Fragment>
          <br />
          Falta {left} {parseInt(left, 10) >= 0 && <span>{sec}</span>} {part2}
        </React.Fragment>
      )}
    </p>
  );
};

export default App;
