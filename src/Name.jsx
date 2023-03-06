import { Component } from 'react';

class Name extends Component{
 
    render(){
      return (<p>
 {this.props.name}
      </p>
       )
    }
}

export default Name