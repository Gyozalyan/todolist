import ToDo from "./Pages/ToDo/ToDo";
import ContactUs from "./Pages/Contact/ContactUs";
import About from "./Pages/About/About";
import SingleTask from "./Pages/SingleTask/SingleTask";
import NotFound from "./Pages/NotFound/NotFound";

const routes = [
    { path: "/", element: <ToDo /> },
    { path: "/ToDo", element: <ToDo  /> },
    { path: "/About", element: <About/> },
    { path: "/ContactUs", element: <ContactUs /> },
    { path: "/task/:taskID", element: <SingleTask /> },
    { path: "*", element: <NotFound /> },
  ];

  export {routes}