import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ToDo from "./Components/toDo/ToDo";
import { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./Components/Nav/ContactUs";
import Layout from "./Components/Nav/Layout";
import About from "./Components/Nav/About";
import Form from "react-bootstrap/Form";
import { Button, InputGroup } from "react-bootstrap";

import WelcomeModal from "./Components/WelcomeModal/WelcomeModal";

const App = () => {
  const [showWelcomePage, setShowWelcomePage] = useState(false);
  const [name, setName] = useState(localStorage.getItem("name") || "");

  useEffect(() => {
    const hasShownWelcomePage = localStorage.getItem("hasShownWelcomePage");
    if (!hasShownWelcomePage) {
      setShowWelcomePage(true);
      localStorage.setItem("hasShownWelcomePage", true);
    }
  }, []);

  const handleButtonClick = (event) => {
    event.preventDefault()
    setShowWelcomePage(false);
    localStorage.setItem("name", name);
  };

  const handleEventEnter = () =>{
    handleButtonClick()
  }

  return (
    <div>
      {showWelcomePage ? (
        <div className="welcomeModal">
          <Form>
            <h1>Hello!</h1>

            <div className="welcomeContent">
              <Form.Label>
                <h4>Your Name:</h4>

                <Form.Control
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Label>
              <Button
                className="submit"
                variant="outline-success"
                onClick={handleButtonClick}
                onKeyDown={handleEventEnter}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <Router>
          <Layout />
          <Routes>
            <Route path="/WelcomeModal" element={<WelcomeModal />} />
            <Route path="/" element={<ToDo userName={name} />} />
            <Route path="/About" element={<About />} />
            <Route path="/ContactUs" element={<ContactUs />} />
          </Routes>
          {/* <ToDo /> */}
        </Router>
      )}
    </div>
  );
};

export default App;
