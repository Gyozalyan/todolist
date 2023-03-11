import { Component } from 'react'

class Price extends Component {
  
  constructor(props) {
    super(props)
    const { price } = props
    this.state = {
      price: price,
      exchangeRate: 391,
    }
  }

  changeCurrency = () => {
    let { price, exchangeRate } = this.state

    if (price.includes('$')) {
      this.setState({
        price: parseInt(price) * exchangeRate + '֏',
      })
    } else {
      this.setState({
        price: parseInt(price) / exchangeRate + '$',
      })
    }
  }

  render() {
    return (
      <div>
        Price: {this.state.price}
        <button onClick={this.changeCurrency}> Change the currency</button>
      </div>
    )
  }
}

export default Price
