import React from 'react';


const Input = (props) => {
	return (  
  <div className="form-group">
    <label for={props.name} className="form-label">{props.title}</label>
    <input
      className={"form-control " + (props.error?'is-invalid':'')}
      id={props.name}
      name={props.name}
      type={props.inputType}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} 
      {...props} />
      <div className="invalid-feedback">{props.error}</div>
  </div>
)
}

export default Input;