import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import SearchInput from './Search_input';
import Thanks from './ThankYou'
import Name from './Name'

function Header(){
  return(
    <div>
      <SearchInput />
    </div>
  
  )
}


function App() {

  return (
    <div className="App">
    
      <header className="App-header">
      <p>
          <Thanks />
        </p>
        <Header />
        <img src={logo} className="App-logo" alt="logo" />
      
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Name name = 'JavaScript' age ={23}/>
        </a>
      </header>
    </div>
  );
}

export default App;
