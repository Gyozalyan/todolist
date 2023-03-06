import { Component } from 'react';

class Price extends Component{
 
    render(){
        console.log(this)
      return (<p>
 {this.props.price}
      </p>
       )
    }
}

export default Price