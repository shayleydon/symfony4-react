import React from 'react';


const TextArea = (props) => (  
  <div className="form-group">
    <label className="form-label">{props.title}</label>
    <textarea
      className={"form-control " + (props.error?'is-invalid':'')}
      name={props.name}
      rows={props.rows}
      maxLength={props.maxLength}
      cols = {props.cols}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder} />
      <div className="invalid-feedback">{props.error}</div>
  </div>
);

export default TextArea;