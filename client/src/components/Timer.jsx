import React from 'react';

const Timer = (props) => {
  return (
    <div className="timer">
      <h1>{props.time}</h1>
      {/* <button onClick={props.startGame}>Start!</button> */}
    </div>
  )
}

export default Timer;