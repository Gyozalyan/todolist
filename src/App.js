import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import ToDo from "./Components/toDo/ToDo";
import { Component } from "react";
// import WelcomeModal from "./Components/WelcomeModal/WelcomeModal";


class App extends Component {
  render() {
    return(
      // <WelcomeModal/>,
      <ToDo />
    )
    
  }
}

export default App;
