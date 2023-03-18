import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ToDo from "./Components/toDo/ToDo";
import { Component } from "react";

class App extends Component {
  render() {
    return <ToDo />;
  }
}

export default App;
