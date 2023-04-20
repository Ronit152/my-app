import React, { useState } from "react";
import "./App.css";
import About from "./Copmponents/About";
// import Navbar from "./Copmponents/Navbar";
// import Alert from "./Copmponents/Alert";
import TextForm from "./Copmponents/textform";
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
        {/* <Navbar title="TextUtiles" mode={mode} toggleMode={toggleMode} />
            <Alert alert={alert} /> */}
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route
              exact
              path="/dashboard"
              element={
                <About
                  alert={alert}
                  mode={mode}
                  toggleMode={toggleMode}
                  setFetchData={setFetchData}
                  fetchData={fetchData}
                  setData={setData}
                  setTogglebtnText={setTogglebtnText}
                  data={data}
                />
              }
            />
            <Route
              exact
              path="/add"
              element={
                <TextForm
                  // itemsr={items}
                  // setItems={setItems}
                  toggleMode={toggleMode}
                  alert={alert}
                  setfetchData={setFetchData}
                  fetchData={fetchData}
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

///  new method for hiding Navbar on login page .... in testing phase

// const mainContainer = () => {
//   <div>
//   <Navbar title="TextUtiles" mode={mode} toggleMode={toggleMode} />
//   <Alert alert={alert} />
//   <Router>
//   <div>
//   <Route

//             exact
//             path="/dashboard"
//             element={
//               <About setFetchData={setFetchData} fetchData={fetchData}
//               setData={setData} setTogglebtnText={setTogglebtnText} data={data} />
//             }
//           />
//           <Route
//             exact
//             path="/add"
//             element={
//               <TextForm
//                 // itemsr={items}
//                 // setItems={setItems}
//                 setfetchData={setFetchData} fetchData={fetchData}
//                 setData={setData}
//                 data={data}
//                 togglebtnText={togglebtnText}
//                 setTogglebtnText={setTogglebtnText}
//                 showAlert={showAlert}
//                 heading="Enter the text to analyze"
//                 mode={mode}
//               />
//             }
//           />
//   </div>
//   </Router>
//   </div>
// }

// return (
// <>

// <Router>

//         <div className="container">
//         <Routes>
//           <Route exact path="/" element={<Login  />}/>
//           <Route component={mainContainer}/>
//         </Routes>
//           </div>

//   </Router>
// </>
// );
// }

export default App;
