import React, { Component } from 'react';
import highRevLogo from './high_rev_logo.png';
import icnEmail from './icn_email.png';
import icnPW from './icn_password.png';

const Logo = props => (
  <div className="logo-div">
    <img src={props.img} />
  </div>
);

const WelcomeHeading = props => (
    <div className="welcome-header">
      <div className="welcome-color-text">Welcome. You!</div>
      <div className="welcome-black-text">Feed me with some details.</div>
    </div>
);

const Button = props => (
  <button disabled={props.disabled} className="high-rev-button" onClick={props.action} type="submit" form={props.form}>
    {props.label}
  </button>
);

const Icon = props =>(
  <img className="form-icon" src={props.icon}/>
);

const FormInput = props =>(
  <div className="form-input-container">
    <Icon icon={props.icon} />
    <input className="form-input" type={props.type} name={props.inputName} value={props.value} onChange={props.handleChange} placeholder={props.placeholder}/>
  </div>
)

//Validation function to check that required inputs have values
function validate(firstName, lastName, email){
  return{
    firstName: firstName.length === 0,
    lastName: lastName.length===0,
    email: email.length===0,
  };
}
//Regex check for valid email
function validEmail(email){
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
}


//Login Form
class HighRevLogin extends React.Component {
  constructor(props){
    super(props);
    this.state={
      newAccount:{
        firstName:'',
        lastName:'',
        email:'',
        phoneNumber:'',
      }
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
  }

  handleFormSubmit(e){
    e.preventDefault();
    let newAccount = this.state.newAccount;
    if(validEmail(newAccount['email'])){
      alert('Form Submitted')
      console.log(newAccount)
    }
    else{
      alert('Please Enter a Valid Email')
    }
  }

  handleEmail(e){
    let value = e.target.value;
    this.setState(prevState => ({newAccount:
      {...prevState.newAccount, email:value}
      }))
  }
  handleFirstName(e){
     let value = e.target.value;
    this.setState(prevState => ({newAccount:
      {...prevState.newAccount, firstName:value}
      }))
  }

    handleLastName(e){
     let value = e.target.value;
    this.setState(prevState => ({newAccount:
      {...prevState.newAccount, lastName:value}
      }))
  }

      handlePhone(e){
     let value = e.target.value;
    this.setState(prevState => ({newAccount:
      {...prevState.newAccount, phoneNumber:value}
      }))
  }

  render() {
    const valid = validate(this.state.newAccount.firstName, this.state.newAccount.lastName, this.state.newAccount.email) //checks if Email and names are filled
    const disabled = Object.keys(valid).some(x => valid[x]); //Disables Button if Valid is false
    return(
      <form className="login-form" onSubmit={this.handleFormSubmit}>
      <FormInput icon={icnPW} type='text' inputName='firstName' value={this.state.newAccount.firstName} handleChange={this.handleFirstName} placeholder='First Name' />
        <FormInput icon={icnPW} type='text' inputName='lastName'  value={this.state.newAccount.lastName} handleChange={this.handleLastName} placeholder='Last Name' />
        <FormInput autoFocus icon={icnEmail} type='email' inputName='Email' value={this.state.newAccount.email} handleChange={this.handleEmail} placeholder='email.address@email.com' />
        <FormInput icon={icnPW} type='text' inputName='phone' value={this.state.newAccount.phoneNumber} handleChange={this.handlePhone} placeholder='Phone Number' />
        <Button disabled={disabled} label="Create Account" action={this.handleFormSubmit} form="login-form"/>
      </form>
      )
  }

} 

class HighRevLoginWidget extends Component {
  render() {
    return (
      <div className="background-container">
        <div className="foreground-container">

        <Logo img={highRevLogo} />
        <WelcomeHeading />
          <HighRevLogin />
      </div>
      </div>
    );
  }
}

export default HighRevLoginWidget;
