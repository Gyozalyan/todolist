import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ToDo from "./Pages/ToDo/ToDo";
import ContactUs from "./Pages/Contact/ContactUs";
import About from "./Pages/SingleTask/SingleTask";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button } from "react-bootstrap";
import NavBarMenu from "./Components/Nav/Nav";
import SingleTask from "./Pages/SingleTask/SingleTask";
import NotFound from "./Pages/NotFound/NotFound";

const App = () => {
  const [showWelcomePage, setShowWelcomePage] = useState(false);
  const [name, setName] = useState(localStorage.getItem("name") || "");

  useEffect(() => {
    const hasShownWelcomePage = localStorage.getItem("hasShownWelcomePage");
    if (!hasShownWelcomePage) {
      setShowWelcomePage(true);
      localStorage.setItem("hasShownWelcomePage", true);
    }
    // eslint-disable-next-line
  }, []);

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (name) {
      setShowWelcomePage(false);
      localStorage.setItem("name", name);
    }
  };

  const handleEventEnter = (event) => {
    if (event.key === "Enter") {
      handleButtonClick(event);
    }
  };

  const pages = [
    { path: "/", element: <ToDo userName={name} /> },
    { path: "/ToDo", element: <ToDo userName={name} /> },
    { path: "/About", element: <About /> },
    { path: "/ContactUs", element: <ContactUs /> },
    { path: "/task/:taskID", element: <SingleTask /> },
    { path: "*", element: <NotFound /> },
  ];

  return (
    <div>
      {showWelcomePage ? (
        <div className="welcomeModal">
          <Form className="welcomeForm">
            <h1>Hello!</h1>

            <div className="welcomeContent">
              <Form.Label>
                <h4>Your Name:</h4>

                <Form.Control
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onKeyDown={handleEventEnter}
                />
              </Form.Label>
              <Button
                className="submit"
                variant="outline-success"
                onClick={handleButtonClick}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <Router>
          <main>
            <NavBarMenu />
            <Routes>
              {pages.map((page) => (
                <Route
                  key={page.path}
                  path={page.path}
                  element={page.element}
                />
              ))}
            </Routes>
          </main>
        </Router>
      )}
    </div>
  );
};

export default App;
