import React, { useState } from "react";
import "./App.css";
import About from "./Copmponents/About";
import Navbar from "./Copmponents/Navbar";
import TextForm from "./Copmponents/textform";
import Alert from "./Copmponents/Alert";
import Login from "./Copmponents/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);
  const [togglebtnText, setTogglebtnText] = useState(true);
  const [data, setData] = useState({ id: "", text: "", title: "" });
 
  // const [token, setToken] = useState("");
  const [fetchData, setFetchData] = useState([]);
  // const [items, setItems] = useState([]);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "grey";
      // document.body.style.colorScheme = 'dark';
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "#ffff";
      // document.body.style.colorScheme = 'light';

      showAlert("Light mode has been enabled", "success");

    }
  };

  return (
    <>
      <Router>

        <Navbar title="TextUtiles" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
        <Route exact path="/" element={<Login  />}/>
            <Route
           
              exact
              path="/dashboard"
              element={
                <About setFetchData={setFetchData} fetchData={fetchData}
                 setData={setData} setTogglebtnText={setTogglebtnText} data={data} />
              }
            />
            <Route
              exact
              path="/add"
              element={
                <TextForm
                  // itemsr={items}
                  // setItems={setItems}
                  setfetchData={setFetchData} fetchData={fetchData}
                  setData={setData} 
                  data={data}
                  togglebtnText={togglebtnText}
                  setTogglebtnText={setTogglebtnText}
                  showAlert={showAlert}
                  heading="Enter the text to analyze"
                  mode={mode}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
