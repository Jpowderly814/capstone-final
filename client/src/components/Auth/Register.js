import './Login.css';
import { useState } from "react";
import Axios from "axios";
//import { Link, Route } from 'react-router-dom';
import ErrorModal from '../UI/ErrorModal';
import validator from 'validator';

const Register = (props) => {
  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [error, setError] = useState("");

  

  const register = (event) => {
    event.preventDefault();
    
    if(usernameReg.trim().length ===0 || passwordReg.trim().length ===0 || emailReg.trim().length ===0){
      setError({
        title: 'Invalid input',
        message: 'Please do not leave fields blank.'
      });
      return;
    }

    if (!validator.isEmail(emailReg)) {
      setError({
        title: 'Invalid input',
        message: 'Please use a valid email address.'
      });
      return;
    }
    
    Axios.post("http://localhost:3001/login/register", {
      username: usernameReg, password: passwordReg, email: emailReg
    }).then((response) => {
      console.log(response);
      
    });
    setEmailReg('');
    setUsernameReg('');  
    setPasswordReg('');  
  };

  const errorHandler = () => {
    setError(null);
  };

    return (
    
      <div className="login-register-container">
        {error && (<ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>)}
        <div className="text-center">
          <h2 className="login-register-header">Register</h2>
        </div>

      <form className="login-register-form">
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" >E-mail</label>
            <div className="col-sm-9">
              <input 
                className="form-control-login" 
                type="text" 
                value={emailReg}
                onChange={(e) =>{
                  setEmailReg(e.target.value);
                }}
              />
            </div>
        </div> 

        <div className="form-group row">
          <label className="col-sm-3 col-form-label" >Username</label>
            <div className="col-sm-9">
              <input 
                className="form-control-login" 
                type="text" 
                value={usernameReg}
                onChange={(e) =>{
                  setUsernameReg(e.target.value);
                }}
              />
            </div>
        </div> 

        <div className="form-group row">
          <label className="col-sm-3 col-form-label" >Password</label>
            <div className="col-sm-9">
              <input 
                className="form-control-login" 
                type="text" 
                value={passwordReg}
                onChange={(e) =>{
                  setPasswordReg(e.target.value);
                }}
              />
            </div>   
        </div> 
      
        <div> 
           
          <input type="submit" className="login-btn" value="register" onClick={register} />
          
          <button className="login-btn" onClick={props.onCancel}>cancel</button>
        </div>
      </form>

      </div>
    );

}

export default Register;