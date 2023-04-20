import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./Login";
import axios from "axios"
import Navbar from "./Navbar";
import Alert from "./Alert";


export default function About(props) {
  
  const token = getCookie("Token");

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  
  const [mystyle, setmystyle] = useState({
    color: "black",
    background: "white",
  });
  const [btntext, setBtntext] = useState("Enable Dark mode");
  let navigate = useNavigate();
  
  const autoLogout = (token)=>{
    if (token === null){
      navigate('/')
    }
  }

 const getAllData = async () => {
  const getUsers = "http://localhost:3000/users";
  // console.log(props.token.token);
  try {
    // axios.get(getUsers, {headers:headers});
    //   .then((response) => {
    //   const { data: { users } } = response();
    //   console.log("users", users)
    //   props.setFetchData(users)
    //   ;
    // })

    const response = await fetch(getUsers, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const { data: { users } } = await response.json();
    console.log("users", users)
    props.setFetchData(users)
    
  } catch (err) {
    console.log(err.message);
  }
}

  useEffect( () => {
      getAllData()
      autoLogout(token)
  }, []);

  // Get All items from localstorages
  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem("list"));
  //   if (items) {
  //     setItems(items);
  //   }
  //   console.log(items)
  // }, []);


  const togglestyle = () => {
    if (mystyle.color === "white") {
      setmystyle({
        color: "black",
        background: "white",
      });
      setBtntext("Enable Dark mode");
    } else {
      setmystyle({
        color: "white",
        background: "black",
      });
      setBtntext("Enable Light mode");
    }
  };



  const deleteItem = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Crumb?"
    );
    if (confirmBox === true) {
      axios.delete(`http://localhost:3000/users/${id}`,{
        headers: headers
      })
      .then(() => {
        getAllData();
        autoLogout();
      })
    }

    // for local storage
      // localStorage.setItem("list", JSON.stringify(updatedItems));
      // props.setItems(updatedItems);
  }
 
/// only works for local storage for now

  // const removeAllItems = () => {
  //   const confirmBox = window.confirm(
  //     "Do you really want to delete this All Data?"
  //   );
  //   if (confirmBox === true) {
  //     localStorage.setItem("list", JSON.stringify([]));
  //     props.setItems([]);
  //   }
  // };


  // Update button to navigate to home page


  //Edit button Api
  const editItem = (id) => {
    const confirmBox = window.confirm("Do you really want to edit this Crumb?");
    if (confirmBox === true) {

      axios.get(`http://localhost:3000/users/${id}`,{
        headers: headers
      })
      .then((response) => {
        console.log(response.data)
        const data = response.data.data

        console.log({id: data.id, title: data.title, text: data.text})

        props.setData({id: data.id, title: data.title, text: data.text})

        let path = `/add`;
        navigate(path);
        props.setTogglebtnText(false);
      })

      // let newEditItem = props.items.find((item) => {
      //   return item.id === id;
      // });
      // console.log(newEditItem);
      // props.setData(newEditItem);
    }
  };

  return (
    <div className="container" style={mystyle}>
      <Navbar title="TextUtiles" mode={props.mode} toggleMode={props.toggleMode} />
      <Alert alert={props.alert} />
      <h2 className="my-2">Items</h2>
      <div className="accordion" id="accordionExample" style={mystyle}>
        {props.fetchData?.map((users) => {
          return (
            <div className="accordion-item " style={mystyle} key={users.id}>
              <h2 className="accordion-header">
                <div>
                  <button
                    className="accordion-button "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${users.id}`}
                    aria-expanded="true"
                    aria-controls={users.id}
                    style={mystyle}
                  >
                    <div className="d-flex justify-content-between w-100">
                      <h5> {users.title}</h5>
                      <div className="d-flex">
                        <button
                          onClick={() => deleteItem(users.id)}
                          className="btn btn-primary mx-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => editItem(users.id)}
                          className="btn btn-primary mx-2"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </button>
                </div>
              </h2>
              <div
                id={users.id}
                className="accordion-collapse collapse show}"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body" style={mystyle}>
                  {users.text}
                </div>
              </div>
            </div>
          );
        })}

        <button onClick={togglestyle} className="btn btn-primary my-3">
          {btntext}
        </button>
        {/* <button onClick={removeAllItems} className="btn btn-primary my-3 mx-3">
          Remove All
        </button> */}
      </div>
    </div>
  );
}
