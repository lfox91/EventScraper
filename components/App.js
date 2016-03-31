import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import Bgroup from './ButtGroup';
import Events from './events';

class App extends React.Component {

  constructor(){
    super();
    this.state = {data : []};
  }

  getData(){
    var self = this;
    $.get('/data', function(data){
      self.setState({data: data});
    });
  }

  componentDidMount(){
    this.getData();
  }

  render(){
    return(
      <div id="container">
      <div id="bg">
        <img src="https://static.pexels.com/photos/2537/sign-los-angeles-typography-usa.jpg" alt="mailbu pier and fishing sign" />
      </div>
        <h1>
          It's happening
        </h1>
        <h2>
          ...right now
        </h2>
        <Bgroup/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('content'));
