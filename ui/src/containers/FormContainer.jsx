import React, {Component} from 'react';  

/* Import Components */
import CheckBox from '../components/CheckBox';  
import Input from '../components/Input';  
import TextArea from '../components/TextArea';  
import Select from '../components/Select';
import Button from '../components/Button'

class FormContainer extends Component {  
  constructor(props) {
    super(props);

    let country_codes = [];
    for(let p in props.country_codes){
      country_codes.push({value: p, name: props.country_codes[p]});
    }

    this.state = {
      newSMS: {
        number: '',
        country_code: '61',
        message: ''
      },
      CountryCodeOptions: country_codes,
      success: false,
      error: false,
      validation: {
        errors: {
          'number': '',
          'country_code': '',
          'message': '',
        },
      }
    }
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.validate = this.validate.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  validate(name, value){
    let isValid = false;

    switch (name) {
      case "number": {
        if(value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)){
          this.setState({ 
            validation: {errors: Object.assign(this.state.validation.errors, {number: null})},
          })
          isValid = true;
        }else{
          this.setState({ 
            validation: {errors: Object.assign(this.state.validation.errors, {number: "Please enter a valid mobile number"})},
          })
        }
        break;
      }
      case "country_code": {
        if(value.match(/^(\+?\d{1,3}|\d{1,4})$/)){
          this.setState({ 
            validation: {errors: Object.assign(this.state.validation.errors, {country_code: null})},
          })
          isValid = true;
       }else{
         this.setState({ 
           validation: {errors: Object.assign(this.state.validation.errors, {country_code: "Please select a valid country code"})},           
         })
        }
        break;
      }
      case "message": {
        if(value.match(new RegExp("^.{1," + this.props.message_max_length + "}$"))){
          this.setState({ 
            validation: {errors: Object.assign(this.state.validation.errors, {message: null})},
          })
          isValid = true;
        }else{
            this.setState({ 
              validation: {errors: Object.assign(this.state.validation.errors, {message: "SMS message must be between 1 and " + this.props.message_max_length + " characters in length."})},
            })
         }
        break;
      }
    
      default:
        break;
    }

    return isValid;
  }
  
  handleNumber(e) {
    let value = e.target.value;

    this.validate(e.target.name, e.target.value);

    this.setState( prevState => ({ newSMS : 
        {...prevState.newSMS, number: value
        }
      }), () => {/*console.log(this.state.newSMS)*/})
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;

    this.validate(e.target.name, e.target.value);

    this.setState( prevState => ({ newSMS : 
        {...prevState.newSMS, [name]: value
        }
      }), () => {/*console.log(this.state.newSMS)*/})
  }

  handleTextArea(e) {
    let { value, maxLength } = event.target;
    
    this.validate(e.target.name, e.target.value);

    this.setState(prevState => ({ newSMS: {
        ...prevState.newSMS, message: value.slice(0, maxLength)
      }
      }), ()=>{/*console.log(this.state.newSMS)*/})
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let smsData = this.state.newSMS, formIsValid = true;

    for(let p in this.state.validation.errors){
      formIsValid = this.validate(p, smsData[p]) ? formIsValid : false;
    }

    if(formIsValid){
      const data = new FormData();

      for (const prop in smsData) {
          data.append(prop, smsData[prop]);
      }
  
      fetch(window.location.origin + '/sms',{
          method: "POST",
          body: JSON.stringify(smsData),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        .then(this.handleErrors)
        .then(response => {
          response.json().then(data =>{
            this.setState({ 
              success: (data['message'] === 'OK' ? data['message'] : false),
              error: (data['message'] === 'OK' ? false : data['message']),
            })
  
            if(data['message'] === 'OK'){
              this.setState({ 
                newSMS: {
                  number: '',
                  country_code: this.state.newSMS.country_code,
                  message: ''
                },
              })
            }
  
          })
      }).catch(error => {/*console.log(error)*/} );
    }

  }   

handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

  handleClearForm(e) {
  
      e.preventDefault();
      this.setState({ 
        newSMS: {
          number: '',
          country_code: this.state.newSMS.country_code,
          message: ''
        },
        success: false,
        error: false,
      })
  }

  render() {
    return (

  <div>

      <div 
        className={"alert alert-success " + (this.state.success?'fadeIn':'fadeOut d-none')} 
        role="alert">
          Message Sent. ({this.state.success})
      </div>

      <div 
        className={"alert alert-danger " + (this.state.error?'fadeIn':'fadeOut d-none')} 
        role="alert">
          Message Not Sent. ({this.state.error})
      </div>


      <form onSubmit={this.handleFormSubmit}>

          <Select title={'Country Code'}
              name={'country_code'}
              options = {this.state.CountryCodeOptions} 
              value = {this.state.newSMS.country_code}
              error={this.state.validation.errors["country_code"]} 
              placeholder = {'Select Country Code'}
              handleChange = {this.handleInput} /> 

          <Input inputType={'number'} 
                  name={'number'}
                  title= {'Number'} 
                  value={this.state.newSMS.number} 
                  error={this.state.validation.errors["number"]} 
                  placeholder = {'Enter your number'}
                  handleChange={this.handleNumber} />


          <TextArea
            title={'Message'}
            rows={3}
            maxLength={this.props.message_max_length} 
            name={'message'}
            value={this.state.newSMS.message}
            error={this.state.validation.errors["message"]} 
            handleChange={this.handleTextArea}
            placeholder={'3 SMS / ' + this.props.message_max_length + ' characters allowed'} />

          <Button 
            action = {this.handleFormSubmit}
            type = {'primary'} 
            title = {'Submit'} 
            style={buttonStyle}
            /> { /*Submit */ }
          
          <Button 
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
            /> {/* Clear the form */}
          
      </form>
</div> 
  
    );
  }
}

const buttonStyle = {
  //margin-right : '5px'
}

export default FormContainer;