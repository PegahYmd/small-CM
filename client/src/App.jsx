import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import { React, useState, useEffect } from "react";
import { Container, Toast } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { NotFoundLayout, LoginLayout} from "./components/PageLayout";
import MessageContext from "./messageCtx";
import API from "./API";
import PageManagement from "./components/PageManagement.jsx";
import DetailPage from "./components/DetailPage";
import AllPages from "./components/AllPages.jsx";

function App() {
  const [message, setMessage] = useState("");
  // const [dirty, setDirty] = useState(true);

  // This state keeps track if the user is currently logged-in.
  const [loggedIn, setLoggedIn] = useState(false);

  // This state contains the user's info.
  const [user, setUser] = useState(null);

  // This state is used for displaying a LoadingLayout while we are waiting an answer from the server.
  const [loading, setLoading] = useState(false);

  // This state contains the list of pages (it is initialized from a predefined array).
  const [pages, setPages] = useState([]);


  // If an error occurs, the error message will be shown in a toast.
  const handleErrors = (err) => {
    let msg = "";
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const user = await API.getUserInfo(); // here you have the user info, if already logged in
        setUser(user);
        setLoggedIn(true);
        setLoading(false);
      } catch (err) {
        handleErrors(err); // mostly unauthenticated user, thus set not logged in
        setUser(null);
        setLoggedIn(false);
        setLoading(false);
      }
    };
    init();
  }, []);

  /**
   * This function handles the login process.
   * It requires a username and a password inside a "credentials" object.
   */
  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      // console.log("user", user);
      setUser(user);
      setLoggedIn(true);
    } catch (err) {
      // error is handled and visualized in the login form, do not manage error, throw it
      throw err;
    }
  };

  /**
   * This function handles the logout process.
   */
  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setUser(null);
    setPages([]);
  };

  /**
   * Defining a structure for Filters
   * Each filter is identified by a unique name and is composed by the following fields:
   * - A label to be shown in the GUI
   * - An URL of the corresponding route (it MUST match /filter/<filter-key>)
   * - A filter function applied before passing the pages to the pageTable component
   */

  return (
    <BrowserRouter>
      <MessageContext.Provider value={{ handleErrors }}>
        <Container fluid className="App">
          <Navigation logout={handleLogout} user={user} loggedIn={loggedIn} />
          <Routes>
            <Route path="/" element={<AllPages user={user} />} />
            <Route path="form/:pageId?" element={<PageManagement />} />
            <Route path="page/details/:pageId" element={<DetailPage />} />
            <Route path="/login"
              element={
                !loggedIn ? (
                  <LoginLayout login={handleLogin} />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
            {/* The code sets up a route that matches any URL path ("*").
             This is typically used as a fallback route to handle paths that do not match any of the defined routes. */}
            <Route path="*" element={<NotFoundLayout />} />
          </Routes>

          <Toast
            show={message !== ""}
            onClose={() => setMessage("")}
            delay={4000}
            autohide
            bg="danger"
          >
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </Container>
      </MessageContext.Provider>
    </BrowserRouter>
  );
}

export default App;
