import React from 'react';

class Events extends React.Component{

  render(){
    var divArr = [];

    this.props.info.forEach((elem) => {
      if(elem.eventDate.match(/January/)){
        divArr.push(
          <div>
            <h1>{elem.eventName}</h1>
            <p>{elem.eventDescription}</p>
          </div>
        );
      }
    });
    return(
      <div>
        {divArr}
      </div>
    );
  }
}

module.exports = Events;
