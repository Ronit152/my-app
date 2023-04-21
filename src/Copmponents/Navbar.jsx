import React , {useState} from "react";
import { NavLink } from "react-router-dom";

export default function Navbar(props) {

  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "lightgrey";

      // showAlert("Dark mode has been enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "#ffff";

      // showAlert("Light mode has been enabled", "success");
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {props.title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              <NavLink  to="/dashboard"  >
                {({ isActive }) => (
                  <span
                    className={isActive ? "nav-link text-decoration-none active" : "nav-link text-decoration-none"}
                  >
                    Dashboard
                  </span>
                )}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                
                aria-current="page"
                to="/add"
                
              >
                {({ isActive }) => (
                  <span
                    className={props.togglebtnText === true ? isActive ? "nav-link active" : "nav-link" : "invisible"  }
                  >
                  Add new
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
          {/* <form className="d-flex" role="search">
              <input
                classNameName="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          <div
            className={`form-check form-switch text-${
              mode === "light" ? "dark" : "light"
            }`}
          >
            <input
              className="form-check-input"
              onClick={toggleMode}
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            {/* <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Enable dark mode
            </label> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
