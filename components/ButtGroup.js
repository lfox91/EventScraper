import React from 'react';



export default class ButtGroup extends React.Component{
  render(){
    return(
    <div>
        <div id='one' className="square">
          <div className="content">
            21+
          </div>
        </div>
        <div id='two' className="square">
          <div className="content">
            a&c
          </div>
        </div>
        <div id='three' className="square">
          <div className="content">
            Family
          </div>
        </div>
      </div>

    );
  }
}
