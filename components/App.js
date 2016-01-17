/* jshint esnext:true */

import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import Events from './events';

class App extends React.Component {

  constructor(){
    super();
    this.state = {data : []};
  }

  getData(){
    var self = this;
    $.get('http://localhost:3000/data', function(data){
      self.setState({data: data});
    });
  }

  componentDidMount(){
    this.getData();
  }

  render(){
    return(
      <div>
      App
        <Events info={this.state.data}/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('contents'));
