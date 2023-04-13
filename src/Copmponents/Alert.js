import React from 'react'

function Alert(props) {
    // const capitalize = (word)=>{
    //     const lower = word.toLowerCase();
    //     return lower.charAT(0).toUpperCase()+ lower.slice(1);
    // }
  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    <strong>{props.alert.type } : { props.alert.msg}</strong>
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  )
}

export default Alert