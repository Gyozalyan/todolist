import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Name from './Name'
import Price from './Price'
import Description from './Description'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <Product name="bananas" price="1$" description = "Fresh bananas from Ecuador" />
      </header>
    </div>
  );
}

class Product extends Component{

  render(){
    console.log(this.name)
    return(
      <div>
      
        <Name name ={this.props.name}/>
        <Price price ={this.props.price}/>
        <Description description ={this.props.description}/>
  
      </div>
    )
  }

}


export default App;
