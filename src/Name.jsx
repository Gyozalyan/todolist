import { Component } from 'react';

class Name extends Component{
 
    render(){
        console.log(this)
      return (<p>
 {this.props.name}
      </p>
       )
    }
}

export default Name