import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./Login";

// import {getAllData} from './getAllData'

export default function About(props) {

  const [mystyle, setmystyle] = useState({
    color: "black",
    background: "white",
  });
  const [btntext, setBtntext] = useState("Enable Dark mode");


 const getAllData = async () => {
  const token = getCookie("Validtime");
  const getUsers = "http://localhost:3000/users";
  // console.log(props.token.token);
  try {
    const response = await fetch(getUsers, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const { data: { users } } = await response.json();
    console.log("users", users)
  
    // props.setItems(data);
    props.setFetchData(users)
    
  } catch (err) {
    console.log(err.message);
  }
}

  useEffect( () => {
    getAllData()

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
      setBtntext("Enable Light mode");
    } else {
      setmystyle({
        color: "white",
        background: "black",
      });
      setBtntext("Enable Dark mode");
    }
  };



  const deleteItem = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Crumb?"
    );
    if (confirmBox === true) {
      const updatedItems = props.items.filter((item) => {
        return item.id !== id;
      });
      localStorage.setItem("list", JSON.stringify(updatedItems));
      props.setItems(updatedItems);
    }
  };

  const removeAllItems = () => {
    const confirmBox = window.confirm(
      "Do you really want to delete this All Data?"
    );
    if (confirmBox === true) {
      localStorage.setItem("list", JSON.stringify([]));
      props.setItems([]);
    }
  };

  // update button to navigate to home page
  let navigate = useNavigate();
  const editItem = (id) => {
    const confirmBox = window.confirm("Do you really want to edit this Crumb?");
    if (confirmBox === true) {
      let path = `/dashboard`;
      navigate(path);
      props.setTogglebtnText(false);

      let newEditItem = props.items.find((item) => {
        return item.id === id;
      });
      console.log(newEditItem);
      props.setData(newEditItem);
    }
  };

  return (
    <div className="container" style={mystyle}>
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
        <button onClick={removeAllItems} className="btn btn-primary my-3 mx-3">
          Remove All
        </button>
      </div>
    </div>
  );
}
