import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18
import "./assets/scss/dashlite.scss";
import "./assets/scss/style-email.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Update to use Routes and Route
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const Error404Modern = lazy(() => import("./pages/error/404-modern"));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.Fragment>
    <Suspense fallback={<div>Loading...</div>}>
      <Router basename={`/`}>
        <Routes>
          <Route
            path="*"
            element={
              // This renders Error404Modern if location.state.is404 is true, otherwise App
              window.location.state && window.location.state.is404 ? <Error404Modern /> : <App />
            }
          />
        </Routes>
      </Router>
    </Suspense>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
