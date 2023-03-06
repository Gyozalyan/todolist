import { Component } from 'react';

class Description extends Component{
 
    render(){
        console.log(this)
      return (<p>
 {this.props.description}
      </p>
       )
    }
}

export default Description