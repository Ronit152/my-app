import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function About(props) {
  const [mystyle, setmystyle] = useState({
    color: "black",
    background: "white",
  });

  const [btntext, setBtntext] = useState("Enable Dark mode");

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

  const [items, setItems] = useState([]);

  // Get All items from localstorage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("list"));
    if (items) {
      setItems(items);
    }
    console.log(items)
  }, []);

  const deleteItem = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Crumb?"
    )
    if(confirmBox === true){
    const updatedItems = items.filter((item) =>{
      return item.id !== id  
    }
    )
   localStorage.setItem("list", JSON.stringify(updatedItems));
    setItems(updatedItems);
  }
  }

  const removeAllItems = () => {
    const confirmBox = window.confirm(
      "Do you really want to delete this All Data?"
    )
    if(confirmBox === true){
    localStorage.setItem("list", JSON.stringify([]));
    setItems([]);
  }}

// update button to navigate to home page
  let navigate = useNavigate(); 
  const editItem = (id) =>{ 
    const confirmBox = window.confirm(
      "Do you really want to edit this Crumb?"
    )
    if(confirmBox === true){
    let path = `/`; 
    navigate(path);
    props.setTogglebtnText(false);

    let newEditItem = items.find((item) => {
      return item.id === id
    })
    console.log(newEditItem)
    props.setData(newEditItem)
  }
}


    

  return (
    <div className="container" style={mystyle}>
      <h2 className="my-2">Items</h2>
      <div className="accordion" id="accordionExample" style={mystyle}>
        {items.map((item, index) => {
          return (
            <div className="accordion-item " style={mystyle} key={item.id}>
              <h2 className="accordion-header" >
                <div>
                <button
                  className="accordion-button "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${item.id}`}
                  aria-expanded="true"
                  aria-controls={item.id}
                  style={mystyle}
                >
                  <div className="d-flex justify-content-between w-100">
                  <h5> {item.title}</h5>
                  <div className="d-flex">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="btn btn-primary mx-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => editItem(item.id)}
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
                id={item.id}
                className="accordion-collapse collapse show}"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body" style={mystyle}>
                  {item.text}
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
