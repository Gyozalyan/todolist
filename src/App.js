import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import NavBarMenu from "./Components/Nav/Nav";
import Loader from "./Components/Loader/Loader";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { routes } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import {getUserName} from "./redux/userName"

const App = () => {
  const [showWelcomePage, setShowWelcomePage] = useState(false);
  const dispatch = useDispatch()
  const name = useSelector(state=> state.userName.name)

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

  const isLoaderActive = useSelector((state) => state.loader.isLoading);

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
                  onChange={(event) => dispatch(getUserName(event.target.value))}
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
            {isLoaderActive && <Loader />}
            <Routes>
              {routes.map((page) => (
                <Route
                  key={page.path}
                  path={page.path}
                  element={page.element}
                />
              ))}
            </Routes>
            <ToastContainer
              position="bottom-left"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </main>
        </Router>
      )}
    </div>
  );
};

export default App;
