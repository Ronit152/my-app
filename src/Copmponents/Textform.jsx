import React, { useState, useEffect } from "react";
// import {getAllData} from './About'
import { getCookie } from "./Login";
import axios from "axios";
import Navbar from "./Navbar";
import Alert from "./Alert";

import { useNavigate } from "react-router-dom";

// const getLocalItems= () =>{
//   let list = localStorage.getItem('list');
//   if(list){
//     return JSON.parse(list)
//   }else{
//     return[]
//   }
// }

export default function TextForm(props) {
  const token = getCookie("Token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [response, setResponse] = useState({ id: "", text: "", title: "" });

  let navigate = useNavigate();

  const handleStore = () => {
    if (!response.title || !response.text) {
      return props.showAlert("You can't add empty data", "danger");
    } else if (props.data && !props.togglebtnText) {
      console.log(props.data);
      console.log(props.fetchData);

      props.fetchData.map((element) => {
        if (element.id === props.data.id) {
          handleUpdateuser(element.id);

          setResponse({ id: "", text: "", title: "" });
        }

        return element;
      });

      // handleStoreInServer(response)
    } else {

      handleStoreInServer(response);

      setResponse({ id:"" , text: "", title: "" });
      let path = `/dashboard`;
      navigate(path);
    }
  };

  const handleUpdateuser = async (id) => {
    axios
      .put(
        `https://server-kdmc.onrender.com/users/${id}`,
        { user: response },
        {
          headers: headers,
        }
      )
      .then(() => {
        props.setData({ id: "", title: "", text: "" });
        setResponse({ id: "", title: "", text: "" });
        let path = `/dashboard`;
        navigate(path);
        props.setTogglebtnText(true);
      });
  };

  // set the data for update
  useEffect(() => {
    setResponse(props.data);
  }, [props.data]);

  // setItems to localstorage
  // useEffect(()=>{
  //   localStorage.setItem("list", JSON.stringify(items))
  // },[items]);

  async function handleStoreInServer(items) {
    const token = getCookie("Token");
    const url = "https://server-kdmc.onrender.com/users";

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ user: items }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      });

      const data2 = await res.json();
      return data2;
    } catch (error) {
      console.log(error);
    }
  }

  //set id to data
  // useEffect(() => {
  //   setResponse((prevState) => ({
  //     ...prevState,
  //     id: new Date().getTime().toString(),
  //   }));
  //   console.log(response)
  //   // if(token === null){
  //   //   let path = `/`;
  //   //   navigate(path);
  //   }
  // }, [response.text]);

  // uppercasebutton
  const handleUpClick = () => {
    if (!response.text && !response.title) {
      props.showAlert("There is no Text", "danger");
    } else {
      let newText = response.text.toUpperCase();
      setResponse((prevState) => ({ ...prevState, text: newText }));
      props.showAlert("Text converted to Upper case", "success");
    }
  };

  // All clear button
  const handleCleartext = () => {
    if (!response.text && !response.title) {
      props.showAlert("There is no Text", "danger");
    } else {
      setResponse((prevState) => ({ ...prevState, title: "", text: "" }));
      props.showAlert("Text cleared ", "success");
    }
  };

  const handleTextOnChange = (event) => {
    setResponse((prevState) => ({ ...prevState, text: event.target.value }));
  };

  const handleTitleOnChange = (e) => {
    const id = new Date().getTime().toString();
    setResponse((prevState) => ({ ...prevState,id: id, title: e.target.value }));
  };

  return (
    <>
      <Navbar
        title="TextUtiles"
        togglebtnText = {props.togglebtnText}
        setTogglebtnText={props.setTogglebtnText}
        setResponse={setResponse}   
        response = {response}
        data={props.data}
        setData={props.setData}
      />
      <Alert alert={props.alert}/>
      <div className="container">
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            value={response.title}
            className="form-control"
            style={{
              backgroundColor: props.mode === "light" ? "lightgrey" : "white",
              color: "black",
            }}
            rows="1"
            placeholder="Title here"
            onChange={handleTitleOnChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <textarea
            value={response.text}
            className="form-control"
            id="mybox"
            style={{
              backgroundColor: props.mode === "light" ? "lightgrey" : "white",
              color: "black",
            }}
            rows="6"
            placeholder="Enter text here"
            onChange={handleTextOnChange}
          ></textarea>
        </div>

        <button className="btn btn-secondary mx-1" onClick={handleStore}>
          {props.togglebtnText ? "Save data" : "Update"}
        </button>
        <button className="btn btn-secondary mx-1" onClick={handleUpClick}>
          Convert to uppercase
        </button>
        <button className="btn btn-secondary mx-1" onClick={handleCleartext}>
          Clear Text
        </button>
      </div>
      <div className="container my-3">
        <h2> Your text summary</h2>
        <p>
          {response.text.split(" ").length} words and {response.text.length}
          characters
        </p>
      </div>
    </>
  );
}
