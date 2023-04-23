import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import ToDo from "./Components/toDo/ToDo";
import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./Components/Nav/ContactUs";
import Layout from "./Components/Nav/Layout";
import About from "./Components/Nav/About";
import Tasks from "./Components/Nav/Tasks";

// import WelcomeModal from "./Components/WelcomeModal/WelcomeModal";


class App extends Component {
  render() {
    return(
      
      <Router>
     
     <Layout/>
      <Routes>
      
      <Route path="/" element={ <ToDo />}/>
          <Route path="/About" element={<About/>} />
          <Route path="/Tasks" element={<Tasks/>} />
          <Route path="/ContactUs" element={<ContactUs/>} />
         
       
      </Routes>
      {/* <ToDo /> */}
    </Router>

      // <WelcomeModal/>,
    
    )
    
  }
}

export default App;
