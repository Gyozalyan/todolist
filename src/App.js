import './App.css';
import { Component } from 'react';
import Name from './Name'
import Price from './Price'
import Describtion from './Describtion'

class App extends Component {

  state={
 
    products:[
      {
        name: "banana",
        price: "5$",
        describtion: "Bananas from ecuador"
      },
      {
        name: "apple",
        price: "4$",
        describtion: "Fresh apples from Georgia",
      },
      {
        name: "pear",
        price: "8$",
        describtion: "Fresh pears from Goris",
      },

      {
        name: "melon",
        price: "9$",
        describtion: "Fresh pears from Gyumri",
      },
      {
        name: "watermelon",
        price: "18$",
        describtion: "Fresh pears from Lori",
      },
    ]
  }

  
  render(){

    const productsArray = this.state.products.map((product)=>{
     return <Product name = {product.name} price = {product.price} describtion = {product.describtion}/>
    })


    return (
      <div className="App">        
      {productsArray}

      
      </div>
    );
  }

}

class Product extends Component{

  

  render(){
    let {name, price, describtion} = this.props;
    return(
      <div>
      
        <Name name ={name}/> 
        <Price price ={price}/> 
        <Describtion describtion ={describtion}/>
        <hr/>
  
      </div>
    )
  }

}




export default App;
