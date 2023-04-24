import React, { useState } from "react";
import Dashboard from "./Copmponents/Dashboard";
// import Navbar from "./Copmponents/Navbar";
// import Alert from "./Copmponents/Alert";
import TextForm from "./Copmponents/Textform";
import Login from "./Copmponents/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const [alert, setAlert] = useState(null);
  const [togglebtnText, setTogglebtnText] = useState(true);
  const [data, setData] = useState({ id: "", text: "", title: "" });

  const [fetchData, setFetchData] = useState([]);


  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };


  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/dashboard"
          element={
            <Dashboard
              alert={alert}
              setFetchData={setFetchData}
              fetchData={fetchData}
              setData={setData}
              setTogglebtnText={setTogglebtnText}
              togglebtnText = {togglebtnText}
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

              alert={alert}
              setfetchData={setFetchData}
              fetchData={fetchData}
              setData={setData}
              data={data}
              togglebtnText={togglebtnText}
              setTogglebtnText={setTogglebtnText}
              showAlert={showAlert}
              heading="Enter the text to analyze"

            />
          }
        />
      </Routes>
    </Router>
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
