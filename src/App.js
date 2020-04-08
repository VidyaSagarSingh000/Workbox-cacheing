import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    data:[]
  }

  componentDidMount(){
    fetch("https://api.exchangeratesapi.io/latest")
    .then(response => response.json())
    .then(result=>{
      console.log(result.rates)
      this.setState({data:result.rates});  
    })
  }
  render(){
    const result = Object.keys(this.state.data).map(key=>(
      [key,this.state.data[key]]
    ))
    console.log(result)
    return (
      <div className="App">
        <header>
          Currencies ($)
        </header>
        {result.map((currency,index)=>(
          <article key={index} className="article">
            <p>{currency[0]}</p>
            <p>{currency[1]}</p>
          </article>
        ))}
      </div>
    );
  }
 
}

export default App;
