import React , {useState} from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Navbar(props) {
  let navigate = useNavigate();

  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    props.togglestyle();
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "lightgrey";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "#ffff";
    }
  };

  const handleLogout = () => {
    document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  const handleAdd = () => {
    // console.log(props.data)
    if(props.data === null || props.data === undefined){
      navigate('/add')
      
    }else{
      // props.setResponse({ id: "", text: "", title: "" });
      props.setData({ id: "", text: "", title: "" });
      props.setTogglebtnText(true)
  }}

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/" onClick={handleLogout}>
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
                    className={isActive ? "nav-link  active" : "nav-link "}
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
                onClick={handleAdd}  
              >
                {({ isActive }) => (
                  <span
                    className={ isActive ? "nav-link active" : "nav-link"  }
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
