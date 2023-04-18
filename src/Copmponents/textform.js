import React, {useState, useEffect} from "react";
// import {getAllData} from './getAllData'
import { getCookie } from "./Login";

// import { useNavigate } from "react-router-dom";

// const getLocalItems= () =>{
//   let list = localStorage.getItem('list');
//   if(list){
//     return JSON.parse(list)
//   }else{
//     return[]
//   }
// }



export default function TextForm(props) {

  const [response,setResponse] = useState({id:"" ,text:"",title:""})
  // const [info,setInfo] = useState({id:"" ,text:"",title:""})
  const [items,setItems] = useState(props.fetchData); 

  // let navigate = useNavigate();
  const handleStoreInLocal=()=>{

    if(!response.title || !response.text) 
    {
      return props.showAlert("You can't add empty data", "danger");
    }
    else if (props.data && !props.togglebtnText){
      // setItems([...items,response])
      setItems(
        items.map((element)=>{
          if(element.id === props.data.id){
            return {...response, text:response.text, title:response.title}
          }
          return element
        })
      )
      props.setTogglebtnText(true);
      setResponse({id:'',text:"",title:""});
      // setData(props.items)
      
    }else{

    console.log(response)

    setData(response)

    setResponse({id:'',text:"",title:""});
      // let path = `/dashboard`; 
      // navigate(path);
    }
  }

  // for updating the data
  useEffect(()=>{
    setResponse(props.data)
  },[props.data])

  // setItems to localstorage
  // useEffect(()=>{ 
  //   localStorage.setItem("list", JSON.stringify(items))
  // },[items]);


    async function setData(items) {
      
      const token = getCookie("Validtime");


      console.log(props.token.token)
      const url = "http://localhost:3000/users"
      console.log(items)
      
      try {
          const res = await fetch(url, {
              method: 'POST',
              body:JSON.stringify({user:items}) ,
              headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                  'authorization': `Bearer ${token}`,
              }
          })
          
          const data2 = await res.json();
         
          return data2;
          
      } catch (error) { console.log(error); }
   
    }
    

  //set id to data
  useEffect(()=>{ 
    setResponse((prevState) => (
      {...prevState,  id:new Date().getTime().toString()}
    ));
  },[response.text]);

  // uppercasebutton
  const handleUpClick= ()=>{
    if(!response.text && !response.title){
      props.showAlert('There is no Text', "danger");
    }else{
        let newText =  response.text.toUpperCase();
        setResponse((prevState) => (
          {...prevState,  text:newText}
        ));
        props.showAlert('Text converted to Upper case', "success");
    }
  }

    // All clear button
    const handleCleartext= ()=>{
      if(!response.text && !response.title){
        props.showAlert('There is no Text', "danger");
      }else{  
        setResponse((prevState) => (
          {...prevState, title:"", text:""}
        ));
        props.showAlert('Text cleared ', 'success');
        }
    }

    const handleTextOnChange= (event)=>{
        setResponse((prevState) => (
          {...prevState, text:event.target.value}
        ));
    }

    const handleTitleOnChange= (e)=>{
        setResponse((prevState) => (
          {...prevState, title:e.target.value}
        ));
    }
    

  return (
    <>
   
    <div className="container">
        <h1>{props.heading}</h1>
        <div className="mb-3">
        <textarea
          value={response.title}
          className="form-control" 
          style={{backgroundColor: props.mode === "light" ? "white" : "grey", color: props.mode === "light" ? "black" : "white"}}
          rows="1" placeholder="Title here" onChange={handleTitleOnChange}></textarea>
      </div>

      <div className="mb-3">
        <textarea
          value={response.text}
          className="form-control"
          id="mybox"
          style={{backgroundColor: props.mode === "light" ? "white" : "grey", color: props.mode === "light" ? "black" : "white"}}
          rows="6" placeholder="Enter text here" onChange={handleTextOnChange}></textarea>
      </div>

      
      <button className="btn btn-primary mx-1" onClick={handleStoreInLocal}>{props.togglebtnText ? 'Save data' : 'Update'} </button>  
      <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to uppercase </button>  
      <button className="btn btn-primary mx-1" onClick={handleCleartext}>Clear Text </button>  

    </div>
    <div className="container my-3">
        <h2> Your text summary</h2>
        <p> {response.text.split(" ").length} words and {response.text.length} characters</p>
    </div>
    </> 
  );
}
