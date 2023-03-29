import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import ToDo from "./Components/toDo/ToDo";
import { Component } from "react";
import Counter from "./Counter/Counter";

class App extends Component {
  render() {
    return <Counter />;
  }
}

export default App;
