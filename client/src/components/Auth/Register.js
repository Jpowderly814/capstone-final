import './Login.css';
import { useState } from "react";
import Axios from "axios";
//import { Link, Route } from 'react-router-dom';


const Register = (props) => {

  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/login/register", {
      username: usernameReg, password: passwordReg, email: emailReg
    }).then((response) => {
      console.log(response);
    });
  };

    return (
    
      <div className="login-register-container">
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
                placeholder="E-mail"
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
                placeholder="Username"
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
                placeholder="Password"
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