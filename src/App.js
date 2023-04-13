import React , { useState } from "react";
import "./App.css";
import About from "./Copmponents/About";
import Navbar from "./Copmponents/Navbar";
import TextForm from "./Copmponents/textform";
import Alert from "./Copmponents/Alert";
import {
  BrowserRouter as Router,
Routes,
  Route,

} from "react-router-dom";


function App() {

  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null) ;
  const [togglebtnText,setTogglebtnText] = useState(true)
  const [data,setData] = useState({id:'',text:"",title:""})


  const showAlert =(message , type)=>{
     setAlert({
      msg: message,
      type: type
     })
     setTimeout(() => {
      setAlert(null)
     }, 5000);
  }

  const toggleMode =()=>{
    if(mode === 'light'){
      setMode ('dark');
      document.body.style.backgroundColor = 'grey'
      // document.body.style.colorScheme = 'dark';
      showAlert('Dark mode has been enabled', "success");
    }
    else{
      setMode ('light');
      document.body.style.backgroundColor = '#ffff'
      // document.body.style.colorScheme = 'light';

      showAlert('Light mode has been enabled', "success");

    }
  }

  return (
    <>
    <Router>
      <Navbar title="TextUtiles" mode={mode} toggleMode={toggleMode} />
      <Alert alert= {alert}/>
      <div className="container">
      <Routes>
          <Route exact path="/about"  element={<About setData={setData} setTogglebtnText={setTogglebtnText}/>}/>
          <Route exact path="/"  element={<TextForm data={data} togglebtnText={togglebtnText} setTogglebtnText={setTogglebtnText} showAlert={showAlert} heading="Enter the text to analyze" mode={mode}/>}/>
      </Routes>
          
      </div>
      </Router>
    </>
  );
}

export default App;
