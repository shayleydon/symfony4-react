import React from 'react';


const Select = (props) => {
	return(<div className="form-group">
			<label for={props.name}> {props.title} </label>
		    <select
		      id = {props.name}
		      name={props.name}
		      value={props.value}
		      onChange={props.handleChange}
					className={"form-control " + (props.error?'is-invalid':'')}>
		      <option value="" disabled>{props.placeholder}</option>
		      {props.options.map(option => {
		        return (
		          <option
		            key={option.value}
		            value={option.value}
		            label={option.name}>{option.name}</option>
		        );
		      })}
		    </select>
				<div className="invalid-feedback">{props.error}</div>
  </div>)
}

export default Select;